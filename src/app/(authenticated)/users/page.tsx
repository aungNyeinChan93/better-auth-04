import Loader from "@/components/share/Laoder";
import UserLists from "@/components/users/UserLists";
import React, { Suspense } from "react";

const UsersPage = async () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen ">
        <Suspense fallback={<Loader />}>
          <UserLists />
        </Suspense>
      </main>
    </React.Fragment>
  );
};

export default UsersPage;
