import * as mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ''},
    name: {type: String},
    surName: {type: String},
    patronymic: {type: String},
    dateOfBirth: {type: Date},
    balance: {type: Number, default: 0},
    verifyLink: {type: String, required: true},
    isVerify: {type: Boolean, default: false}
})

export interface User extends mongoose.Document {
    id: string;
    email: string;
    password: string;
    avatar: string;
    name: string;
    surName: string;
    patronymic: string;
    dateOfBirth: Date;
    isVerify: boolean;
}