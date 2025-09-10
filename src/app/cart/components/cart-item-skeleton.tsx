import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton = () => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4">
    <div className="flex-shrink-0">
      <Skeleton className="w-20 h-20 rounded-lg" />
    </div>
    <div className="flex-1 min-w-0 space-y-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <div className="flex items-center gap-3 mt-3">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded" />
      </div>
    </div>
    <div className="flex-shrink-0">
      <Skeleton className="h-6 w-16" />
    </div>
  </div>
);

export default CartItemSkeleton;
