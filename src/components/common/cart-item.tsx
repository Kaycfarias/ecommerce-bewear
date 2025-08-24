import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash, TrashIcon } from "lucide-react";
import { formatCentsToBRL } from "@/app/helper/money";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({ id, productName, productVariantName, productVariantImageUrl, productVariantPriceInCents, quantity }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image src={productVariantImageUrl} alt={productVariantName} width={78} height={78} className="rounded-lg" />
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-sm font-semibold">{productName}</p>
        <p className="text-xs font-medium text-muted-foreground">{productVariantName}</p>
        <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
          <Button
            disabled={quantity === 1}
            variant="ghost"
            className="h-4 w-4"
            onClick={() => { }}
          >
            <MinusIcon />
          </Button>

          <p className="text-xs font-medium">{quantity}</p>

          <Button variant="ghost" className="h-4 w-4" onClick={() => { }}>
            <PlusIcon />
          </Button>
        </div>
      </div >
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}</p>
      </div>
    </div>
  )
}

export default CartItem
