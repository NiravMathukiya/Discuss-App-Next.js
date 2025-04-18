"use server"

import * as auth  from "@/auth"

export const signIn = async () => {
    return await auth.signIn()
}