"use client";

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ShoppingBasketIcon } from "lucide-react"
import CartItem from "./cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { formatCentsToBRL } from "@/app/helper/money";
import { useCart } from "@/hooks/queries/use-cart";
import Link from "next/link";


const Cart = () => {
  const { data: cart } = useCart()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Carrinho
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col px-2 pb-8">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8">

                {cart?.items?.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantId={item.productVariant.id}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={item.productVariant.priceInCents}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          {cart?.items && cart?.items.length > 0 && (
            <div className="flex h-max flex-col gap-4">
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Frete</p>
                <p>GRÁTIS</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Button className="mt-5 rounded-full" variant={"default"}>
                <Link href="/cart/identification" className="w-full">
                  Finalizar compra
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
