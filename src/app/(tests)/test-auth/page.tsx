import { Button } from "@/components/ui/button";
import { getServerSession } from "@/features/authentications/auth-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

        {session && (
          <>
            <form
              action={async () => {
                "use server";
                const { success } = await auth.api.signOut({
                  headers: await headers(),
                });
                if (success) {
                  return redirect("/login");
                }
              }}
            >
              <Button type="submit">Logout</Button>
            </form>
          </>
        )}
      </main>
    </React.Fragment>
  );
};

export default TestAuthPage;
