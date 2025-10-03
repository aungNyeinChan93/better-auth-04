import { AArrowDown, Github, DiscIcon } from "lucide-react";
import { ReactElement } from "react";

type OAuthProvider = "google" | "github" | "discord";

export const oauthProvider: Record<
  OAuthProvider,
  { name: string; icon: ReactElement }
> = {
  google: { name: "google", icon: <AArrowDown /> },
  discord: {
    name: "discord",
    icon: <DiscIcon />,
  },
  github: { name: "github", icon: <Github /> },
};
