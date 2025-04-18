"use client";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";

const AuthHeader = () => {
  const session = useSession();
  if (session.status === "loading") {
    return null;
  }
  let authContent: ReactNode;

  if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src={session?.data.user?.image || ""} alt="@shdcn" />
            <AvatarFallback>NM</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="shadow-sm mt-2 w-[180px] h-[100px] rounded-xl bg-white p-2 shadow-black">
          <h1 className="flex mb-2 justify-center">
            {session.data?.user?.name}
          </h1>
          <Separator className="bg-black" />
          <form action={signOut} className="flex justify-center items-end ">
            <Button type="submit" className="w-full mt-4">
              {/* {session.data?.user.email} */}
              <LogOut />
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <form action={signIn}>
          <Button variant={"outline"}>Sign in</Button>
        </form>
        <form action={signIn}>
          <Button>Sign Up</Button>
        </form>
      </>
    );
  }
  return authContent;
};

export default AuthHeader;
