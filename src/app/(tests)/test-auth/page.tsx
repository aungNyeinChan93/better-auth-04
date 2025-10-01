import { getServerSession } from "@/features/authentications/auth-actions";
import React from "react";

const TestAuthPage = async () => {
  const session = await getServerSession();
  return (
    <React.Fragment>
      <main>
        {session ? (
          <pre>{JSON.stringify(session, null, 2)}</pre>
        ) : (
          <>{"Undefined Session"}</>
        )}
      </main>
    </React.Fragment>
  );
};

export default TestAuthPage;
