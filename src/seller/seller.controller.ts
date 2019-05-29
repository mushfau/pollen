import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Request, Response } from 'express';
import { Seller } from './seller.interface';


@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService,
    ) { }

    @Get('register')
    registerGet(@Res() res: Response) {
        return res.render('register', {});
    }

    @Post('register')
    registerPost(@Req() req: Request, @Res() res: Response) {

        if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password) {
            return res.render('error', { message: 'invalid input' });
        }


        this.sellerService.signup(req.body).then((seller: Seller) => {
            return res.render('login', { message: '' });
        }).catch((err: any) => {
            return res.render('error', { message: err.message });
        })
    }

    @Get('login')
    loginGet(@Req() req: Request, @Res() res: Response) {
        return res.render('login', {});
    }

    @Post('login')
    loginPost(@Req() req: Request, @Res() res: Response) {
        if (!req.body.phone || !req.body.password) {
            return res.render('login', { err: true });
        }
        this.sellerService.login(req.body).then((token) => {
            res.cookie('jwt', token, { maxAge: 900000, httpOnly: true });
            return res.redirect('/');
        }).catch((err: any) => {
            return res.render('login', { err: true });
        })
    }
    @Get('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        req.logOut();
        res.clearCookie('jwt')
        return res.redirect('/');
    }

}
