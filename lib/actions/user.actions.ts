'use server'

import User from '../models/user.model'
import { connectToDB } from '../mongoose'

interface CreateUserParams {
    userId: String,
    email: String,
    username: String,
    name: String,
    image: String
}

export const createUser = async ({
    userId,
    email,
    username,
    name,
    image
}:CreateUserParams): Promise<void> => {

    try {
        connectToDB()
        await User.create({
            id: userId,
            username: username?.toLowerCase(),
            email,
            name,
            image
        })
    } catch (error:any) {
        console.log(error)
        throw new Error(`Failed to create user: ${error.message}`)
    }   
}