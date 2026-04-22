import { Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, updatePost } from "../features/posts/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext";

export const MyBlogCard = ({ item }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { notify } = useToast();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      notify("success", "Post Deleted Successfully");
      queryClient.invalidateQueries(["my-posts"]);
    },
  });

  const handleDeletePost = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    mutation.mutate(id);
  };

  return (
    <Link
      onClick={() => {
        scrollTo(0, 0);
      }}
      to={`/posts/${item.id}`}
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row overflow-hidden">
        {/* Image */}
        <img
          src={item?.image}
          alt="blog"
          className="w-full sm:w-52 h-48 sm:h-52 object-cover"
        />

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Top */}
          <div>
            {/* Category */}
            <span className="inline-block text-xs bg-orange-100 text-orange-700 px-4 py-1 rounded-full mb-2">
              {item?.category}
            </span>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {item?.title}
            </h2>

            {/* Description */}
            <p
              className="text-sm text-gray-600 line-clamp-3 mt-1"
              dangerouslySetInnerHTML={{ __html: item?.content }}
            />
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-3">
            {/* Date */}
            <span className="text-xs text-gray-400">
              {new Date(item?.createdAt.seconds * 1000).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Edit */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/edit/${item.id}`);
                  window.scrollTo(0, 0);
                }}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <Pencil size={16} className="text-gray-600" />
              </button>

              {/* Delete */}
              <button
                onClick={(e) => {
                  handleDeletePost(e, item.id);
                }}
                className="p-2 rounded-md hover:bg-red-50 transition"
              >
                <Trash2 size={16} className="text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
