import TestAuth from "@/components/auth/TestAuth";
import React from "react";

const TestAuthentication = async () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen flex justify-center items-center">
        <TestAuth />
      </main>
    </React.Fragment>
  );
};

export default TestAuthentication;
