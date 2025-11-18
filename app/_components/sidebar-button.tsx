"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import {
  MenuIcon,
  LogInIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
} from "lucide-react";
import categorias from "../_constants/categorias";
import Divider from "./Divider";
import { Button } from "./ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
  SheetClose,
} from "./ui/sheet";
import { authClient } from "@/lib/auth-client";
import { getAuthUrl } from "@/lib/get-auth-url";
import Link from "next/link";

const SidebarButton = () => {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-x-hidden overflow-y-auto px-3 pb-3">
        <SheetHeader className="space-y-3">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Divider />

        <div className="w-full space-y-3 px-0">
          {/* Image and name */}
          {session?.user ? (
            <div className="flex px-3">
              <div className="flex items-center gap-2">
                <Avatar className="m-0">
                  <AvatarImage
                    {...(session.user.image
                      ? {
                          src: session.user.image,
                        }
                      : { src: "/avatar_placeholder.svg" })}
                    alt={session.user.name}
                  />
                </Avatar>
                <div className="flex-1 shrink">
                  <p className="text-foreground truncate overflow-hidden text-sm">
                    {session.user.name}
                  </p>
                  <p className="text-muted-foreground truncate overflow-hidden text-sm">
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
            <SheetClose asChild>
              <Button asChild variant={"ghost"} size={"lg"} className="w-full">
                <Link href={"/"} className="flex items-center justify-start">
                  <HomeIcon />
                  Início
                </Link>
              </Button>
            </SheetClose>
            <Button asChild variant={"ghost"} size={"lg"} className="w-full">
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
            <SheetClose key={categoria.title} asChild>
              <Button
                asChild
                variant={"ghost"}
                size={"lg"}
                className="flex w-full justify-start"
              >
                <Link
                  href={`/barbershops?service=${categoria.title.toLowerCase()}`}
                  className="px-3!"
                >
                  {categoria.title}
                </Link>
              </Button>
            </SheetClose>
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
  );
};

export default SidebarButton;
