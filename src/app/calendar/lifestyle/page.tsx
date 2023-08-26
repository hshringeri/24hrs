'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import LifeStyleLogo from '../../../../images/lifestyle-neon.png'
import { get } from 'http'
import { useRouter, useSearchParams } from 'next/navigation';
import './Popup.css';
import CalendarView from '../calendar'

export default function Home() {
    const [event, setEvent] = useState('');
    const [eventMap, setEventMap] = useState([]);
    const [viewEvents, setViewEvents] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [currentCalendar, setCurrentCalendar] = useState(null)
  
    const searchParams = useSearchParams()
    const userSid = searchParams?.get('usersid')
    console.log(userSid)


    const handleAddEvents = async (e: any) => {
      e.preventDefault();
      const body = {
        events: event,
        userSid: userSid

      }

      try {
        const response = await fetch('/api/lifestyle/events', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body), 
        });
        
        if (!response.ok) {
          setShowPopup(true);
          return
        }
    
        const data = await response.json();
    
        // Do something with the returned data
        console.log(data)
        console.log(data.data)
        setEventMap(data.data)
        setEvent("")
      } catch (error) {
        console.error('Error:', error);
      }
    }

    
    useEffect(() => {
      const fetchCalendar = async () => {
        try {
          const res = await fetch(`/api/calendar/data?userSid=${userSid}`);
          if (!res.ok) {
            throw new Error('Failed to fetch calendar data');
          }
          const data = await res.json();
          setCurrentCalendar(data)
          console.log(data); // Just changed this from "hekki" to log the actual data
        } catch (error) {
          console.error("Error fetching data:");
        }
      };
    
      fetchCalendar();      
    }, [])
    
    useEffect(() => {
      console.log(eventMap)
      setViewEvents(true)
    }, [eventMap])

    const Popup = () => {
      return (
        <div id="popup1">
          <div className="popup">
              <h2>eventflow hallucinated :(</h2>
              <h2>Do you wish to let us use this failed command to improve eventflow`&apos;`s cognitive architecture?</h2>
          <div className="response-options">
              <Button className="option" onClick={() =>setShowPopup(false)}>yes</Button>
              <a className="option" onClick={() =>setShowPopup(false)}>no</a>
          </div>
          </div>
      </div>
      );
    }

    const updateEvents = async (eventMap: any) => {
      setViewEvents(false)
      const formattedEvents = eventMap.map((event: { title: any; start: any; end: any }) => ({
        title: event.title,
        start: event.start,
        end: event.end
    }));
    console.log(formattedEvents)
      try {
        const updatedEvents = fetch(`/api/calendar?userSid=${userSid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formattedEvents)
        })
      } catch (error) {

      }

    }

  return (
    
    <main className="font-mono flex min-h-screen flex-col  ">
      <br></br>
      <h2>lifestyle edition</h2>
       
      <div style={{ display: 'flex', justifyContent: 'center',width: '100%', marginTop: '100px'  }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '200px' }}>
                 <div><CalendarView 
                        currentCalendar={currentCalendar}
                      />  
                  </div>           
        </div>

        <div >
        <form id="wantDo" onSubmit={handleAddEvents}>
                      <div className="flex items-center ">
                          <textarea 
                            id="note"
                            name="note" 
                            rows={2} 
                            cols={30} 
                            className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-blue-700 placeholder:text-zinc-400 rounded"
                            placeholder="schedule stuff"
                            value={event}
                            onChange={(e) => setEvent(e.target.value)}
                          ></textarea>
                          
                          <input type="submit" value="+" className="ml-2 text-xl"></input>
                      </div>
                      <br></br>
        </form>
          {viewEvents && (
            <div>
              {eventMap.map((event: any, index: number) => (
                <div key={event.id || index} id="popup1">  {/* Use event.id if it exists, else fall back to the index */}
                  <div className="popup" style={{ whiteSpace: 'nowrap', minWidth: '1000px', margin: 2, padding: 2 }}>
                    <h2 className='font mono'>
                      {event.title} on {(event.start).split('T')[0]} from {(event.start).split('T')[1]} to {(event.end).split('T')[1]}
                    </h2>
                  </div> 
                </div>
              ))}

              <Button onClick={() => updateEvents(eventMap)}> add to calendar </Button>
                  {showPopup && 
                    <Popup />
                } 
              
               
            </div>
          )}

         
        </div>

      </div>
      
        

         
       

    </main>
  )}

    
//   {showPopup && 
//     <Popup />
//  } 