"use client"

import { signUpAction } from "@/src/actions/auth";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useFormStatus } from "react-dom";


function SignUpSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Signing up..." : "Sign up"}
        </Button>
    );
}


export default function SignUp(){
    return(
        <div className="flex items-center justify-center">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer w-xl">
                <CardHeader>
                    <CardTitle className="text-base">Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={signUpAction} className="flex flex-col gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" placeholder="Enter your name" />
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="example@email.com" required/>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="Enter your password here" required/>
                        <SignUpSubmitButton />
                    </form>
                    <div>Already have an account? <a href="/signin" className="hover:underline text-blue-500">Sign in</a>!</div>
                </CardContent>
            </Card>
        </div>
    )
}