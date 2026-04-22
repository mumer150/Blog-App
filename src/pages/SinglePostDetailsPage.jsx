import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../features/posts/postService";
import { SinglePostSkeleton } from "../components/SinglePostSkeleton";
import useAuth from "../hooks/useAuth";
import { PencilIcon, Trash } from "lucide-react";
import parse from "html-react-parser";
import { domToReact } from "html-react-parser";

export const SinglePostDetailsPage = () => {
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      notify("success", "Post Deleted Successfully");
    },
  });

      
  if (isLoading) {
    return <SinglePostSkeleton />;
  }

  if (error) {
    return <p className="text-center p-10 text-red-600">{error.message}</p>;
  }

  const handleDelPost = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10">
      <div className=" max-w-5xl flex justify-end items-center b-400  px-4 sm:px-6 lg:px-8 mx-auto md:justify-end  ">
        {user?.uid === data?.userId && (
          <div className="flex flex-row gap-2.5 items-end  justify-end">
            <button
              onClick={() => {
                navigate(`/edit/${id}`);
              }}
              className="flex items-center gap-2 text-xs md:text-sm  bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition"
            >
              <PencilIcon size={12} /> Edit
            </button>
            <button
              onClick={() => {
                handleDelPost(id);
                navigate("/my-blogs");
              }}
              className="flex items-center gap-2 text-red-600 text-xs md:text-sm bg-red-100 hover:bg-red-200 px-3 py-2 rounded-md transition"
            >
              <Trash color="red" size={12} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="flex justify-center items-baseline  gap-3 my-3">
            <span className="bg-orange-100 text-orange-700 text-xs px-4 py-1 rounded-full font-medium">
              {data?.category}
            </span>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </p>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {data?.title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <img
              src="/placeholder.png"
              alt="author"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">
                {data?.userName}
              </p>
              <p className="text-xs text-gray-500">Writer</p>
            </div>
          </div>
        </div>

        {/* Featured Image (YOUR IMAGE) */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-10">
          <img
            src={data?.image}
            alt="blog"
            className="w-full h-[220px] sm:h-[350px] md:h-[460px] object-cover rounded-2xl"
          />
        </div>

        {/* Content */}

        <div className="prose max-w-3xl mx-auto" />

        <div className="max-w-4xl mx-auto px-4 text-gray-800 leading-7">
          {parse(data?.content || "", {
            replace: (node) => {
              if (node.name === "h1") {
                return (
                  <h1 className="text-4xl font-bold mb-4">
                    {domToReact(node.children)}
                  </h1>
                );
              }

              if (node.name === "h2") {
                return (
                  <h2 className="text-3xl font-semibold mb-3">
                    {domToReact(node.children)}
                  </h2>
                );
              }

              if (node.name === "h3") {
                return (
                  <h3 className="text-2xl font-semibold mb-2">
                    {domToReact(node.children)}
                  </h3>
                );
              }

              if (node.name === "p") {
                return (
                  <p className="text-gray-700 leading-7 mb-4">
                    {domToReact(node.children)}
                  </p>
                );
              }

              if (node.name === "strong") {
                return (
                  <strong className="font-bold">
                    {domToReact(node.children)}
                  </strong>
                );
              }

              if (node.name === "u") {
                return (
                  <span className="underline">{domToReact(node.children)}</span>
                );
              }
            },
          })}
        </div>
      </div>
    </div>
  );
};
