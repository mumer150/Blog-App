import React from "react";

export const BlogFormSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center animate-pulse">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-6" />

        {/* FORM */}
        <div className="space-y-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          {/* TITLE */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded-md" />
          </div>

          {/* CATEGORY */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded-md" />
          </div>

          {/* IMAGE */}
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded-md" />
          </div>

          {/* EDITOR */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-[400px] w-full bg-gray-200" />
          </div>

          {/* BUTTON */}
          <div className="h-12 w-full bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};
