import { Schema, models, model } from 'mongoose'

const calendar = new Schema({
    userSid: {
      type: String,
      required: true,
      unique: true
    },
    calendar: {
        type: Object,
    },
    settings: {
        type: Object,
    }
  });
  
export const Calendar = mongoose.model('Calendar', calendar);
