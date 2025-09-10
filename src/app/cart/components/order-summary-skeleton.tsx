import { Skeleton } from "@/components/ui/skeleton";

const OrderSummarySkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
    <Skeleton className="h-6 w-1/2 mb-4" />
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-px w-full my-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <Skeleton className="h-12 w-full mt-6 rounded-lg" />
      <Skeleton className="h-10 w-full mt-2 rounded-lg" />
    </div>
  </div>
);

export default OrderSummarySkeleton;
