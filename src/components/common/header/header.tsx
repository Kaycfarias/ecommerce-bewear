"use client";

import { useCart } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeaderMenuSheet from "./header-menu-sheet";

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
          <HeaderMenuSheet session={session} />
        </div>
      </div>
    </header>
  );
};

export default Header;
