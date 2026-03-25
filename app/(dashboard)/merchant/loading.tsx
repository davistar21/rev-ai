import { StatCardSkeleton, SkeletonBase, TableSkeleton, ChartSkeleton } from "@/components/glass-ui/skeletons";

export default function MerchantLoading() {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto mt-4">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <SkeletonBase className="h-8 w-48" />
          <SkeletonBase className="h-4 w-64 mt-2" />
        </div>
        <SkeletonBase className="h-10 w-48" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Insights + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 p-6 flex flex-col min-h-[400px] bg-[var(--glass-panel)]/30 border border-[var(--glass-border)] rounded-xl">
           <SkeletonBase className="h-6 w-48 mb-4" />
           <SkeletonBase className="flex-1 w-full" />
        </div>
        <div className="flex flex-col gap-6">
           <SkeletonBase className="h-[188px] w-full" />
           <SkeletonBase className="h-[188px] w-full" />
        </div>
      </div>
    </div>
  );
}
