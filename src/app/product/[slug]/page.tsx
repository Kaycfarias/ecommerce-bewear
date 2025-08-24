import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/pruduct-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { notFound } from "next/navigation";

import ProductActions from "./componenst/product-actions";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, slug),
    with: { variants: true },
  });
  if (!product) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, product.categoryId),
    with: { variants: true },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <ProductActions product={product} />
        <ProductList products={likelyProducts} title="Produtos relacionados" />
      </div>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
