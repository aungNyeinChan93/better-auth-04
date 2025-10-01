import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage = async () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen bg-green-50">
        <RegisterForm />
      </main>
    </React.Fragment>
  );
};

export default RegisterPage;
