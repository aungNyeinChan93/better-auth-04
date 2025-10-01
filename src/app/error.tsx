"use client";

import React, { useEffect } from "react";

interface Props {
  error: Error | undefined;
  reset: () => void;
}

const RootError = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error instanceof Error ? error.message : "Unknown Error");
  }, []);
  return (
    <React.Fragment>
      <main className="container mx-auto my-20 min-h-screen">
        <p className="text-red-600 text-xl p-3">{error && error?.message}</p>
        <button type="button" onClick={reset}>
          refresh
        </button>
      </main>
    </React.Fragment>
  );
};

export default RootError;
