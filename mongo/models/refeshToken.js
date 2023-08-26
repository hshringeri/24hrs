import pkg from 'mongoose';
const { Schema, models, model } = pkg;

const userRefreshTokenSchema = new Schema({
  userId: {
      type: String,
      required: true,
      unique: true
    },
    googleRefreshToken: {
      type: String,
      required: true
    }
  });
  
export const UserRefreshToken = models.userRefreshToken || model("userRefreshToken", userRefreshTokenSchema, "userRefreshTokens")

