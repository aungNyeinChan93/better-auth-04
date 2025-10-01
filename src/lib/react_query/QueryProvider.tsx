"use client";

import React, { FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface Props {
  children: ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
  const client = new QueryClient();
  return (
    <React.Fragment>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default QueryProvider;
