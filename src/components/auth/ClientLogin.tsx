"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

export type LoginType = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, { message: "Password cannot exceed 32 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character (@$!%*?&)",
    }),
});

const ClientLogin = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const loginSubmit = async (formData: LoginType) => {
    const { data, error } = await authClient.signIn.email(
      {
        ...formData,
      },
      {
        onSuccess: (ctx) => {
          router.push("/test-auth");
        },
      }
    );
  };

  return (
    <React.Fragment>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
                <Input
                  {...register("email")}
                  id="email"
                  defaultValue=""
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
                <Input
                  {...register("password")}
                  id="password"
                  defaultValue="*********"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mt-3" variant={"outline"}>
                Save changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </React.Fragment>
  );
};

export default ClientLogin;
