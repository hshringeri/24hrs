'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import LifeStyleLogo from '../../../../images/lifestyle-neon.png'
import { get } from 'http'
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
    const [event, setEvent] = useState('');
    const [eventMap, setEventMap] = useState([]);
    const [viewEvents, setViewEvents] = useState(false)
  
    const searchParams = useSearchParams()
    const userSid = searchParams?.get('usersid')
    console.log(userSid)


    const handleAddEvents = async (e: any) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/lifestyle/events', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event), 
        });
    
        if (!response.ok) {
          throw new Error('Unable to post events');
        }
    
        const data = await response.json();
    
        // Do something with the returned data
        console.log(data)
        setEventMap(data.data)
        setEvent("")
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const formContainerStyles = {
      display: 'flex',
      justifyContent: 'space-between',
    };
    
    useEffect(() => {
      console.log(eventMap)
      setViewEvents(true)
    }, [eventMap])

  return (
    
    <main className="font-mono flex min-h-screen flex-col items-center justify-between p-48 ">
     
        <Image
          className="relative rounded-full dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src={LifeStyleLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />

    
        <form id="wantDo" onSubmit={handleAddEvents}>
            <div className="flex items-center ">
                <textarea 
                  id="note"
                  name="note" 
                  rows="2" 
                  cols="30" 
                  className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-blue-700 placeholder:text-zinc-400 rounded"
                  placeholder="schedule stuff"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                ></textarea>
                
                <input type="submit" value="+" className="ml-2 text-xl"></input>
            </div>
            <br></br>
        </form>

        {
          viewEvents && (
            <div>
              {eventMap.map((event: any) => (
                <div> event: {event.event_name} date: {event.date} start time: {event.start_time} end time: {event.end_time}
                  
                </div>
              ))}
            </div>
          )
        }

    </main>
  )}