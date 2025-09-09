import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import PartnerBrands from "@/components/common/partner-brands";
import ProductList from "@/components/common/pruduct-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  const newlyCreateProduct = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Leve sua vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <PartnerBrands />

        <ProductList products={products} title="Produtos em Destaque" />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Leve sua vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <ProductList products={newlyCreateProduct} title="Novos produtos" />
      </div>
    </>
  );
};

export default Home;
