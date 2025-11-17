"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getAuthUrl } from "@/lib/get-auth-url";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Divider from "./Divider";
import Link from "next/link";
import categorias from "../_constants/categorias";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-3">
            <SheetHeader className="space-y-3">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <Divider />

            <div className="space-y-3 px-0">
              {/* Image and name */}
              {session?.user ? (
                <div className="flex px-3">
                  <div className="space-y-2">
                    <Avatar>
                      <AvatarImage
                        {...(session.user.image
                          ? {
                              src: session.user.image,
                            }
                          : { src: "/avatar_placeholder.svg" })}
                        alt={session.user.name}
                      />
                    </Avatar>
                    <div>
                      <p className="text-foreground truncate text-sm">
                        {session.user.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3 px-3">
                  <span>Olá, faça seu login</span>
                  <Button
                    onClick={handleLogin}
                    size={"lg"}
                    className="flex cursor-pointer items-center gap-3 rounded-full px-0 py-4"
                  >
                    <span>Login</span>
                    <LogInIcon />
                  </Button>
                </div>
              )}

              {/* Menu Nav */}
              <div>
                <Button
                  asChild
                  variant={"ghost"}
                  size={"lg"}
                  className="w-full"
                >
                  <Link href={"/"} className="flex items-center justify-start">
                    <HomeIcon />
                    Início
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={"ghost"}
                  size={"lg"}
                  className="w-full"
                >
                  <Link
                    href={"/agendamentos"}
                    className="flex items-center justify-start"
                  >
                    <CalendarIcon />
                    Agendamentos
                  </Link>
                </Button>
              </div>
            </div>

            <Divider />

            <div className="px-0">
              {categorias.map((categoria) => (
                <Button
                  key={categoria.title}
                  asChild
                  variant={"ghost"}
                  size={"lg"}
                  className="flex w-full justify-start"
                >
                  <Link href={`/${categoria.title.toLowerCase()}`}>
                    {categoria.title}
                  </Link>
                </Button>
              ))}
            </div>

            {session?.user ? (
              <>
                <Divider />
                <div className="px-0">
                  <Button
                    onClick={handleLogout}
                    asChild
                    variant={"ghost"}
                    size={"lg"}
                    className="flex w-full cursor-pointer justify-start"
                  >
                    <div className="flex gap-2">
                      <LogOutIcon />
                      Sair da conta
                    </div>
                  </Button>
                </div>
              </>
            ) : null}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
