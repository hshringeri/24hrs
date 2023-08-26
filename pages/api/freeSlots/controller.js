import moment from 'moment'
import  connectMongo from '../../../mongo/connectMongo.js'
import { getCalendarDataWithUserSid } from '../calendar/data/controller.js';


const appointments = [
    {
        "title": "Team Meeting",
        "start": "2023-08-21T08:30:00-07:00",
        "end": "2023-08-21T09:30:00-07:00"
    },
    {
        "title": "Brainstorming",
        "start": "2023-08-21T11:00:00-07:00",
        "end": "2023-08-21T12:30:00-07:00"
    },
    {
        "title": "1-1 Meeting",
        "start": "2023-08-21T14:30:00-07:00",
        "end": "2023-08-21T15:30:00-07:00"
    },
    {
        "title": "Review Session",
        "start": "2023-08-22T09:00:00-07:00",
        "end": "2023-08-22T10:00:00-07:00"
    },
    {
        "title": "Client Call",
        "start": "2023-08-22T12:00:00-07:00",
        "end": "2023-08-22T13:00:00-07:00"
    },
    {
        "title": "Project Planning",
        "start": "2023-08-22T14:00:00-07:00",
        "end": "2023-08-22T15:30:00-07:00"
    },
    {
        "title": "Code Review",
        "start": "2023-08-23T09:30:00-07:00",
        "end": "2023-08-23T10:30:00-07:00"
    },
    {
        "title": "Budget Review",
        "start": "2023-08-23T11:30:00-07:00",
        "end": "2023-08-23T12:30:00-07:00"
    },
    {
        "title": "Training Session",
        "start": "2023-08-23T15:00:00-07:00",
        "end": "2023-08-23T16:00:00-07:00"
    },
    {
        "title": "Stand-up",
        "start": "2023-08-24T09:00:00-07:00",
        "end": "2023-08-24T09:30:00-07:00"
    }
]


function getOpenSlots(appointments, from, till, slotDuration = 1) {
    const startOfDay = moment("08:00:00", "HH:mm:ss");
    const endOfDay = moment("18:00:00", "HH:mm:ss");
    const lunchStart = moment("12:00:00", "HH:mm:ss");
    const lunchEnd = moment("13:00:00", "HH:mm:ss");

    const sortedAppointments = appointments.sort((a, b) => moment(a.start).diff(moment(b.start)));
    console.log(sortedAppointments)

    let currentDay = moment(from);
    let openSlots = [];

    while (currentDay.isBefore(moment(till))) {
        let currentTime = moment(currentDay).add(startOfDay.hour(), 'hours').add(startOfDay.minute(), 'minutes');

        for (let i = 0; i < sortedAppointments.length; i++) {
            const appointmentStart = moment(sortedAppointments[i].start);
            const appointmentEnd = moment(sortedAppointments[i].end);

            if (!appointmentStart.isSame(currentDay, 'day')) {
                continue;  // Skip appointments that are not for the current day
            }

            if (currentTime.add(slotDuration, 'hours').isBefore(appointmentStart)) {
                openSlots.push({ start: currentTime.format(), end: currentTime.clone().add(slotDuration, 'hours').format() });
                if (openSlots.length === 10) {
                    return openSlots;
                }
                currentTime.add(slotDuration, 'hours');
                i--; // re-check against the same appointment after slot increment
            } else {
                currentTime = appointmentEnd;
            }

            // Skip lunch time
            if (currentTime.isSameOrAfter(lunchStart) && currentTime.isBefore(lunchEnd)) {
                currentTime = lunchEnd;
            }
        }

        // Check for slots after the last appointment of the day
        while (currentTime.add(slotDuration, 'hours').isBefore(moment(currentDay).add(endOfDay.hour(), 'hours').add(endOfDay.minute(), 'minutes')) && openSlots.length < 10) {
            openSlots.push({ start: currentTime.format(), end: currentTime.clone().add(slotDuration, 'hours').format() });
            currentTime.add(slotDuration, 'hours');
        }

        currentDay.add(1, 'days');
    }

    return openSlots.slice(0, 10);  // Return the first 10 slots (or fewer if there aren't 10 available)
}

const from = "2023-08-21T00:00:00-07:00";
const till = "2023-08-24T00:00:00-07:00";
console.log(getOpenSlots(appointments, from, till));
