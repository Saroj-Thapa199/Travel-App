"use server"

import { signOut } from "@/auth"
import { redirect } from "next/navigation"


const logOut = async() => {
    await signOut({redirectTo: "/login"})
}

export default logOut