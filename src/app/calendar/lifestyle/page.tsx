'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import LifeStyleLogo from '../../../../images/lifestyle-neon.png'
import { get } from 'http'
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
    const [addNeed, setAddNeed] = useState(false)
    const [addWantLearn, setAddWantLearn] = useState(false)
    const [addWantDo, setAddWantDo] = useState(false)
    const [workEvents, setWorkEvents] = useState('');
    const [needEvents, setNeedEvents] = useState('');
    const [wantLearnEvents, setWantLearnEvents] = useState('');
    const [wantDoEvents, setWantDoEvents] = useState('');
  

    console.log(wantLearnEvents)

    const router = useRouter();
    const searchParams = useSearchParams()
    const userSid = searchParams?.get('usersid')
    console.log(userSid)


    

    const handleNeedEventsSubmit = async (e: any) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/lifestyle/needEvents', {
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
        const response = await fetch('/api/lifestyle/wantLearnEvents', {
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
        const response = await fetch('/api/lifestyle/wantDoEvents', {
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
    
    <main className="font-mono flex min-h-screen flex-col items-center justify-between p-24 ">
     
        <Image
          className="relative rounded-full dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src={LifeStyleLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />
        <br></br>
      <h2 className="font-mono text-2xl"> lifestyle </h2>

  

      <div className="font-mono mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        <Button
           onClick={() => setAddNeed(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            add need to do list
          </h2>
        </Button>

        <Button
           onClick={() => setAddWantLearn(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            add want to learn list
          </h2>
        </Button>

        <Button
           onClick={() => setAddWantDo(true)}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className=" fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Add want to do list
          </h2>
        </Button>

      <br></br>
        
      </div>

      <div style={formContainerStyles}>
        {addNeed && (

          <div>

            <form id="need" onSubmit={handleNeedEventsSubmit}>
              <textarea 
              id="note"
              name="note" 
              rows="20" cols="30" 
              className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-blue-700 placeholder:text-zinc-400"
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
            className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-blue-700 placeholder:text-zinc-400"
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
            className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black  focus:outline-none focus:ring-[1px] focus:ring-blue-700 placeholder:text-zinc-400"
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
  )}