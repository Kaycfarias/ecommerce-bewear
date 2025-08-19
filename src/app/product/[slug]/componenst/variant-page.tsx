"use client";

import { formatCentsToBRL } from "@/app/helper/money";
import Image from "next/image";

import { useQueryState } from "nuqs";
import { productTable, productVariantTable } from "@/db/schema";
import VariantSelector from "./variant-selector";

interface variantPageProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const VariantPage = ({ product }: variantPageProps) => {
  const variants = product.variants;
  const [variantName, setVariantName] = useQueryState("variant");
  if (!variantName) {
    setVariantName(variants[0].name);
  }
  const selectedVariant =
    variants.find((v) => v.name === variantName) || variants[0];

  return (
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
        <VariantSelector variants={variants} />
      </div>
      <div className="px-5">
        {/* DESICRICAO */}
        <h2 className="text-lg font-semibold">{product.description}</h2>
        <h3 className="text-muted-foreground text-sm">{product.description}</h3>
        <h3 className="text-lg font-semibold">
          {formatCentsToBRL(selectedVariant.priceInCents)}
        </h3>
      </div>
    </div>
  );
};

export default VariantPage;
