'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import CalendarLogo from '../../../images/calendar-icon-free-vector.jpeg'

export default function Home() {
    const [calendarData, setCalendarData] = useState(null)
    const [synced, setSynced] = useState(false)
    const [addWork, setAddWork] = useState(false)
    const [addNeed, setAddNeed] = useState(false)
    const [addWantLearn, setAddWantLearn] = useState(false)
    const [addWantDo, setAddWantDo] = useState(false)
    const [workEvents, setWorkEvents] = useState('');
    const [needEvents, setNeedEvents] = useState('');
    const [wantLearnEvents, setWantLearnEvents] = useState('');
    const [wantDoEvents, setWantDoEvents] = useState('');
    

    console.log(wantLearnEvents)

  
    const getAuthToken = async () => {
      try {
        const response = await fetch('/api/googleOAuth');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    
    console.log(calendarData);
    
    const getCalendar = async () => {
      try {
        await getAuthToken();
    
        const response = await fetch('/api/calendar');
        const data = await response.json();
        
        setCalendarData(data);
        setSynced(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    const handleWorkEventsSubmit = async (e: any) => {
      e.preventDefault();
      
      try {
        const response = await fetch('/api/workEvents', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workEvents), 
        });
    
        if (!response.ok) {
          throw new Error('Unable to post work events');
        }
    
        const data = await response.json();
    
        // Do something with the returned data
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
      

    }
    const handleNeedEventsSubmit = async (e: any) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/needEvents', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(needEvents), 
        });
    
        if (!response.ok) {
          throw new Error('Unable to post need events');
        }
    
        const data = await response.json();
    
        // Do something with the returned data
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    const handleWantLearnEventsSubmit = async (e: any) => {
      e.preventDefault();
      console.log("HIIIIIIIIII")
      console.log(wantLearnEvents)

      try {
        const response = await fetch('/api/wantLearnEvents', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wantLearnEvents), 
        });
    
        if (!response.ok) {
          throw new Error('Unable to post want events');
        }
    
        const data = await response.json();
    
        // Do something with the returned data
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const handleWantDoEventsSubmit = async (e: any) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/wantDoEvents', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wantDoEvents), 
        });
    
        if (!response.ok) {
          throw new Error('Unable to post want do events');
        }
    
        const data = await response.json();
    
        // Do something with the returned data
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const formContainerStyles = {
      display: 'flex',
      justifyContent: 'space-between',
    };
    


  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={CalendarLogo}
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {synced && (
          <h1>calendar synced</h1>
        )}

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-5 lg:text-left">

        <Button
           onClick={getCalendar}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Access Google Calendar
          </h2>
        </Button>

        <Button
           onClick={() => setAddWork(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Add Work To Do List
          </h2>
        </Button>

        <Button
           onClick={() => setAddNeed(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Add Need To Do List
          </h2>
        </Button>

        <Button
           onClick={() => setAddWantLearn(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Add Want To Learn List
          </h2>
        </Button>

        <Button
           onClick={() => setAddWantDo(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Add Want To Do
          </h2>
        </Button>

      <br></br>
        
      </div>

      <div style={formContainerStyles}>
        {addWork && (

          <div>

            <form id="work" onSubmit={handleWorkEventsSubmit}>
              <textarea 
              id="note"
              name="note" 
              rows="20" cols="30" 
              className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
              placeholder="Add work things to get done..."
              value={workEvents}
              onChange={(e) => setWorkEvents(e.target.value)}
              >
              </textarea>
              <input 
                type="submit"
    
              value="Save"></input>
              <br></br>
            </form>

          </div>

        )}

        {addNeed && (

          <div>

            <form id="need" onSubmit={handleNeedEventsSubmit}>
              <textarea 
              id="note"
              name="note" 
              rows="20" cols="30" 
              className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
              placeholder="Add things you need to do : (get groceries, pick up son from camp, go to doctors)"
              value={needEvents}
              onChange={(e) => setNeedEvents(e.target.value)}
              >
              </textarea>
              <input type="submit" value="Save"></input>
              <br></br>
            </form>

          </div>

          

        )}

        

      {addWantLearn && (
        
        <div>

          <form id="wantLearn" onSubmit={handleWantLearnEventsSubmit}>
            <textarea 
            id="note"
            name="note" 
            rows="20" cols="30" 
            className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
            placeholder="Add things you want learn: (learn about a topic) "
            value={wantLearnEvents}
            onChange={(e) => setWantLearnEvents(e.target.value)}
            >
            </textarea>
            <input type="submit" value="Save"></input>
            <br></br>
          </form>

          </div>

      )}  

      {addWantDo && (
        
        <div>

          <form id="wantDo" onSubmit={handleWantDoEventsSubmit}>
            <textarea 
            id="note"
            name="note" 
            rows="20" cols="30" 
            className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
            placeholder="Add things you want do "
            value={wantDoEvents}
            onChange={(e) => setWantDoEvents(e.target.value)}
            >
            </textarea>
            <input type="submit" value="Save"></input>
            <br></br>
          </form>

          </div>

      )}  
      </div>
    </main>
  )
}
