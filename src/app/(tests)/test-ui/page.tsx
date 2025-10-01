import TestUiLists from "@/components/testUI/TestUiLists";
import React from "react";

const TestUI = async () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen my-4">
        <TestUiLists />
      </main>
    </React.Fragment>
  );
};

export default TestUI;
