import CategorySelector from "@/components/common/category-selector";
import PartnerBrands from "@/components/common/partner-brands";
import ProductList from "@/components/common/pruduct-list";
import { getCategories } from "@/data/categories/get-cartegory";
import {
  getNewlyCreatedProducts,
  getProductsWithVariants,
} from "@/data/products/get-product";

import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const [products, newlyCreateProduct, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewlyCreatedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <div className="space-y-6">
        <div className="px-5">
          <Link href="category/jaquetas-moletons">
            <Image
              src="/banner01.png"
              alt="Leve sua vida com estilo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </Link>
        </div>
        <PartnerBrands />

        <ProductList products={products} title="Produtos em Destaque" />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Link href="category/jaquetas-moletons">
            <Image
              src="/banner02.png"
              alt="Leve sua vida com estilo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </Link>
        </div>
        <ProductList products={newlyCreateProduct} title="Novos produtos" />
      </div>
    </>
  );
};

export default Home;
