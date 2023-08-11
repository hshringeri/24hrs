import { getCalendar } from './controller'


export default function handler(req, res) {
     const {method} = req
 
     switch(method) {
         case 'GET':
             getCalendar(req, res)
             break
         case 'POST':
             res.status(200).json({method, name: 'POST Request'})
             break
         case 'PUT':
             res.status(200).json({method, name: 'PUT Request'})
             break
         case 'DELETE':
             res.status(200).json({method, name: 'DELETE Request'})
             break
         default:
             res.setHeader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
             res.status(405).end(`Method${method}Not Allowed`)
     }
 
     
 }