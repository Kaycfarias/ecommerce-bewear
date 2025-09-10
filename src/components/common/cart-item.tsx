import { formatCentsToBRL } from "@/app/helper/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
  const increaseCartProductQuantityMutation =
    useIncreaseCartProduct(productVariantId);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada.");
      },
    });
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada.");
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4">
      <div className="flex-shrink-0">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <h3 className="font-medium text-gray-900 break-words">
            {productName}
          </h3>
          <p className="text-sm text-gray-600">{productVariantName}</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCentsToBRL(productVariantPriceInCents)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-none"
              onClick={handleDecreaseQuantityClick}
              disabled={decreaseCartProductQuantityMutation.isPending}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>

            <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center border-x border-gray-300">
              {quantity}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-none"
              onClick={handleIncreaseQuantityClick}
              disabled={increaseCartProductQuantityMutation.isPending}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            disabled={removeProductFromCartMutation.isPending}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
          >
            <TrashIcon className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Remover</span>
          </Button>
        </div>
      </div>

      <div className="flex-shrink-0 text-right sm:text-right">
        <p className="text-lg font-semibold text-gray-900">
          {formatCentsToBRL(productVariantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
