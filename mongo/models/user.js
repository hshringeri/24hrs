import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
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
    sid: {
      type: String,
      required: true,
      unique: true

    },
  });
  
export const User = models.user || model('user', userSchema, 'users')