import * as mongoose from "mongoose";

export const CoachModel = new mongoose.Schema({
    fullName: {type: String, required: true},
    age: {type: Number, required: true},
    specialization: {type: String, required: true}
})

export interface Coach extends mongoose.Document {
    id: string;
    fullName: string;
    price: number;
    coach: string;
}