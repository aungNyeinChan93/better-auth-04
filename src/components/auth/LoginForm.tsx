"use client";

import { LoginAction } from "@/features/authentications/auth-actions";
import { authClient } from "@/lib/authClient";
import { redirect, useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

const LoginForm = () => {
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      session.data != null ? router.push("/") : null;
    });
  }, [router]);

  const [state, formAction] = useActionState(LoginAction, undefined);

  if (state?.success) {
    return redirect("/test-auth");
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">Login Form</h1>

        {/* Email + Password */}
        <form className="space-y-4" action={formAction}>
          <p className="text-red-600 text-sm capitalize">
            {!state?.success && state?.errors?.email}
          </p>
          <p className="text-red-600 text-sm capitalize">
            {!state?.success && state?.errors?.other}
          </p>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-2"
            name="email"
          />
          <p className="text-red-600 text-sm capitalize">
            {!state?.success && state?.errors?.password}
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
            Sign In
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
