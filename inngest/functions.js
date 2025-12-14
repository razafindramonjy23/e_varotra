import { inngest } from "./client";
import prisma from "@/lib/prisma";

// Inngest Func to save user data to a database
export const syncUserCreation = inngest.createFunction({
    id: 'sync-user-create'}, 
    {event: 'clerk/user.created'},
    async ({ event }) => {
        const { data } = event
        await prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)


//INNGEST func to updata user data in db
export const syncUserUpdate = inngest.createFunction(
    {id: 'sync-user-update'},
    {event: 'clerk/user.updated'},
    async ({ event }) => {
        const { data } = event 
        await prisma.user.update({
            where: { id: data.id, },
            data: {
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)

// Inngest func to delete user data from db
export const syncUserDeletion = inngest.createFunction(
    {id: 'sync-user-delete'},
    {event: 'clerk/user.deleted'},
    async ({ event }) => {
        const { data } = event 
        await prisma.user.delete({
            where: { id: data.id, },
        })
    }
)