import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './seller.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SellerService {
    constructor(@InjectModel('Seller') private readonly model: Model<Seller>, private auth: AuthService) { }
    async signup(data: any): Promise<Seller> {
        const newObject = new this.model(data);
        return await newObject.save();
    }
    async login(data: any): Promise<any> {
        let phone = data.phone;
        let password = data.password;
        return this.model.findOne({ phone: phone, password: password }).then((user) => {
            if (user) {
                return this.auth.createToken(user);
            } else {
                return Promise.reject('login failed')
            }

        }).catch((err) => {
            return Promise.reject(err.message)
        })
    }
    async findAll(): Promise<Seller[]> {
        return await this.model.find().exec();
    }
}
