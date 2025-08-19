"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between border-b p-5">
      <Link href="/">
        <Image src="/next.svg" alt="Logo" width={120} height={26.14} />
      </Link>
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session.user.image as string | undefined}
                          alt="User Avatar"
                        />
                        <AvatarFallback className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white">
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-semibold">
                          {session?.user?.name}
                        </h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant={"outline"}
                      size="icon"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá, faça seu login</h2>
                  <Button size="icon" variant="outline" asChild>
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <SheetClose />
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
