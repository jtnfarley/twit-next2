'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import { FilterQuery, SortOrder } from 'mongoose'
import { $ZodNaN } from 'zod/v4/core'

interface CreateUserParams {
    userId: string,
    email: string,
    username: string,
    name: string,
    image: string
}

interface UpdateUserParams {
    userId: string,
    email?: string,
    username?: string,
    name?: string,
    bio?: string,
    path?: string,
    image?: string
}

export const createUser = async ({
    userId,
    email,
    username,
    name,
    image
}:CreateUserParams): Promise<void> => {

    try {
        await connectToDB()
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

export const fetchUser = async (userId:string) => {

    try {
        await connectToDB()
        return await User.findOne({
            id: userId
        })
    } catch (error:any) {
        console.log(error)
        throw new Error(`Failed to create user: ${error.message}`)
    }   
}

export const updateUser = async ({
    userId,
    email,
    username,
    name,
    image,
    bio,
    path
}:UpdateUserParams): Promise<void> => {

    try {
        await connectToDB()
        await User.findOneAndUpdate(
            {id: userId },
            {
                username: username?.toLowerCase(),
                email,
                name,
                image,
                bio,
                path,
                onboarded: true
            }
        )

        if (path === '/profile/edit') revalidatePath(path)
    } catch (error:any) {
        console.log(error)
        throw new Error(`Failed to update user: ${error.message}`)
    }   
}

export const fetchUsers = async ({
    userId,
    searchString = '',
    pageNumber = 1,
    pageSize = 20,
    sortBy = 'desc'
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) => {

    try {
        await connectToDB()
        const skipAmount = (pageNumber - 1) * pageSize
        const regex = new RegExp(searchString, 'i') 
        const query:FilterQuery<typeof User> = {
            id: { $ne: userId }
        }

        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }

        const sortOptions = {
            createdAt: sortBy
        }

        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)
        const users = await userQuery.exec()
        const isNext = totalUserCount > skipAmount + users.length

        return {
            users,
            isNext
        }
    } catch (error:any) {
        console.log(error)
        throw new Error(`Failed to fetch users: ${error.message}`)
    }   
}
