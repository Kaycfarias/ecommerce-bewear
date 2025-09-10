import { formatCentsToBRL } from "@/app/helper/money";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface OrderSummaryProps {
  items: Array<{
    id: string;
    quantity: number;
  }>;
  totalPriceInCents: number;
}

const OrderSummary = ({ items, totalPriceInCents }: OrderSummaryProps) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Resumo do pedido
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {items.length} {items.length === 1 ? "produto" : "produtos"}
            </span>
            <span className="text-xs text-gray-500">
              {totalQuantity} unidades
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              {formatCentsToBRL(totalPriceInCents)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Frete</span>
            <span className="font-medium text-green-600">GRÁTIS</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-lg">
              {formatCentsToBRL(totalPriceInCents)}
            </span>
          </div>
        </div>

        <Button className="w-full mt-6" size="lg" asChild>
          <Link href="/cart/identification">Finalizar compra</Link>
        </Button>

        <Button variant="outline" className="w-full mt-2" asChild>
          <Link href="/">Continuar comprando</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
