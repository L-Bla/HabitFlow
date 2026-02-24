"use client"

import { signInAction } from "@/src/actions/auth";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";


export default function SignIp(){
    return(
        <div className="flex items-center justify-center">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer w-xl">
                <CardHeader>
                    <CardTitle className="text-base">Sign in</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={signInAction} className="flex flex-col gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="example@email.com" required/>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="Enter your password here" required/>
                        <Button type="submit">Sign in</Button>
                    </form>
                    <div>Don't have an account? <a href="/signup" className="hover:underline text-blue-500">Sign up</a>!</div>
                </CardContent>
            </Card>
        </div>
    )
}