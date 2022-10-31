import * as mongoose from "mongoose";

export const BlogModel = new mongoose.Schema({
    title: {type: String, required: true},
    subContent: {type: String, required: true},
    mainContent: {type: String, required: true},
    image: {type: String, required: false, default: ''},
})

export interface Blog extends mongoose.Document {
    id: string;
    title: string;
    subContent: string;
    mainContent: string;
    image: string;
}