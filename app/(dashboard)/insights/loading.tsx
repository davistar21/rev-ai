import { ChartSkeleton, AnomalySkeleton, TableSkeleton, SkeletonBase } from "@/components/glass-ui/skeletons";

export default function InsightsLoading() {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto mt-4">
      <div>
        <SkeletonBase className="h-8 w-64" />
        <SkeletonBase className="h-4 w-96 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 h-[400px] flex flex-col bg-[var(--glass-panel)]/30 rounded-xl border border-[var(--glass-border)]">
           <SkeletonBase className="h-6 w-40 mb-6" />
           <div className="flex-1 w-full relative mt-4">
             <ChartSkeleton />
           </div>
        </div>
        <div className="p-6 h-[400px] flex flex-col bg-[var(--glass-panel)]/30 rounded-xl border border-[var(--glass-border)]">
           <SkeletonBase className="h-6 w-40 mb-6" />
           <div className="flex-1 w-full relative">
             <AnomalySkeleton />
           </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
           <TableSkeleton />
        </div>
      </div>
    </div>
  );
}
