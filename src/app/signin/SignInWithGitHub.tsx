"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export function SignInWithGitHub() {
  const { signIn } = useAuthActions();

  return (
    <Button
      className="gap-2"
      variant="secondary"
      onClick={() => void signIn("github")}
    >
      <Icon icon="mdi:github" />
      GitHub
    </Button>
  );
}
