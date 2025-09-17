import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { LogInIcon, LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";
import HeaderMenuSheetItems from "./header-menu-sheet-items";

interface HeaderMenuSheetProps {
  session?: {
    user: {
      id: string;
      name: string;
      emailVerified: boolean;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined | undefined;
    };
    session: {
      id: string;
      token: string;
      userId: string;
      expiresAt: Date;
      createdAt: Date;
      updatedAt: Date;
      ipAddress?: string | null | undefined | undefined;
      userAgent?: string | null | undefined | undefined;
    };
  } | null;
}

const HeaderMenuSheet = ({ session }: HeaderMenuSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu strokeWidth={1.2} size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          {session?.user ? (
            <div className="space-y-3">
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
              </div>
              <div className="p-3">
                <Separator />
              </div>
              <HeaderMenuSheetItems />
              <div className="p-3">
                <Separator />
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => authClient.signOut()}
              >
                <LogOutIcon color="#6a7282" size={16} className="mr-2" />
                <p className="text-sm text-gray-500">Sair da conta</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá, faça seu login</h2>
                <SheetClose asChild>
                  <Button asChild variant="default">
                    <Link href="/login">
                      Login
                      <LogInIcon />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
              <div className="p-3">
                <Separator />
              </div>

              <HeaderMenuSheetItems />
            </div>
          )}
        </div>
        <SheetClose />
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMenuSheet;
