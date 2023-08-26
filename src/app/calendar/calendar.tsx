import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'

interface Event {
  title: string;
  startTime: Date | string;
  endTime: Date | string;
  //... add other fields if necessary
}


interface CalendarViewProps {
  currentCalendar: any ;
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentCalendar }) => {
  console.log("calendar:")
  console.log(currentCalendar)

  const events = [
    {
      title: "event 1",
      start: "2023-08-28T11:00:00-07:00",
      end: "2023-08-28T13:00:00-07:00"
    },
    {
      title: "event 2",
      start: "2023-08-28T09:00:00-07:00",
      end: "2023-08-28T11:00:00-07:00"
    },

  ]

  return (
    
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "today, prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay"
        }}
        weekends={true}
        events={currentCalendar || null}
        height={"75vh"}
        

      />
    </div>
  );
}

export default CalendarView;