import { google } from 'googleapis'

// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URL
// )

const scopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]

export default async function handler(req, res) {
    const userSid = req.query.userSid
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    )
    console.log("joe biden")
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: userSid

    })
    console.log("antartica")
    console.log(url)
    res.json({url})
   
}