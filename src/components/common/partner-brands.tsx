import Image from "next/image";

const brands = [
  { src: "/nike-logo.svg", alt: "Nike" },
  { src: "/adidas-logo.svg", alt: "Adidas" },
  { src: "/puma-logo.svg", alt: "Puma" },
  { src: "/newbalance-logo.svg", alt: "New Balance" },
  { src: "/converse-logo.svg", alt: "Converse" },
  { src: "/zara-logo.svg", alt: "Zara" },
];

const PartnerBrands = () => {
  return (
    <div>
      <h3 className="px-5 font-semibold">Marcas Parceiras</h3>
      <div className="scrollbar-hidden flex w-full gap-6 overflow-x-auto px-5 py-4">
        {brands.map((brand) => (
          <div
            key={brand.alt}
            className="flex min-w-16 flex-col items-center gap-2"
          >
            <Image
              className="min-h-[80px] min-w-[80px] rounded-3xl border px-6 py-2 shadow-sm"
              src={brand.src}
              width={100}
              height={100}
              alt={brand.alt}
              sizes="(max-width: 640px) 100px, (max-width: 768px) 100px, 100px"
            />
            <p className="text-center text-sm font-semibold">{brand.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
