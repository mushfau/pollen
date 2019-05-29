import { Document } from 'mongoose';

export interface Product extends Document {
    readonly name: string;
    readonly details: number;
    readonly images: [string];
}