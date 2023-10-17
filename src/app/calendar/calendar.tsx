import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import './main.css'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { utcToZonedTime } from 'date-fns-tz';
import  moment  from 'moment'

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(localTimeZone)



interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  //... add other fields if necessary
}


interface CalendarViewProps {
  currentCalendar: any ;
  userSid: any ;
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentCalendar , userSid }) => {
  const [calendar, setCalendar] = useState([])
  console.log(currentCalendar)
  console.log("calendar:")

  console.log(calendar)

  useEffect(() => {
    setCalendar(currentCalendar)
  }, [currentCalendar])

  function isTimeEqual(timeStr1: any, timeStr2: any) {
    // Create Date objects from the input strings
    const date1 = new Date(timeStr1);
    const date2 = new Date(timeStr2);
  
    // Convert both dates to UTC time
    const utc1 = date1.getTime();
    const utc2 = date2.getTime();
  
    // Compare the UTC times
    return utc1 === utc2;
  }

  const removeEvent = async (title: any, start: any, end: any) => {
    console.log(start)
    console.log(end)

  
    const newCalendar = calendar.filter((item: Event) => {
      console.log(isTimeEqual(item.start, start))
      console.log(isTimeEqual(item.end, end))
      return !(item.title === title && isTimeEqual(item.start, start) && isTimeEqual(item.end, end));
    });
  
    console.log(newCalendar)
    setCalendar(newCalendar)
    
    try {
      const updatedCalendar = await fetch(`/api/calendar?userSid=${userSid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCalendar)
      })
    } catch(error) {
      console.log(error)
    }
  };

  const addEvent = async (title: any, startTime: any, endTime: any) => {
    console.log(title)
    const eventList = []
    const newEvent = {
      title: title,
      start: startTime,
      end: endTime
    }
    console.log(newEvent)
    eventList.push(newEvent)
    try {
      const newCalendar = await fetch(`/api/calendar?userSid=${userSid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventList)
      })
    } catch(error) {
      console.log(error)
    }
  }

  async function handleEventClick(clickInfo: { event: { title: any; remove: () => void; start: Date; end: Date; }; }) {
    console.log(clickInfo)
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' that starts at ${clickInfo.event.start} and ends at ${clickInfo.event.end}?`)) {
      clickInfo.event.remove();
      const startTime = utcToZonedTime(clickInfo.event.start, localTimeZone);
      console.log(startTime)
      const isoStartTime = convertDateFormat(startTime)
      console.log(isoStartTime)
      const endTime = utcToZonedTime(clickInfo.event.end, localTimeZone);
      console.log(endTime)
      const isoEndTime = convertDateFormat(endTime)
      console.log(isoEndTime)
      await removeEvent(clickInfo.event.title, startTime, endTime)
    }
  }

  function convertDateFormat(dateStr: any) {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-05:00`;

  return isoString
  }

  function addDuration(startTime: any, durationStr: any) {
    let durationParts = durationStr.split(' ')
    const quantity = parseInt(durationParts[0], 10);
    const unit = durationParts[1];

    let startTimeMoment = moment(startTime)
    let newTimeMoment = startTimeMoment.add(quantity, unit)

    return newTimeMoment.format('YYYY-MM-DDTHH:mm:ssZ');
}

  async function handleDateSelect(selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) {
    let title = prompt('Please enter a new title for your event')
    let duration = prompt('Please enter duration of event (eg: 2 hours or 30 minutes)')
    let endTime = addDuration(selectInfo.startStr, duration)
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: endTime,
        allDay: selectInfo.allDay
      })

      await addEvent(title, selectInfo.startStr, endTime)
    }
  }

  return (
    
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          initialView="timeGridWeek"
          headerToolbar={{
            start: "today, prev,next",
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay"
          }}
          weekends={true}
          events={calendar || null}
          height={"75vh"}
          editable={true}
          selectable={true}
          eventClick={handleEventClick as any}
          select={handleDateSelect}
          
          

        />
      </div>
    </div>
  );
}

export default CalendarView;