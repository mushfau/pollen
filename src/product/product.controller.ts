import { Controller, Get, Render, Post, Req, Res, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request, Response } from 'express';
import { Product } from './product.interface';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
// @UseGuards(AuthGuard())
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    productGet(@Req() req: Request, @Res() res: Response) {
        console.log(req.cookies)
        this.productService.findAll().then((products) => {
            if (req.cookies && req.cookies.jwt) {
                return res.render('product-list', { products: products, auth: true });
            } else {
                res.redirect('/')
            }

        })

    }

    @Get('add')
    productAddView(@Req() req: Request, @Res() res: Response) {
        if (req.cookies && req.cookies.jwt) {
            return res.render('product', { auth: true });
        } else {
            res.redirect('/')
        }
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './public/uploads'
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    productSave(@Req() req: Request, @Res() res: Response, @UploadedFiles() files: any) {
        let images = files.map((file) => { return file.filename })
        this.productService.addProduct(req.body, images).then((seller: Product) => {
            return res.redirect('/product')
        }).catch((err: any) => {
            if (req.cookies && req.cookies.jwt) {
                if (err.code === 11000) {
                    return res.render('error', { message: 'Product name exists, select a different name', auth: true });
                } else {
                    return res.render('error', { message: err.message, auth: true });
                }
            } else {
                res.redirect('/')
            }
        });
    }

}
