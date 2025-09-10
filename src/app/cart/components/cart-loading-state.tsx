import { Skeleton } from "@/components/ui/skeleton";
import CartItemSkeleton from "./cart-item-skeleton";
import OrderSummarySkeleton from "./order-summary-skeleton";

const CartLoadingState = () => (
  <div className="container mx-auto px-4 py-8 max-w-7xl">
    <div className="w-full">
      <Skeleton className="h-8 w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 min-w-0">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>

              <div className="divide-y divide-gray-100">
                {Array.from({ length: 3 }, (_, i) => (
                  <CartItemSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <OrderSummarySkeleton />
        </div>
      </div>
    </div>
  </div>
);

export default CartLoadingState;
