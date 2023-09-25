import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import  { Calendar }  from '../../../mongo/models/calendar'
import { getToken } from '../refreshToken/controller'

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

export const getCalendar = async (req, res) => {
  console.log("Who is here")
    const userSid = req.query.userSid
    const userId = req.query.userId

    const refreshToken = await getToken(userId)
    //const refreshToken = fs.readFileSync(path.resolve('./refreshToken.txt'), 'utf8');
    console.log("we up")
    console.log(refreshToken)
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });

    console.log("we here")
    
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

    try {
        const response = await calendar.events.list({
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          timeMax: twoWeeksFromNow.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        });
    
        const events = response.data.items;
        let eventData = ''
        let updatedCalendar = []
        if (events.length) {
          console.log('Upcoming events for the next week:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            const end = event.end.dateTime || event.end.date;
  
            eventData += `${start} to ${end}  -   ${event.summary}\n`
            
            const title = event.summary


            const calendarData = {
              title: title,
              start: start,
              end: end
            }
            console.log(calendarData)
            updatedCalendar.push(calendarData)
          });
          const upsertCalendar = await upsertUserCalendar(userSid, updatedCalendar)

        
          const dirPath = path.resolve('./events');
          if (!fs.existsSync(dirPath)) {
              fs.mkdirSync(dirPath);
          }
      
          const newContent = `Current Calendar \n${eventData}`;
      
          fs.writeFileSync(path.join(dirPath, 'currentCalendar.txt'), newContent);

        } else {
          console.log('No upcoming events found for the next week.');
        }


    
        res.send(events);
      } catch (err) {
        console.log('The API returned an error: ' + err);
        res.send({ error: 'Error fetching events' });
      }


}

export const upsertUserCalendar = async (userSid, updatedCalendar) => {
  
  try {
      await Calendar.updateOne(
          { userSid: userSid },
          { $set: { calendar : updatedCalendar } },
          { upsert: true }  // Upsert option ensures document is created if it doesn't exist
      );
      return "updated calendar"
  } catch (error) {
      return Error(error)
  }
};

export const updateEvents = async (req, res) => {
  console.log("whats up")
  const newEvents = req.body
  const userSid = req.query.userSid

  try {
    for (let event of newEvents) {
      await Calendar.updateMany(
          { userSid: userSid },
          { $push: { calendar: event } },
          { upsert: true }
      );
    }
  } catch (error) {
    console.log("WEEWEWEWEWGHERE")
    return Error(error.message)
  }

}

export const deleteCalendarEvent = async (req, res) => {
  const newCalendar = req.body
  const userSid = req.query.userSid

  try {
    console.log("trying to delete the calendar")
    console.log(newCalendar)
    await Calendar.updateOne(
      { userSid: userSid },
      { $set: { calendar: newCalendar}},
      { upsert: true }
      )
  } catch (error) {
    console.log(error)
    return Error(error)
  }

}