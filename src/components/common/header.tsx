"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  Menu,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  const { data: session } = authClient.useSession();
  const { data: cart } = useCart();

  const hasCartItems = cart && cart.items && cart.items.length > 0;

  return (
    <header className="flex items-center justify-center p-5 mb-3 border-b">
      <div className="flex items-center w-full justify-between">
        <Link href="/">
          <Image src="/next.svg" alt="Logo" width={120} height={26.14} />
        </Link>
        <div className="flex items-center space-x-3">
          <Link href="/cart">
            <ShoppingBag size={24} strokeWidth={1.2} />
            {hasCartItems && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </Link>
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
                    <SheetClose asChild>
                      <Link className="flex items-center" href="/">
                        <HomeIcon size={16} className="mr-2" />
                        <p className="text-sm">Início</p>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link className="flex items-center" href="/orders">
                        <Truck size={16} className="mr-2" />
                        <p className="text-sm">Meus pedidos</p>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link className="flex items-center" href="/cart">
                        <ShoppingBag size={16} className="mr-2" />
                        <p className="text-sm">Carrinho</p>
                      </Link>
                    </SheetClose>
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
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá, faça seu login</h2>
                    <SheetClose asChild>
                      <Button asChild size="icon" variant="outline">
                        <Link href="/login">
                          <LogInIcon />
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
              <SheetClose />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
