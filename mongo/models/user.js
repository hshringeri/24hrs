import { Schema, models, model } from 'mongoose'

const user = new Schema({
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
  
export const User = mongoose.model('User', user);