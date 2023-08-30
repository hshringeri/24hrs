'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsFillGearFill } from 'react-icons/bs'

export default function Settings() {

  const [profession, setProfession] = useState("")
  const [workHours, setWorkHours] = useState("")
  const [sleepHours, setSleepHours] = useState("")
  const [lunchTime, setLunchTime] = useState("")
  const [dinnerTime, setDinnerTime] = useState("")

  const router = useRouter();
  const searchParams = useSearchParams()
  const userSid = searchParams?.get('usersid')
  console.log(userSid)
  

  // A check for undefined is important because on the initial render, 
  // query parameters might not be set. This happens especially during client-side transitions.
  if (userSid === undefined) {
    return <div>Loading...</div>;
  }

  async function onSubmit() {
    const settings = {
        profession: profession,
        workHours: workHours,
        sleepHours: sleepHours,
        lunchTime: lunchTime,
        dinnerTime: dinnerTime
    }

    const settingsData = {
        settings: settings,
        userSid: userSid
    }

    try {
        console.log("HIIIIII")
        console.log(settingsData)
        const response = await fetch('/api/calendar/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settingsData)
        });

        if(response.ok) {
            const result = await response.json();
            console.log(result);
        } else {
            console.error("Failed to update settings:", response.statusText);
        }
    } catch (error) {
        console.error("There was an error sending the PUT request:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-400 text-gray-700 font-mono ">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <BsFillGearFill className="text-8xl"/>
        </div>

        <br></br>

        <div className="flex flex-col space-y-4"> {/* This sets the direction to column and space between items to 1rem */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4"> profession:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setProfession(e.target.value)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">work hours:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setWorkHours(e.target.value)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">sleep hours:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setSleepHours(e.target.value)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">lunch time:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setLunchTime(e.target.value)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">dinner time:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setDinnerTime(e.target.value)}}
                />
            </div>
           

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Button onClick={onSubmit}>submit</Button> 
        </div>


    </div>
  );
}