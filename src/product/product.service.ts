import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly model: Model<Product>) { }

    async addProduct(data: any, images: any): Promise<Product> {
        const newObject = new this.model({
            name: data.name,
            details: data.details,
            images: images
        });
        return await newObject.save();
    }

    async findAll(): Promise<Product[]> {
        return await this.model.find().exec();
    }
}
