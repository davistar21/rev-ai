import { SkeletonBase } from "@/components/glass-ui/skeletons";

export default function ProfileLoading() {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-4xl mx-auto mt-4 w-full">
      <div>
        <SkeletonBase className="h-8 w-48" />
        <SkeletonBase className="h-4 w-64 mt-2" />
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-8 items-start bg-[var(--glass-panel)]/30 rounded-xl border border-[var(--glass-border)]">
        <SkeletonBase className="w-24 h-24 rounded-full shrink-0" />
        <div className="flex-1 space-y-4 w-full pt-2">
          <SkeletonBase className="h-8 w-48" />
          <SkeletonBase className="h-4 w-64" />
          <SkeletonBase className="h-4 w-64" />
        </div>
      </div>

      <div className="p-8 bg-[var(--glass-panel)]/30 rounded-xl border border-[var(--glass-border)] mt-4">
        <SkeletonBase className="h-6 w-48 mb-6" />
        <SkeletonBase className="h-24 w-full" />
      </div>
    </div>
  );
}
