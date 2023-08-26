import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { UserRefreshToken } from '../../../mongo/models/refeshToken'
import { updateToken, getToken } from '../refreshToken/controller'
import { upsertUserCalendar } from '../calendar/controller'


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

export default async function handler(req, res) {
    const userSid = req.query.state
    const code = req.query.code;
    console.log("HIIIII!")

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    console.log(tokens)
    //fs.writeFileSync(path.resolve('./refreshToken.txt'), tokens.refresh_token )
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client});
    const userInfo = await oauth2.userinfo.get();
    const userId = userInfo.data.id;
    console.log(typeof userId)

    const token = await updateToken(userId, tokens.refresh_token)
    console.log(token)

    console.log("hi")

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
            console.log(`${start} to ${end}  -   ${event.summary}`);
            eventData += `${start} to ${end}  -   ${event.summary}\n`
            
            const title = event.summary


            const calendarData = {
              title: title,
              start: start,
              end: end
            }
            updatedCalendar.push(calendarData)
          });
          console.log(updatedCalendar)
          const upsertCalendar = await upsertUserCalendar(userSid, updatedCalendar)
          console.log(upsertCalendar)
        }



        res.setHeader('Location', process.env.BASE_URL);
        res.statusCode = 302;
        res.end();

    } catch(error) {
            return Error(error)
    }
    
}

