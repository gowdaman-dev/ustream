"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropDown() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none capitalize">
        <Button variant={"link"} className=" flex space-x-2">
          <Avatar>
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{session?.user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2 h-4" />
            Signout
          </DropdownMenuItem>
        ) : (
          <Button onClick={() => signIn("google")}>
            <LogInIcon className="mr-2 h-4" />
            SignIn
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="py-4 px-10 dark:bg-gray-900 bg-gray-100 flex items-center justify-between">
      <div className="logo">
        <Link href={"/"}>
          <h1 className="font-black tracking-widest">UMeet</h1>
        </Link>
      </div>
      <div className=" flex items-center justify-center gap-4">
        <AccountDropDown />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
