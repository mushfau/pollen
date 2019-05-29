import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    details: String,
    images: [String]
});