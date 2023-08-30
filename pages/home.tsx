'use client'
import React, { useEffect, useState } from 'react'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
import { useSearchParams  } from 'next/navigation'
import { BsFillGearFill } from 'react-icons/bs'
import Calendar from '../src/app/calendar/calendar'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Home() {
    const [calendarLoaded, setCalendarLoaded] = useState(true)
    const [currentCalendar, setCurrentCalendar] =  useState(null)
    const [synced, setSynced] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const router = useRouter();
    const searchParams = useSearchParams()



    const { user, error, isLoading } = useUser();

    const userSid = user?.sid
    const userId = searchParams?.get('userId')
    console.log(userSid)
    console.log(currentCalendar)
    console.log(userId)

    useEffect(() => {
      if (user) {
            console.log(user);
            setLoggedIn(true);
        }
      }, [user]);

      useEffect(() => {
        const fetchCalendar = async () => {
          try {
            console.log(userSid)
            const res = await fetch(`/api/calendar/data?userSid=${userSid}`);
            console.log("hello");
            if (!res.ok) {
              throw new Error('Failed to fetch calendar data');
            }
            const data = await res.json();
            setCurrentCalendar(data);
            console.log(data); 
          } catch (error) {
            console.error("Error fetching calendar data:");
          }
        };
        
        fetchCalendar();      
      }, [userSid]); 

   if (isLoading) console.log("loading");
   if (error) return <div>{error.message}</div>;



    

  
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
    
    console.log(calendarLoaded)
    
    const getCalendar = async () => {
      try {
       const token = await getAuthToken();
       console.log(token)

       console.log(userSid)

        setSynced(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

      
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
    
    console.log(loggedIn)
    


  return (

    
    
    <main className="font-mono flex min-h-screen flex-col border-2 rounded-lg">     
      {!loggedIn && (
        <Link href="/api/auth/login" className="font-mono fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            login
        </Link>
      )}
      {loggedIn && (
        <div className="font-mono mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left ">
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
                  onClick={goToLifestyle}
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  //target="_blank"
                  // rel="noopener noreferrer"
                >
                  <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    schedule events
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
      )}
        {synced && (
          <h2 className="font-mono">calendar synced</h2>
        )}


      <div className=" font-mono text-1xl text-center mb-4 ">
          <Calendar
            currentCalendar={currentCalendar}
          />
      </div>

      
        
        <br></br>
    
      {synced && (
          <h2 className="font-mono">calendar synced</h2>
        )}

  <div className=" items-center "> 
    <h2 className="font-mono text-2xl text-center mb-4">maximize the time you have!</h2>
    <div className="font-mono mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left place-items-center">
        
        {/* <Button
           onClick={goToLifestyle}
           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          //target="_blank"
          // rel="noopener noreferrer"
        >
          <h2  className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            schedule events !!
          </h2>
        </Button> */}

        {/* <Button
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
        </Button> */}
      <br></br>
        
      </div>
    </div>
    </main>
  )
}