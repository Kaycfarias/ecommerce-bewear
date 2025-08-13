"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useQueryState(
    "count",
    parseAsInteger.withDefault(1),
  );

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const HandleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-[100px] items-center justify-between rounded-lg border">
        <Button 
          disabled={quantity === 1}
          variant="ghost"
          size="icon"
          onClick={HandleDecrement}
        >
          <MinusIcon />
        </Button>

        <span>{quantity}</span>

        <Button variant="ghost" size="icon" onClick={HandleIncrement}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
