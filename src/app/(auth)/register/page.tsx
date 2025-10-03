import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "@/features/authentications/auth-actions";
import { redirect } from "next/navigation";
import React from "react";

const RegisterPage = async () => {
  const session = await getServerSession();
  if (session) {
    return redirect("/");
  }
  return (
    <React.Fragment>
      <main className="w-full min-h-screen bg-green-50">
        <RegisterForm />
      </main>
    </React.Fragment>
  );
};

export default RegisterPage;
