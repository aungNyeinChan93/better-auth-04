"use client";

import { useSession } from "@/lib/authClient";
import React from "react";
import Loader from "../share/Laoder";

const TestSession = () => {
  const { data, error, isPending, refetch } = useSession();

  if (isPending) return <Loader />;
  if (error) return <>{error?.message}</>;

  return (
    <React.Fragment>
      <main>
        <pre>{data && JSON.stringify(data, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default TestSession;
