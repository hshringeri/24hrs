import { addEvent } from "./functionCalling"


export const setEvents = async (req, res) => {
    const event = req.body
    console.log("event: " + event)
    try {
        const eventsToAdd = await addEvent(event);

        console.log("HII")
        console.log(eventsToAdd)
        const lines = eventsToAdd.trim().split("\n");

        const eventMap = lines.map(line => {
            const parts = line.split(" - ");
            const dates = parts[1].split(" to ");
            const startDate =  new Date(dates[0])
            const endDate =  new Date(dates[1])

            const options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              };


            const formattedStartTime = startDate.toLocaleTimeString('en-US', options);
            const formattedEndTime = endDate.toLocaleTimeString('en-US', options);

            const dateOptions = {
                month: 'numeric',
                day: '2-digit'
              };
              
            const formattedDate = startDate.toLocaleDateString('en-US', dateOptions);
            return {
                event_name: parts[0],
                date: formattedDate,
                start_time: formattedStartTime,
                end_time:  formattedEndTime
            };
        }).sort((a, b) => a.start_date - b.start_date);


        res.status(200).json({
            success: true,
            data: eventMap,
            message: "Event added successfully."
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to add the event.",
            error: error.message
        });
    }
}