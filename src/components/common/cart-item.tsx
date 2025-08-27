import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatCentsToBRL } from "@/app/helper/money";
import { toast } from "sonner";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { useDrecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({ id, productName, productVariantId, productVariantName, productVariantImageUrl, productVariantPriceInCents, quantity }: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDrecreaseCartProduct(id);
  const increaseCartProductQuantityMutation = useIncreaseCartProduct(productVariantId);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.")
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.")
      }
    })
  }

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada.")
      }
    })
  }

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada.")
      }
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image src={productVariantImageUrl} alt={productVariantName} width={78} height={78} className="rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{productName}</p>
        <p className="text-xs font-medium text-muted-foreground">{productVariantName}</p>
        <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
          <Button
            variant="ghost"
            className="h-4 w-4"
            onClick={handleDecreaseQuantityClick}
          >
            <MinusIcon />
          </Button>

          <p className="text-xs font-medium">{quantity}</p>

          <Button variant="ghost" className="h-4 w-4" onClick={handleIncreaseQuantityClick}>
            <PlusIcon />
          </Button>
        </div>
      </div >
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick} disabled={removeProductFromCartMutation.isPending}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents * quantity)}</p>
      </div>
    </div>
  )
}

export default CartItem
