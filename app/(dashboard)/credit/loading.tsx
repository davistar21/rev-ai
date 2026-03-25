import { SkeletonBase } from "@/components/glass-ui/skeletons";

export default function CreditLoading() {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 max-w-4xl mx-auto mt-4 w-full">
      <div>
        <SkeletonBase className="h-8 w-64" />
        <SkeletonBase className="h-4 w-96 mt-2" />
      </div>

      <SkeletonBase className="h-[400px] w-full" />
    </div>
  );
}
