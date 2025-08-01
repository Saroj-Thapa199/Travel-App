"use server"

import Collection from "@/model/Collection"
import dbConnect from "../dbConnect"
import { createCollectionSchema, CreateCollectionType } from "../validation"
import { auth } from "@/auth"

export const createCollection = async (values: CreateCollectionType) => {
    try {
        const session = await auth()
        if (!session || !session.user.id) {
            return {
                error: "Unauthorized"
            }
        }
        const {success, data, error} = createCollectionSchema.safeParse(values)

        if (!success) {
            console.log(error.message)
            return {
                error: "Please fill the form properly"
            }
        }

        await dbConnect()

        const collection = await Collection.create({
            ...data,
            user: session.user.id
        })

        console.log(collection)
        return {
            error: "ok"
        }
    } catch (error) {
        
    }
}