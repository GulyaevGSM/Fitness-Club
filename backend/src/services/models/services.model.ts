import * as mongoose from "mongoose";

export const ServicesModel = new mongoose.Schema({
    serviceName: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    coach: {type: String},
    description: {type: String}
})

export interface Services extends mongoose.Document {
    id: string;
    serviceName: string;
    price: number;
    coach: string;
    description: string;
}