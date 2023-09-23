import { addEvent } from "./functionCalling"


export const setEvents = async (req, res) => {
    const events = req.body.events
    const userSid = req.body.userSid
    try {
        const eventsToAdd = await addEvent(events, userSid);
        if (eventsToAdd instanceof Error || typeof eventsToAdd == 'undefined') {
            console.log("hi dude")
            res.status(500).json({
                success: false,
                message: "eventflow hallucinated",
                error: error.message
            });
            return
        }


        res.status(200).json({
            success: true,
            data: eventsToAdd,
            message: "Event added successfully."
        });
        return
    } catch(error) {
        console.log("found")
        console.log(error)
        res.status(500).json({
            success: false,
            message: "eventflow hallucinated",
            error: error.message
        });
    }
}