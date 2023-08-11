import calendar from '../../../../mongo/models/calendar'
export const updateSettings = async (req, res) => {
    try {
        const settings = req.body.settings; // Assuming settings are sent in request body
        const userSid = req.body.userSid;   // Assuming userSid is also sent in request body

        if (!settings) {
            return res.status(400).json({ message: "Settings not provided" });
        }

        if (!userSid) {
            return res.status(400).json({ message: "userSid not provided" });
        }

        // Using userSid as the filter to match the desired calendar
        const updatedCalendar = await calendar.findOneAndUpdate(
            { userSid: userSid },
            { $set: settings },
            { new: true, upsert: true }  // This option returns the updated document
        );

        if (!updatedCalendar) {
            return res.status(404).json({ message: "Calendar not found for the given userSid" });
        }

        res.status(200).json(updatedCalendar);
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getSettings = async (req, res) => {
    try {
        const userSid = req.query.userSid;   // Assuming userSid is sent as a query parameter

        if (!userSid) {
            return res.status(400).json({ message: "userSid not provided" });
        }

        // Fetch the calendar based on userSid
        const foundCalendar = await calendar.findOne({ userSid: userSid });

        if (!foundCalendar) {
            return res.status(404).json({ message: "Calendar not found for the given userSid" });
        }

        res.status(200).json(foundCalendar.settings); // Assuming the calendar document has a settings field
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}