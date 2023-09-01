'use client'
import React, { useEffect, useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
import { useSearchParams  } from 'next/navigation'
import { BsFillGearFill } from 'react-icons/bs'
import Calendar from './calendar'

export default function Home() {
    const [calendarData, setCalendarData] = useState(null)
    const [currentCalendar, setCurrentCalendar] =  useState(null)
    const [synced, setSynced] = useState(false)


    const router = useRouter();
    const searchParams = useSearchParams()
    const userSid = searchParams?.get('usersid')
    const userId = searchParams?.get('userId')
    console.log(userSid)
    console.log(currentCalendar)
    console.log(userId)

  
    const getAuthToken = async () => {
      try {
        console.log("trying")
        const response = await fetch(`/api/googleAuth?userSid=${userSid}`, { mode: 'no-cors' });
        console.log(response)
        const data = await response.json();
        console.log(data)
        
        window.location.href=data.url
        return data;
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    
    console.log(calendarData);
    
    const getCalendar = async () => {
      try {
       const token = await getAuthToken();
       console.log(token)

       console.log(userSid)
       
        console.log("hello")
        const response = await fetch(`/api/calendar?userSid=${userSid}`);
        const data = await response.json();
        
        setCalendarData(data);
        setSynced(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    useEffect(() => {
      const fetchCalendar = async () => {
        try {
          const res = await fetch(`/api/calendar/data?userSid=${userSid}`);
          console.log("hello")
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
    
      if (calendarData != null)
        fetchCalendar();      
    },)

    const formContainerStyles = {
      display: 'flex',
      justifyContent: 'space-between',
    };

    const goToLifestyle = () => {
      router.push(`calendar/lifestyle?usersid=${userSid}`)
    }
    const goToWork = () => {
      router.push(`calendar/work?usersid=${userSid}`)
    }
    const goToSchool = () => {
      router.push(`calendar/school?usersid=${userSid}`)
    }
    const goToSettings = () => {
      router.push(`calendar/settings?usersid=${userSid}`)
    }
    
    


  return (

    
    
    <main className="font-mono flex min-h-screen flex-col ">
      <div className="flex justify-between">
            <Button
              onClick={getCalendar}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              //target="_blank"
              // rel="noopener noreferrer"
            >
              <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                access google calendar
              </h2>
            </Button>

            <Button
                onClick={goToSettings}
                className="group rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                // target="_blank"
                // rel="noopener noreferrer"
            >
                <h2 className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-5 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-3 lg:dark:bg-zinc-800/30">
                    <BsFillGearFill className="text-4xl"/>
                </h2>
            </Button>
      </div>
        {synced && (
          <h2 className="font-mono">calendar synced</h2>
        )}

      
      
      <Calendar
        currentCalendar={currentCalendar}
        userSid={userSid}
      />
        
        <br></br>
    
      {synced && (
          <h2 className="font-mono">calendar synced</h2>
        )}

  <div className="flex flex-col items-center  min-h-screen"> 
    <h2 className="font-mono text-2xl text-center mb-4">maximize the time you have!</h2>
    <div className="font-mono mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left place-items-center">
        
        <Button
           onClick={goToLifestyle}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            LifeStyle Edition
          </h2>
        </Button>

        <Button
           onClick={goToSchool}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            School Edition
          </h2>
        </Button>

        <Button
           onClick={goToWork}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Work Edition
          </h2>
        </Button>
      <br></br>
        
      </div>
    </div>
    </main>
  )
}
