import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "../components/BlogCard";
import { getPosts } from "../features/posts/postService";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotebookPen } from "lucide-react";

export const Home = () => {
  const categories = [
    "All",
    "Tech",
    "Health",
    "Design",
    "Business",
    "Lifestyle",
    "Other",
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const navigate = useNavigate();

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat });
  };

  const filterData =
    selectedCategory === "All"
      ? data
      : data?.filter((blog) => selectedCategory === blog.category);

  if (error) {
    return <p className="text-center p-10">{error.message}</p>;
  }

  return (
    <div className="bg-white min-h-screen py-6 sm:py-12">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Explore Blogs
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Discover ideas, stories, and insights from our latest posts
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 mb-8 sm:mb-10 justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {data?.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700">
              No posts available
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Start by creating your first blog 🚀
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* LOADING STATE */}
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <BlogCardSkeleton key={i} />)
              : filterData?.map((item) => (
                  <BlogCard key={item.id} item={item} />
                ))}
            {/* EMPTY STATE (OUTSIDE GRID) */}
            {!isLoading && filterData?.length === 0 && (
              <>
                {!isLoading && filterData?.length === 0 && (
                  <div className="col-span-full flex items-center justify-center py-20 px-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <NotebookPen color="#CA3500" />
                      </div>

                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        No posts found
                      </h2>

                      <p className="text-gray-500 mt-2 max-w-md">
                        There are no blog posts in this category yet. Try
                        selecting another category.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
