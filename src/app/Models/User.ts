import {Document, model, Model, Schema} from 'mongoose'

export const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: String,
    following: String,
    data: [Schema.Types.Mixed]
})

export interface IUser extends Document {
    username: string
    email: string
    password: string
    followers: string
    following: string
    data: any[]
}

export default model<IUser>('User', UserSchema)
