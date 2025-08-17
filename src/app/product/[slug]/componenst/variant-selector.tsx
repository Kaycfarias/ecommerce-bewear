import { productVariantTable } from "@/db/schema";
import Image from "next/image";

import { useQueryState } from "nuqs";

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({ variants }: VariantSelectorProps) => {
  const [variantName, setVariantName] = useQueryState("variant");
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <div
          key={variant.id}
          className={
            variantName === variant.name
              ? "border-primary rounded-xl border-2"
              : ""
          }
          onClick={() => {
            setVariantName(variant.name);
          }}
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-xl"
          />
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
