import {Document, model, Model, Schema} from 'mongoose';

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  friends: [String],
  data: [Schema.Types.Mixed]
});

export interface IUser extends Document {
  username: string;
  age: number;
  friends: string[];
  data: any[];
}

export default model<IUser>('User', UserSchema);
