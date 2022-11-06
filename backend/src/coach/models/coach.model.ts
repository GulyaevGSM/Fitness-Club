import * as mongoose from "mongoose";

export const CoachModel = new mongoose.Schema({
    fullName: {type: String, required: true},
    age: {type: Number, required: true},
    specialization: {type: String, required: false}
})

export interface Coach extends mongoose.Document {
    id: string;
    fullName: string;
    age: number;
    specialization: string;
}