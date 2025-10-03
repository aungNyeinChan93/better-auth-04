"use client";

import { registerAction } from "@/features/authentications/auth-actions";
import { signIn } from "@/lib/authClient";
import { redirect } from "next/navigation";
import React, { useActionState } from "react";
import OauthBtn from "../share/OauthBtn";

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerAction, undefined);

  if (state?.success) {
    return redirect("/login");
  }
  return (
    <React.Fragment>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold text-center">Register Form</h1>

          {/* Email + Password */}
          <form className="space-y-4" action={formAction}>
            <p className="text-red-600 text-sm capitalize">
              {!state?.success && state?.errors.other}
            </p>
            <p className="text-red-600 text-sm capitalize">
              {!state?.success && state?.errors.name}
            </p>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border p-2"
              name="name"
            />
            <p className="text-red-600 text-sm capitalize">
              {!state?.success && state?.errors.email}
            </p>

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border p-2"
              name="email"
            />
            <p className="text-red-600 text-sm capitalize">
              {!state?.success && state?.errors.password}
            </p>

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border p-2"
              name="password"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">OR</div>

          {/* Social logins */}
          {/* <button
            type="button"
            onClick={() => signIn.social({ provider: "github" })}
            className="mb-2 w-full rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-900"
          >
            Continue with Github
          </button>
          <button
            //   onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
          >
            Continue with Google
          </button> */}
          <OauthBtn />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;
