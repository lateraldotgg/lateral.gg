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

// Simple OAuth buttons in center of grid
const SignIn = () => {
  return (
    <div
      className="col-span-5 col-start-3 row-span-3 row-start-3 flex w-full
        flex-col items-center"
    >
      <Card>
        <CardHeader className="p-4">
          <CardHeading>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>More options coming soon...</CardDescription>
          </CardHeading>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <SignInWithGitHub />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
