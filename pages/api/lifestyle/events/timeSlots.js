import moment from 'moment'
import { getCalendarDataWithUserSid } from '../../calendar/data/controller'
export const getCalendarData = async (userSid) => {
    //await connectMongo();
    
}

export const getOpenSlots = async (from, till, events, userSid) => {
    try {
        console.log(events)
        const appointments = await getCalendarDataWithUserSid(userSid)
        console.log("over here")
        console.log("we up")
        const startOfDay = moment("09:00:00", "HH:mm:ss");
        const endOfDay = moment("23:00:00", "HH:mm:ss");
        const lunchStart = moment("12:00:00", "HH:mm:ss");
        const lunchEnd = moment("13:00:00", "HH:mm:ss");
        const dinnerStart = moment("20:00:00","HH:mm:ss")
        const dinnerEnd = moment("21:00:00","HH:mm:ss")

        const sortedAppointments = appointments.sort((a, b) => moment(a.start).diff(moment(b.start)));
        console.log(sortedAppointments)
        
        let days = 0
        let maxLength = Number.NEGATIVE_INFINITY
        let numberOfEvents = 0

        console.log(events)
        for (let event of events) {
            numberOfEvents += 1
            days += event.days_per_week
            const durationList = event.probable_duration.split(" ")
            let durationNumber = parseInt(durationList[0])
            const durationType = durationList[1]
            if (durationType === 'minutes') {
                durationNumber = durationNumber/60
            }
            maxLength = Math.max(maxLength, durationNumber)

        }
        console.log("days: " + days)
        console.log(maxLength)
        let currentDay = moment(from);
        let openSlots = [];
        console.log(numberOfEvents)
        console.log(till)
        while (currentDay.isBefore(moment(till))) {
            let count = 0
            let slotsAddedForDay = (count === numberOfEvents)
            let currentTime = moment(currentDay).add(startOfDay.hour(), 'hours').add(startOfDay.minute(), 'minutes');

            for (let i = 0; i < sortedAppointments.length && !slotsAddedForDay; i++) {
                const appointmentStart = moment(sortedAppointments[i].start);
                const appointmentEnd = moment(sortedAppointments[i].end);

                if (!appointmentStart.isSame(currentDay, 'day')) {
                    continue;  // Skip appointments that are not for the current day
                }

                if (currentTime.add(maxLength, 'hours').isBefore(appointmentStart)) {
                    console.log("here")
                    openSlots.push({ start: currentTime.format(), end: currentTime.clone().add(maxLength, 'hours').format() });
                    //slotAddedForDay = true;
                    count += 1
                    console.log("added")
                    
                    if (count === numberOfEvents) {
                        slotsAddedForDay = true
                        break
                    }

                    currentTime.add(maxLength, 'hours');
                    i--; // re-check against the same appointment after slot increment
                } else {
                    console.log("end")
                    currentTime = appointmentEnd;
                }
                // Skip lunch time and dinner time
                if (currentTime.isSameOrAfter(lunchStart) && currentTime.isBefore(lunchEnd)) {
                    currentTime = lunchEnd;
                }
                if (currentTime.isSameOrAfter(dinnerStart) && currentTime.isBefore(dinnerEnd)) {
                    currentTime = dinnerEnd;
                }
            }

            // Check for slots after the last appointment of the day
            if (!slotsAddedForDay) {
                while (currentTime.add(maxLength, 'hours').isBefore(moment(currentDay).add(endOfDay.hour(), 'hours').add(endOfDay.minute(), 'minutes')) && openSlots.length < days) {
                    openSlots.push({ start: currentTime.format(), end: currentTime.clone().add(maxLength, 'hours').format() });
                    console.log("added 2 for tje bois")
                    count += 1
                    currentTime.add(maxLength, 'hours');
                    
                    if (count === numberOfEvents) {
                        console.log("we up in this bitch")
                        slotsAddedForDay = true
                    };

                    if (slotsAddedForDay) {
                        break;
                    }
                }
            }

            currentDay.add(1, 'days');
            console.log("current day:")
            console.log(currentDay)
        }
        console.log(openSlots)
        const availableSlots = openSlots.slice(0, days);  // Return the first 10 slots (or fewer if there aren't 10 available)
        console.log("available slots: " + availableSlots)
        let newEvents = []
        let index = 0
        for (let i = 0; i < events.length; i++) {
            const eventName = events[i].event
            for (let j = 0; j < events[i].days_per_week; j++) {
                const currIndex = index
                console.log("Index:")
                console.log(currIndex)
                const currSlot = availableSlots[currIndex]
                const start = currSlot.start

                const hours = events[i].probable_duration.split(" ")[0]
                const hoursNumber = parseInt(hours)
                const end = moment(start).add(hoursNumber, 'hours').format();
                const newEvent = {
                    title: eventName,
                    start: start,
                    end: end
                }
                newEvents.push(newEvent)
                index = index + 1

            }
        }
        console.log(newEvents)
         return newEvents

    } catch (error) {
        console.log(error)
        return Error(error.message)
    }
    

}

// const calendar = getCalendarData("jMG_z1VYh6R0T1kfiqYm5DgSm-_YU6Sz")
// console.log(calendar)
const events = [
    {
      event: 'research',
      probable_duration: '2 hours',
      days_per_week: '3'
    },
    {
        event: 'develop',
        probable_duration: '4 hours',
        days_per_week: '3'
      },
      {
        event: 'test',
        probable_duration: '2 hours',
        days_per_week: '3'
      }
  ]
//const slots = getOpenSlots("2023-08-21T00:00:00-07:00", "2023-08-28T00:00:00-07:00", events, "8kLml4Qj3WPz_bfiyia0pExtbb2l96nf")
// console.log(slots)