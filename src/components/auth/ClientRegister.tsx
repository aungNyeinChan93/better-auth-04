"use client";

import React from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import z from "zod";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

export type RegisterType = z.infer<typeof RegisterSchema>;
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(19, { message: "Name cannot exceed 19 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
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

const ClientRegister = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerSubmit = async (formData: RegisterType) => {
    const { data, error } = await authClient.signUp.email(
      { ...formData, callbackURL: "/login" },
      {
        onSuccess: (ctx) => {
          return router.push("/login");
        },
      }
    );
  };

  return (
    <React.Fragment>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {/* <Form> */}
            <form onSubmit={handleSubmit(registerSubmit)}>
              <div className="grid gap-3">
                <Label htmlFor="name">UserName</Label>
                {errors?.name && (
                  <p className="p-1 text-sm text-red-600">
                    {errors?.name?.message}
                  </p>
                )}
                <Input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                {errors?.email && (
                  <p className="p-1 text-sm text-red-600">
                    {errors?.email?.message}
                  </p>
                )}
                <Input
                  {...register("email")}
                  id="email"
                  type="text"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                {errors?.password && (
                  <p className="p-1 text-sm text-red-600">
                    {errors?.password?.message}
                  </p>
                )}
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                />
              </div>
              <Button className="mt-3 " type="submit" variant={"outline"}>
                Save changes
              </Button>
            </form>
            {/* </Form> */}
          </CardContent>
        </Card>
      </main>
    </React.Fragment>
  );
};

export default ClientRegister;
