import { Schema, models, model } from 'mongoose'

const userRefreshTokenSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    googleRefreshToken: {
      type: String,
      required: true
    }
  });
  
export const UserRefreshToken = mongoose.model('UserRefreshToken', userRefreshTokenSchema);

