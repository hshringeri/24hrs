import { addEvent } from "./functionCalling"


export const setEvents = async (req, res) => {
    console.log(req.body)
    const events = req.body.events
    const userSid = req.body.userSid
    console.log("event: " + events)
    try {
        const eventsToAdd = await addEvent(events, userSid);
        console.log("Check here")
        console.log(typeof eventsToAdd)
        if (eventsToAdd instanceof Error || typeof eventsToAdd == 'undefined') {
            console.log("hi")
            res.status(500).json({
                success: false,
                message: "eventflow hallucinated",
                error: error.message
            });
            return
        }

        console.log("HII")
        console.log(eventsToAdd)

        res.status(200).json({
            success: true,
            data: eventsToAdd,
            message: "Event added successfully."
        });
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