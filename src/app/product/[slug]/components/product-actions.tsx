"use client";

import { formatCentsToBRL } from "@/app/helper/money";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { productTable, productVariantTable } from "@/db/schema";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { Suspense } from "react";
import AddToCartButton from "./add-to-cart-button";
import BuyProductNowButton from "./buy-product-now-button";

interface ProductActionsProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductActionsSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Main Product Image */}
      <Skeleton className="w-full aspect-square rounded-3xl" />

      <div className="px-5">
        {/* Variant Images */}
        <div className="flex items-center gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-16 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="px-5">
        {/* Product Info */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/4" />
      </div>

      <div className="px-5"></div>

      <div className="flex flex-col space-y-4 px-5">
        {/* Quantity Section */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-[100px] rounded-lg" />
        </div>

        {/* Action Buttons */}
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      <div className="px-5">
        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

const ProductActionsContent = ({ product }: ProductActionsProps) => {
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
            loading="lazy"
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
                  width={64}
                  height={64}
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
          <h3 className="text-muted-foreground text-sm">
            {product.description}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(selectedVariant.priceInCents)}
          </h3>
        </div>
      </div>
      <div className="px-5"></div>
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
        <AddToCartButton
          quantity={quantity}
          productVariantId={selectedVariant.id}
        />
        <BuyProductNowButton />
      </div>
      <div className="px-5">
        <p className="text-shadow-amber-600">{product.description}</p>
      </div>
    </>
  );
};

const ProductActions = ({ product }: ProductActionsProps) => {
  return (
    <Suspense fallback={<ProductActionsSkeleton />}>
      <ProductActionsContent product={product} />
    </Suspense>
  );
};

export default ProductActions;
