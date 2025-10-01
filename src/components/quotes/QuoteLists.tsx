"use client";

import getQuotesQueryOption from "@/lib/react_query/quotes/getQuotesQueryOption";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const QuoteLists = () => {
  const { data: quotes, error } = useSuspenseQuery({
    ...getQuotesQueryOption(),
  });

  if (error) return <p className="p-2 text-red-600">{error?.message}</p>;
  return (
    <React.Fragment>
      <main className="w-full px-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Array.isArray(quotes) &&
            quotes?.map((quote) => (
              <Card className="p-3 bg-red-50/60">
                <p className="p-2 my-2 rounded text-black">{quote?.quote}</p>
                <Button
                  type="button"
                  variant={"outline"}
                  className=" inline-block w-20"
                >
                  Detail
                </Button>
              </Card>
            ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default QuoteLists;
