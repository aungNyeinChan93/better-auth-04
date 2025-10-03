"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { oauthProvider } from "@/lib/oauthProvider";
import toast from "react-hot-toast";
import { error } from "console";

const OauthBtn = () => {
  return (
    <React.Fragment>
      <section>
        <div className="w-full flex justify-between gap-1">
          <Button
            className=""
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
            className=""
            variant={"destructive"}
            type="button"
            onClick={async () => {
              const res = await authClient.signIn.social({
                provider: oauthProvider.google.name,
              });
              if (res.error) {
                toast.error(
                  res.error instanceof Error
                    ? res.error?.message
                    : "oauth error"
                );
              }
            }}
          >
            {oauthProvider.google.name}
          </Button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default OauthBtn;
