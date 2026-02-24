"use client"

import { signOutAction } from "@/src/actions/auth";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";


export default function LogOut(session){
    return(
        <div className="flex items-center justify-center">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer w-xl">
                <CardHeader>
                    <CardTitle className="text-base">Sign out</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" readOnly id="name" name="name" placeholder="Enter your name" value={session.session.user.name}/>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" readOnly id="email" name="email" placeholder="example@email.com" value={session.session.user.email} required/>
                    </div>
                    <div className="flex flex-row items-end justify-end mt-5">
                        <form action={signOutAction}>
                            <Button type="submit">Sign out</Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}