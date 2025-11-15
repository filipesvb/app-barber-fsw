"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getAuthUrl } from "@/lib/get-auth-url";
import MenuButton from "./ui/menu-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Divider from "./Divider";

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

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="space-y-3">
              <SheetTitle>Menu</SheetTitle>
              <Divider />
            </SheetHeader>

            <div>
              {session?.user ? (
                <div className="flex text-right">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="flex items-center gap-3 rounded-full px-10 py-6"
                >
                  <span>Login</span>
                  <LogInIcon />
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
