"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { productTable, productVariantTable } from "@/db/schema";
import { Suspense } from "react";
import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductListSkeleton = ({ title }: { title?: string }) => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-40 mx-5" />

      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4 flex-shrink-0">
            <Skeleton className="w-[200px] aspect-square rounded-3xl" />
            <div className="flex max-w-[200px] flex-col gap-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductListContent = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <Suspense fallback={<ProductListSkeleton title={title} />}>
      <ProductListContent title={title} products={products} />
    </Suspense>
  );
};

export default ProductList;
