import * as mongoose from 'mongoose';

export const AdminModel = new mongoose.Schema({
    adminCode: {type: String}
})

export interface Admin extends mongoose.Document {
    id: string;
    adminCode: string;
}