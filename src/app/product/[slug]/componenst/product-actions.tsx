"use client"

import { productTable, productVariantTable } from "@/db/schema";
import AddToCartButton from "./add-to-cart-button";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import Image from "next/image";
import { formatCentsToBRL } from "@/app/helper/money";
import BuyProductNowButton from "./buy-product-now-button";

interface ProductActionsProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const [quantity, setQuantity] = useQueryState(
    "count",
    parseAsInteger.withDefault(1),
  );
  const [variantId, setVariantId] = useQueryState("variant");

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const HandleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const variants = product.variants;
  if (!variantId) {
    setVariantId(variants[0].id);
  }
  const selectedVariant =
    variants.find((v) => v.id === variantId) || variants[0];
  return (
    <>
      <div className="flex flex-col space-y-6">
        {selectedVariant && (
          <Image
            src={selectedVariant.imageUrl}
            alt={selectedVariant.name}
            sizes="100vw"
            width={0}
            height={0}
            className="h-auto w-full rounded-3xl object-cover shadow-sm"
          />
        )}
        <div className="px-5">
          <div className="flex items-center gap-4">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className={
                  variantId === variant.id
                    ? "border-primary rounded-xl border-2"
                    : ""
                }
                onClick={() => {
                  setVariantId(variant.id);
                }}
              >
                <Image
                  width={68}
                  height={68}
                  src={variant.imageUrl}
                  alt={variant.name}
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
          {/*<h3 className="text-muted-foreground text-sm">{selectedVariant.name}</h3>*/}
        </div>
        <div className="px-5">
          {/* DESICRICAO */}
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <h3 className="text-muted-foreground text-sm">{product.description}</h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(selectedVariant.priceInCents)}
          </h3>
        </div>
      </div>
      <div className="px-5">
      </div>
      <div className="flex flex-col space-y-4 px-5">
        {/* BOTOES */}
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button
              disabled={quantity === 1}
              variant="ghost"
              size="icon"
              onClick={HandleDecrement}
            >
              <MinusIcon />
            </Button>

            <span>{quantity}</span>

            <Button variant="ghost" size="icon" onClick={HandleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
        <AddToCartButton quantity={quantity} productVariantId={selectedVariant.id} />
        <BuyProductNowButton />
      </div>
      <div className="px-5">
        <p className="text-shadow-amber-600">{product.description}</p>
      </div>
    </>
  )
}

export default ProductActions;
