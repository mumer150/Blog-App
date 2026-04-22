export const MyBlogCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full sm:w-52 h-48 sm:h-52 bg-gray-200" />

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Top */}
        <div>
          {/* Category */}
          <div className="w-20 h-5 bg-gray-200 rounded-full mb-2" />

          {/* Title */}
          <div className="w-3/4 h-5 bg-gray-200 rounded mb-2" />

          {/* Description */}
          <div className="space-y-2 mt-2">
            <div className="w-full h-3 bg-gray-200 rounded" />
            <div className="w-5/6 h-3 bg-gray-200 rounded" />
            <div className="w-4/6 h-3 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-3">
          {/* Date */}
          <div className="w-20 h-3 bg-gray-200 rounded" />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-md" />
            <div className="w-8 h-8 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
