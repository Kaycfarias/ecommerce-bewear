"use client";

import { useCart } from "@/hooks/queries/use-cart";
import {
  CartEmptyState,
  CartItemsList,
  CartLoadingState,
  OrderSummary,
} from "./components";

const CartPage = () => {
  const { data: cart, isLoading, isFetching } = useCart();

  if (isLoading || (isFetching && !cart)) {
    return <CartLoadingState />;
  }

  if (!cart?.items || cart.items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <CartItemsList items={cart.items} />
          <OrderSummary
            items={cart.items}
            totalPriceInCents={cart.totalPriceInCents}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
