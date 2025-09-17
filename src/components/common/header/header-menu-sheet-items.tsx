import { SheetClose } from "@/components/ui/sheet";
import { HomeIcon, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";

const HeaderMenuSheetItems = () => {
  return (
    <>
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
    </>
  );
};

export default HeaderMenuSheetItems;
