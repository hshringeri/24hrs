import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

export const getCalendar = async (req, res) => {
    const refreshToken = fs.readFileSync(path.resolve('./refreshToken.txt'), 'utf8');
    console.log("hiii")
    console.log(refreshToken)
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    try {
        const response = await calendar.events.list({
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          timeMax: oneWeekFromNow.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        });
    
        const events = response.data.items;
        let eventData = ''
        if (events.length) {
          console.log('Upcoming events for the next week:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            const end = event.end.dateTime || event.end.date;
            console.log(`${start} to ${end}  -   ${event.summary}`);
            eventData += `${start} to ${end}  -   ${event.summary}\n`
          });
        
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
