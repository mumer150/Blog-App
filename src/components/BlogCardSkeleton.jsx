export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>

      <div className="p-4 flex flex-col gap-3">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>

        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between mt-3">
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
