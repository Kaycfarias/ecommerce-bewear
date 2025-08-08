import Header from "@/components/common/header";
import ProductList from "@/components/common/pruduct-list";
import { db } from "@/db";
import Image from "next/image";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });
  return (
    <>
      <Header />
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

        <ProductList products={products} title="Produtos em Destaque" />

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
      </div>
    </>
  );
};

export default Home;
