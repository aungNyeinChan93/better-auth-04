"use client";

import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteLists from "../quotes/QuoteLists";
import RecipeLists from "../recipes/RecipeLists";
import Loader from "../share/Laoder";

const TestUiLists = () => {
  return (
    <React.Fragment>
      <main className=" container mx-auto w-full p-10">
        <Tabs defaultValue="quotes">
          <TabsList>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
          </TabsList>
          <TabsContent value="quotes">
            <Card>
              <Suspense fallback={<Loader />}>
                <QuoteLists />
              </Suspense>
            </Card>
          </TabsContent>
          <TabsContent value="recipes">
            <Card>
              <Suspense fallback={<Loader />}>
                <RecipeLists />
              </Suspense>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </React.Fragment>
  );
};

export default TestUiLists;
