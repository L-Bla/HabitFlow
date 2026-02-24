"use server"

import { auth } from "@/src/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import LogOut from "./logout"

export default async function Account(){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session){
        redirect("/signin")
    }else{
        return(
            <LogOut session={session}/>
        )
    }
}