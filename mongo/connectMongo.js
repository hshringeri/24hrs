import mongoose from 'mongoose'

const connectMongo = async() => {
    try {
        console.log('DBB: ' + (process.env.MONGO_URI))
        const { connection } = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        })
        if(connection.readyState == 1) {
            console.log("Database Connected")
        }
    } catch (errors) {
        console.log('error boy')
        return Promise.reject(errors)
        
    }
}

export default connectMongo