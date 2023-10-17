import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import './main.css'
import './Popup.css'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { utcToZonedTime } from 'date-fns-tz';
import  moment  from 'moment'

interface CalendarInfoProps {
    userSid: any,
    eventName: any,
    startTime: any,
    endTime: any,

}

const CalendarInfo: React.FC<CalendarInfoProps> = ({ userSid, eventName , startTime, endTime }) => {
    const [calendarEvent, setCalendarEvent] = useState({})
    const [findEvent, setFindEvent] = useState(true)

    async function getCalendar() {
        try {
            const res = await fetch(`/api/calendar/data?userSid=${userSid}`);
            if (!res.ok) {
              throw new Error('Failed to fetch calendar data');
            }
            const data = await res.json();
            const calendar = data.calendar
            const event = calendar.find((e: any) => (e.title == eventName && e.start == startTime && e.end == endTime))
            setCalendarEvent(event)
            console.log(event);
          } catch (error) {
            console.error("Error fetching data:");
          }
    }

    useEffect(() => {
        getCalendar()
        setFindEvent(false)
    },[findEvent])

    return (
        
    )




}

export default CalendarInfo;