"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInWithGitHub } from "@/app/signin/SignInWithGitHub";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Component to handle redirect for unauthenticated users
const UnauthenticatedRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/signin");
  }, [router]);

  return <div>Redirecting to sign in...</div>;
};

// Simple OAuth buttons in center of grid
const Profile = () => {
  const { signOut } = useAuthActions();

  return (
    <div
      className="col-span-5 col-start-3 row-span-3 row-start-3 flex w-full
        flex-col items-center"
    >
      <AuthLoading>Fetching user</AuthLoading>

      <Unauthenticated>
        <UnauthenticatedRedirect />
      </Unauthenticated>

      <Authenticated>
        <Card>
          <CardHeader className="p-4">
            <CardHeading>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your profile</CardDescription>
            </CardHeading>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button
              className="gap-2"
              variant="secondary"
              onClick={() => void signOut()}
            >
              Sign out
            </Button>
          </CardContent>
        </Card>
      </Authenticated>
    </div>
  );
};

export default Profile;
