import * as mongoose from 'mongoose';

export const SellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
});