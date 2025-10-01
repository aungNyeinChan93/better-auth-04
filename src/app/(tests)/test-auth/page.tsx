import TestSession from "@/components/tests/TestSession";
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
        <div className="flex justify-between">
          {/* server session */}
          <section>
            {session ? (
              <pre>{JSON.stringify(session, null, 2)}</pre>
            ) : (
              <>{"Undefined Session"}</>
            )}
          </section>

          {/* clientSession */}
          <TestSession />
        </div>
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
