import { setNeedEvents } from './controller'


export default function handler(req, res) {
     const {method} = req
 
     switch(method) {
         case 'GET':
            res.status(200).json({method, name: 'GET Request'})
             console.log("we dem bys")
             break
         case 'POST':
            setNeedEvents(req, res)
            console.log("we dem bys")
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