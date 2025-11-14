"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getAuthUrl } from "@/lib/get-auth-url";

const Header = () => {
  const { data: session } = authClient.useSession();

  const handleLogin = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: getAuthUrl(),
    });
  };

  const handleLogout = () => {
    authClient.signOut();
  };

  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} />
      <div className="flex gap-2">
        {session?.user ? (
          <div className="flex text-right">
            <span className="text-sm">Hi, {session.user.name}</span>
            <Button variant={"outline"} size={"icon"} onClick={handleLogout}>
              <LogOutIcon />
            </Button>
          </div>
        ) : (
          <Button variant={"outline"} size={"icon"} onClick={handleLogin}>
            <LogInIcon />
          </Button>
        )}
        <Button variant={"outline"} size={"icon"}>
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
