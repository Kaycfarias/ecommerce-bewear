import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartEmptyState = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>

      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Seu carrinho está vazio
        </h2>
        <p className="text-gray-600 mb-6">
          Adicione alguns produtos incríveis para começar suas compras
        </p>
        <Button asChild>
          <Link href="/">Continuar comprando</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default CartEmptyState;
