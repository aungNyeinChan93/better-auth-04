"use client";

import getUsersQueryOption from "@/lib/react_query/users/getUsersQueryOption";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import UsersTable from "./UsersTable";

const UserLists = () => {
  const { data: users, error } = useSuspenseQuery({
    ...getUsersQueryOption(),
    staleTime: 10000 * 60,
  });

  if (error) return <>{error?.message}</>;
  return (
    <React.Fragment>
      <main className="w-full min-h-auto container mx-auto p-10 max-w-7xl">
        <UsersTable users={users} />
      </main>
    </React.Fragment>
  );
};

export default UserLists;
