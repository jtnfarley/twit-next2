import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true)

    if (!process.env.MONGODB_URL) return console.log('Missing Mongodb Url')
    
    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
    
}