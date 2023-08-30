import { getSettings, updateSettings } from './controller'

export default async function handler(req, res) {
   try { 
    connectMongo()
   } catch(error) {
        res.status(405).json({error :"Error in the connection"})
   }
    const {method} = req

    switch(method) {
        case 'GET':
            //getSettings(req, res)
            break
        case 'POST':
            res.status(200).json({method, name: 'POST Request'})
            break
        case 'PUT':
            console.log("hi")
            updateSettings(req,res)
            break
        case 'DELETE':
            res.status(200).json({method, name: 'DELETE Request'})
            break
        default:
            res.setHeader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method${method}Not Allowed`)
    }

    

}