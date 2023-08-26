import pkg from 'mongoose';
const { Schema, models, model } = pkg;

const calendarSchema = new Schema({
    userSid: {
      type: String,
      required: true,
      unique: true
    },
    calendar: {
        type: Array,
    },
    settings: {
        type: Object,
    }
  });
  
export const Calendar = models.calendar || model('calendar', calendarSchema, 'calendars')
