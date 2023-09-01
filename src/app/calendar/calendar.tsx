import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import './main.css'
import { INITIAL_EVENTS, createEventId } from './event-utils'


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
  console.log("calendar:")

  console.log(calendar)

  useEffect(() => {
    setCalendar(currentCalendar)
  }, [currentCalendar])

  const removeEvent = async (title: any, start: any, end: any) => {
    console.log(start)
    console.log(end)
    const newCalendar = calendar.filter((item: Event) => {
      return !(item.title === title && item.start === start && item.end === end);
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
      const startTime = new Date(clickInfo.event.start)
      const isoStartTime = startTime.toISOString()
      const endTime = new Date(clickInfo.event.end)
      const isoEndTime = endTime.toISOString()
      await removeEvent(clickInfo.event.title, isoStartTime, isoEndTime)
    }
}

  async function handleDateSelect(selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })

      await addEvent(title, selectInfo.startStr,selectInfo.endStr)
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