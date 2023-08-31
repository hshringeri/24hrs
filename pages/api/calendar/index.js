import { getCalendar, updateEvents, deleteCalendarEvent } from './controller'
import  connectMongo from '../../../mongo/connectMongo.js'


export default async function handler(req, res) {
    try { 
        connectMongo()
    } catch(error) {
            res.status(405).json({error :"Error in the connection"})
    }

     const {method} = req
 
     switch(method) {
         case 'GET':
             getCalendar(req, res)
             break
         case 'POST':
             res.status(200).json({method, name: 'POST Request'})
             break
         case 'PUT':
             updateEvents(req, res)
             break
         case 'DELETE':
             deleteCalendarEvent(req, res)
             res.status(200).json({method, name: 'DELETE Request'})
             break
         default:
             res.setHeader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
             res.status(405).end(`Method${method}Not Allowed`)
     }
 
     
 }