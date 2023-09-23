import  { Calendar }  from '../../../../mongo/models/calendar.js'
import connectMongo from '../../../../mongo/connectMongo.js'
export const getCalendarData = async (req, res) => {
    console.log("hi")
    console.log("do ")
    const userSid = req.query.userSid
    console.log(userSid)
    if (!userSid) {
        return res.status(400).send({ error: 'userSid is required' });
    }

    try {
        const calendar = await Calendar.findOne({ userSid: userSid });

        if (!calendar) {
            return res.status(404).send({ error: 'Calendar not found for this userSid' });
        }

        return res.status(200).send(calendar.calendar);
    } catch (error) {
        console.error('Error fetching calendar:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }

}

export const getCalendarDataWithUserSid = async (userSid) => {
    
    if (!userSid) {
        return Error('userSid is required')
    }

    try {
        //await connectMongo()
        const calendar = await Calendar.findOne({ userSid: userSid });
        if (!calendar) {
            return Error('Calendar not found for this userSid')
        }
        return calendar.calendar
    } catch (error) {
        return Error(error)
    }

}


