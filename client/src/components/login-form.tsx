"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactEventHandler, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (await login(username, password, setLoading)) {
            window.location.href = '/dashboard';
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="relative hidden md:block">
                        <img
                            src="/auth.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <form className="p-6 md:p-8 my-20" onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-4xl font-bold">FLEXIFY</h1>
                                <p className="text-muted-foreground text-balance">
                                    Welcome Back!
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Username</Label>
                                <Input id="username" required onChange={(e: any) => setUsername(e.target.value)} />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required onChange={(e: any) => setPassword(e.target.value)} />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
