"use client";

import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersAndArticles } from "@/app/api/users/route";

interface Props {
  users?: UsersAndArticles;
}

const UsersTable: FC<Props> = ({ users }) => {
  return (
    <React.Fragment>
      <main className="border border-red-50 rounded-2xl shadow p-2">
        <Table>
          <TableCaption>A list of your recent users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {/* {user?.articles?.map((a) => (a ? a.title : undefined))} */}
                    {user?.articles?.length}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{users?.length!}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </main>
    </React.Fragment>
  );
};

export default UsersTable;
