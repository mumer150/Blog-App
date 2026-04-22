export const SinglePostSkeleton = () => {
  return (
    <div className="bg-white min-h-screen py-6 sm:py-10 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          {/* Date */}
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-4"></div>

          {/* Title */}
          <div className="h-8 sm:h-10 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
          <div className="h-8 sm:h-10 bg-gray-200 rounded w-2/3 mx-auto"></div>

          {/* Author */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

            <div className="text-left space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-10">
          <div className="w-full h-[220px] sm:h-[350px] md:h-[450px] bg-gray-200 rounded-2xl"></div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          <div className="h-4 bg-gray-200 rounded w-9/12"></div>

          <div className="h-4 bg-gray-200 rounded w-full mt-6"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          <div className="h-4 bg-gray-200 rounded w-8/12"></div>
        </div>
      </div>
    </div>
  );
};
