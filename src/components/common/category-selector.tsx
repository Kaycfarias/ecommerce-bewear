import { categoryTable } from "@/db/schema";
import Link from "next/link";
import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#f4efff] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            asChild
            key={category.id}
            variant={"ghost"}
            className="rounded-full bg-white font-semibold"
          >
            <Link href={`/category/${category.slug}`}> {category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
