import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { getUserPosts } from "../features/posts/postService";
import { MyBlogCard } from "../components/MyBlogCard";
import { MyBlogCardSkeleton } from "../components/MyBlogCardSkeleton";

export const MyBlogs = () => {
  const {user} = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["my-posts", user?.uid],
    queryFn: () => getUserPosts(user.uid),
    enabled: !!user?.uid, // important
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-5">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <MyBlogCardSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No posts available
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Start by creating your first blog 🚀
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              My Blogs
            </h1>

            {/* List */}
            <div className="flex flex-col gap-5">
              {data?.map((item) => (
                <MyBlogCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
