import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

const scopes = ["https://www.googleapis.com/auth/calendar"]

export default function handler(req, res) {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,

    })
    console.log(url)
    res.writeHead(302, { Location: url });
    res.end();
}