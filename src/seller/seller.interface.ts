import { Document } from 'mongoose';

export interface Seller extends Document {
    readonly name: string;
    readonly email: number;
    readonly password: string;
    readonly phone: string;
}