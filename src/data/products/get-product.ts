import "server-only";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const getProducts = async () => {
  return await db.query.productTable.findMany({});
};

export const getProductsWithVariants = async () => {
  const productsWithVariants = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  return productsWithVariants;
};

export const getProductsWithCategory = async () => {
  const productsWithCategory = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });
  return productsWithCategory;
};

export const getNewlyCreatedProducts = async () => {
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });
  return newlyCreatedProducts;
};
