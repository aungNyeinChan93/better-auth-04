"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/authClient";
import { oauthProvider } from "@/lib/oauthProvider";
import React from "react";

const TestOauthPage = () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen flex justify-center items-center">
        <Card className=" w-full max-w-lg p-3  ">
          <div className="flex justify-between px-1">
            <Button
              className="w-[200px]"
              variant={"default"}
              type="button"
              onClick={() => {
                authClient.signIn.social({
                  provider: oauthProvider.github.name,
                });
              }}
            >
              {oauthProvider.github.name}
            </Button>
            <Button
              className="w-[200px]"
              variant={"destructive"}
              type="button"
              onClick={() => {
                authClient.signIn.social({
                  provider: oauthProvider.google.name,
                });
              }}
            >
              {oauthProvider.google.name}
            </Button>
          </div>
        </Card>
      </main>
    </React.Fragment>
  );
};

export default TestOauthPage;
