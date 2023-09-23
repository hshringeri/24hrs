import moment from 'moment'
import { getCalendarDataWithUserSid } from '../../calendar/data/controller'
import { getSettings } from '../../calendar/settings/controller'
export const getCalendarData = async (userSid) => {
    //await connectMongo();
    
}

export const getOpenSlots = async (from, till, events, userSid) => {
    try {
        const appointments = await getCalendarDataWithUserSid(userSid)
        const settings = await getSettings(userSid)

        const [endOfDayTime, startOfDayTime] = convertTo24HourFormat(settings.sleepHours)
        const [lunchStartTime, lunchEndTime] = convertTo24HourFormat(settings.lunchTime)
        const [dinnerStartTime, dinnerEndTime] = convertTo24HourFormat(settings.dinnerTime)



        const startOfDay = moment(startOfDayTime, "HH:mm:ss");
        const endOfDay = moment(endOfDayTime, "HH:mm:ss");
        const lunchStart = moment(lunchStartTime, "HH:mm:ss");
        const lunchEnd = moment(lunchEndTime, "HH:mm:ss");
        const dinnerStart = moment(dinnerStartTime,"HH:mm:ss")
        const dinnerEnd = moment(dinnerEndTime,"HH:mm:ss")

        const sortedAppointments = appointments.sort((a, b) => moment(a.start).diff(moment(b.start)));
        
        let days = 0
        let maxLength = Number.NEGATIVE_INFINITY
        let numberOfEvents = 0

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

        let currentDay = moment(from);

        let openSlots = [];

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
                    openSlots.push({ start: currentTime.format(), end: currentTime.clone().add(maxLength, 'hours').format() });
                    //slotAddedForDay = true;

                    count += 1
                    
                    if (count === numberOfEvents) {
                        slotsAddedForDay = true
                        break
                    }

                    currentTime.add(maxLength, 'hours');
                    i--; // re-check against the same appointment after slot increment
                } else {
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
                    count += 1
                    currentTime.add(maxLength, 'hours');
                    
                    if (count === numberOfEvents) {
                        slotsAddedForDay = true
                    };

                    if (slotsAddedForDay) {
                        break;
                    }
                }
            }

            currentDay.add(1, 'days');
        }
        
        const availableSlots = openSlots.slice(0, days);  // Return the first 10 slots (or fewer if there aren't 10 available)

        let newEvents = []
        let index = 0
        for (let i = 0; i < events.length; i++) {
            const eventName = events[i].event
            for (let j = 0; j < events[i].days_per_week; j++) {
                const currIndex = index

                const currSlot = availableSlots[currIndex]
                const start = currSlot.start

                const hours = events[i].probable_duration.split(" ")[0]
                let probableDurationParts = events[i].probable_duration.split(" ");

                if (probableDurationParts[1] == "hours" || probableDurationParts[1] == "hour") {
                    const hoursNumber = parseInt(probableDurationParts[0]);
                    const end = moment(start).add(hoursNumber, 'hours').format();
                    const newEvent = {
                        title: eventName,
                        start: start,
                        end: end
                    }

                    newEvents.push(newEvent);

                } else if (probableDurationParts[1] == "minutes") {
                    const minutesNumber = parseInt(probableDurationParts[0]);
                    const end = moment(start).add(minutesNumber, 'minutes').format();
                    const newEvent = {
                        title: eventName,
                        start: start,
                        end: end
                    }
                    newEvents.push(newEvent);
                }
                index = index + 1
                

            }
        }
         return newEvents

    } catch (error) {
        console.log(error)
        return Error(error.message)
    }
    

}

function convertTo24HourFormat(timeString) {
    const parts = timeString.split(' - ');
  
    const convertSingleTime = (time) => {
      const [num, period] = time.split(' ');
      let hour = parseInt(num, 10);
      if (period.toLowerCase() === 'pm' && hour !== 12) {
        hour += 12;
      }
      if (period.toLowerCase() === 'am' && hour === 12) {
        hour = 0;
      }
      return `${hour.toString().padStart(2, '0')}:00:00`;
    };
  
    const startTime = convertSingleTime(parts[0]);
    const endTime = convertSingleTime(parts[1]);
  
    return [startTime, endTime];
  }
  
  // Test the function
  const timeString = "9 am - 5 pm";
  const [startTime, endTime] = convertTo24HourFormat(timeString);
  

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