import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatCentsToBRL } from "@/app/helper/money";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { toast } from "sonner";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({ id, productName, productVariantName, productVariantImageUrl, productVariantPriceInCents, quantity }: CartItemProps) => {
  const queryClient = useQueryClient()
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })
  const handleRemoveProductFromCartClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.")
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.")
      }
    })
  }
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
        <Button variant="outline" size="icon" onClick={handleRemoveProductFromCartClick} disabled={removeProductFromCartMutation.isPending}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents * quantity)}</p>
      </div>
    </div>
  )
}

export default CartItem
