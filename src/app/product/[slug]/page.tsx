import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/pruduct-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { notFound } from "next/navigation";

import QuantitySelector from "./componenst/quantity-selector";
import VariantPage from "./componenst/variant-page";

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
        <VariantPage
          product={product}
        />
        <div className="px-5">
          <QuantitySelector />
        </div>
        <div className="flex flex-col space-y-4 px-5">
          {/* BOTOES */}
          <Button className="rounded-full" size={"lg"} variant={"outline"}>
            Adicionar ao carrinho
          </Button>
          <Button className="rounded-full" size={"lg"}>
            Comprar agora
          </Button>
        </div>
        <div className="px-5">
          <p className="text-shadow-amber-600">{product.description}</p>
        </div>
        <ProductList products={likelyProducts} title="Produtos relacionados" />
      </div>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
