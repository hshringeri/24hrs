import  { Calendar } from '../../../../mongo/models/calendar'
export const updateSettings = async (req, res) => {
    try {
        console.log("you are here")
        const settings = req.body.settings; // Assuming settings are sent in request body
        const userSid = req.body.userSid;   // Assuming userSid is also sent in request body

        if (!settings) {
            res.status(400).json({ message: "Settings not provided" });
        }

        if (!userSid) {
            res.status(400).json({ message: "userSid not provided" });
        }

        // Using userSid as the filter to match the desired calendar
        console.log("you are here 2")
        console.log(settings)

        let updatedSettings = {}
        for (let key in settings) {
            if (settings[key] != "") {
                updatedSettings[`settings.${key}`] = settings[key]
            }
        }
        const updatedCalendar = await Calendar.findOneAndUpdate(
            { userSid: userSid },
            { $set: { settings: updatedSettings }},
            { new: true, upsert: true }  // This option returns the updated document
        );

        if (!updatedCalendar) {
            res.status(404).json({ message: "Calendar not found for the given userSid" });
        }
        console.log(updatedCalendar)
        
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getSettings = async (userSid) => {
    try {
        //const userSid = req.query.userSid;   // Assuming userSid is sent as a query parameter

        if (!userSid) {
            res.status(400).json({ message: "userSid not provided" });
        }

        // Fetch the calendar based on userSid
        const foundCalendar = await Calendar.findOne({ userSid: userSid });
        console.log("get settings")
        console.log(foundCalendar.settings)

        if (!foundCalendar) {
            res.status(404).json({ message: "Calendar not found for the given userSid" });
        }
        const settings = foundCalendar.settings
        return settings

        //res.status(200).json(foundCalendar.settings); // Assuming the calendar document has a settings field
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}