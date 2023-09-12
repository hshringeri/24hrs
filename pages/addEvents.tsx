'use client'
import React, { useEffect, useState } from 'react'
import {  Button } from 'react-bootstrap'
import { useSearchParams } from 'next/navigation';
import './Popup.css';
import { ClipLoader } from 'react-spinners'
import Calendar from '../src/app/calendar/calendar'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';


export default function AddEvents() {
    const [event, setEvent] = useState('');
    const [eventMap, setEventMap] = useState([]);
    const [viewEvents, setViewEvents] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [currentCalendar, setCurrentCalendar] = useState(null)
    const [showLoadingComponent, setShowLoadingComponent] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
  
    const searchParams = useSearchParams()
    const { user, error, isLoading } = useUser();
    const userSid = user?.sid
    console.log(userSid)

    console.log(showLoadingComponent)
    const handleAddEvents = async (e: any) => {
      e.preventDefault();
      setViewEvents(false)
      setShowLoadingComponent(true)

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
          try {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            console.log(errorData.message)
            setPopupMessage(errorData.message)
          } catch (error) {
              console.error('Error parsing JSON:', error);
              console.log(error)
              
          }
          console.log(response)
          if (response.status == 504) {
            setPopupMessage("server timeout, vercel give me more time! my internet is weak :(\n")
          }
          setShowPopup(true);
          setShowLoadingComponent(false)
          return
        }
    
        const data = await response.json();
        setShowLoadingComponent(false)
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
          console.log(data);
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
      setShowLoadingComponent(false)
      return (
        
          <div id="popup1" className="overlay">
            <div className="popup">
                <h2>{popupMessage}</h2>
                <h2>Do you wish to let us use this failed command to improve the eventflow cognitive architecture?</h2>
            <div className="response-options">
                <Button className="option" onClick={() =>setShowPopup(false)}>yes</Button>
                <a className="option" onClick={() =>setShowPopup(false)}>no</a>
            </div>
            </div>
        </div>
      );
        
    }

    const LoadingComponent = () => {
      return <ClipLoader color={"white"} loading={true} size={50} />;
    }
    

    const updateEvents = async (eventMap: any) => {
      setViewEvents(false)
      const formattedEvents = eventMap.map((event: { title: any; start: any; end: any }) => ({
        title: event.title,
        start: event.start,
        end: event.end
    }));

      try {
        const updatedEvents = fetch(`/api/calendar?userSid=${userSid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formattedEvents)
        })
      } catch (error) {
        console.log(error)

      }
    }

    

  return (
    
    <main className="flex font-mono min-h-screen flex-col  ">
      <br></br>
      <h2 className='text-center'>must input calendar settings before using eventflow</h2>
        <br/>
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
          {showLoadingComponent && (
            <div className="flex justify-center items-center ">
              <LoadingComponent></LoadingComponent>
            </div>
          )}
          {showPopup && 
            <div className="overlay">
              <Popup />
             </div>
          } 
          {viewEvents && (
            <div>
              {eventMap.map((event: any, index: number) => (
                <div key={event.id || index} id="popup1">  {/* Use event.id if it exists, else fall back to the index */}
                  <div className="popup" style={{ whiteSpace: 'nowrap', minWidth: '1500px', margin: 2, padding: 2 }}>
                    <h2 className='font mono'>
                      {event.title} on {(event.start).split('T')[0]} from {(event.start).split('T')[1]} to {(event.end).split('T')[1]}
                    </h2>
                  </div> 
                </div>
              ))}

              <Button onClick={() => updateEvents(eventMap)}> add to calendar </Button>
              
                        
            </div>
          )} 
    </main>
  )}