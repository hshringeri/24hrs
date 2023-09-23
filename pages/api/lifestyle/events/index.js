import { setEvents } from './controller'


export default function handler(req, res) {
     const {method} = req
 
     switch(method) {
         case 'GET':
            res.status(200).json({method, name: 'GET Request'})
             break
         case 'POST':
             const events = setEvents(req, res)
             if (typeof events === Error) {
                res.status(500).json({method, name: 'eventflow hallucinated.'})
             }
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