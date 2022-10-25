import * as mongoose from 'mongoose';

export const TokenModel = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

export interface Token extends mongoose.Document {
    id: string;
    userID: string;
    refreshToken: string;
}