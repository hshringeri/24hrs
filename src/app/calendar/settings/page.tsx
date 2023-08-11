'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsFillGearFill } from 'react-icons/bs'

export default function Settings() {

  const [proffesion, setProffesion] = useState("")
  const [workHours, setWorkHours] = useState("")
  const [sleepHours, setSleepHours] = useState("")
  const [lunchTime, setLunchTime] = useState("")
  const [dinnerTime, setDinnerTime] = useState("")
  const [other, setOther] = useState("")

  const router = useRouter();
  const searchParams = useSearchParams()
  const userSid = searchParams?.get('usersid')
  console.log(userSid)
  

  // A check for undefined is important because on the initial render, 
  // query parameters might not be set. This happens especially during client-side transitions.
  if (userSid === undefined) {
    return <div>Loading...</div>;
  }

  function onSumbit() {
    const settings = {
        proffesion: proffesion,
        workHours: workHours,
        sleepHours: sleepHours,
        lunchTime: lunchTime,
        dinnerTime: dinnerTime,
        other: other
    }
  }



  return (
    <div className="min-h-screen bg-gray-400 text-gray-700 font-mono">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <BsFillGearFill className="text-8xl"/>
        </div>

        <br></br>

        <div className="flex flex-col space-y-4"> {/* This sets the direction to column and space between items to 1rem */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4"> proffesion:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setProffesion(e)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">work hours:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setWorkHours(e)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">sleep hours:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setSleepHours(e)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">lunch time:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                    onBlur={(e: any)=> {setLunchTime(e)}}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="flex-shrink-0 mr-4">dinner time:</h1>
                <input className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="Enter hours"
                />
            </div>
            <form id="need" className="flex">  {/* Add the "flex" and "items-center" classes */}
                <h1 className="flex-shrink-0 mr-4">other stuff:</h1>
                <textarea 
                    id="note"
                    name="note" 
                    rows="20" cols="30" 
                    className="px-2 py-1 max-w-xs sm:px-5 sm:py-3 flex-1 text-gray-700 bg-gray-300 focus:bg-gray-400 focus:outline-none focus:ring-[1px] focus:ring-blue-700"
                    placeholder="other stuff"
                >
                </textarea>
            </form>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Button>submit</Button>
            
        </div>


    </div>
  );
}