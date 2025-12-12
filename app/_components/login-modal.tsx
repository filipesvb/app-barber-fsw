import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { getAuthUrl } from "@/lib/get-auth-url";

const LoginModal = () => {
  const handleGoogleLogin = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: getAuthUrl(),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <DialogTitle>Faça login</DialogTitle>
      <Button
        onClick={handleGoogleLogin}
        className="bg-primary flex items-center justify-center gap-2 rounded-md px-10 py-3"
        size={"lg"}
      >
        <Image src="/google.svg" alt="Google Icon" width={32} height={32} />
        <span className="text-white">Google</span>
      </Button>
    </div>
  );
};

export default LoginModal;
