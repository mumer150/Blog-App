import { useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { createPost } from "../features/posts/postService";
import { useToast } from "../context/ToastContext";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BlogFormSkeleton } from "../components/BlogFormSkeleton";

export const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      image: "",
    },
  });
  const { notify } = useToast();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: ({ data, user }) => createPost(data, user),

    onMutate: () => {
      const id = notify("loading", "Publishing...");
      return { id };
    },

    onSuccess: (_, __, context) => {
      notify("success", "Published!", { id: context.id });
      reset();
      setContent("");
      navigate("/my-blogs");
      window.scrollTo(0, 0);
    },

    onError: (_, __, context) => {
      notify("error", "Failed to publish", { id: context.id });
    },
  });

  const onSubmit = (data) => {
    const plainText = content
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (plainText.length < 10) {
      notify("error", "Content must be at least 10 characters");
      return;
    }

    mutation.mutate({
      data: {
        title: data.title,
        image: data.image,
        category: data.category,
        content: content,
      },
      user,
    });
  };

  if (mutation.isPending) {
    return <BlogFormSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-3">
          Write a <span className="text-orange-700">Blog</span>
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              {...register("title", { required: "This field is reuired" })}
              placeholder="Enter blog title..."
              className="w-full mt-1 bg-white border border-gray-300 rounded-md p-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200"
            />
            {errors.title && (
              <p className="text-orange-700 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* CATAGORY */}

          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full mt-1 border p-3 rounded-md"
            >
              <option value="">Select category</option>
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

            {errors.category && (
              <p className="text-orange-700 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* IMAGE */}

          <div>
            <label className="text-sm text-gray-600">Image URL</label>

            <input
              {...register("image", {
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid URL",
                },
              })}
              placeholder="Paste image URL..."
              className="w-full mt-1 bg-white border border-gray-300 rounded-md p-3 focus:outline-none focus:border-orange-700 focus:ring-1 focus:ring-red-200"
            />

            {errors.image && (
              <p className="text-orange-700 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* EDITOR */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_KEY}
              value={content}
              onEditorChange={(val) => setContent(val)}
              init={{
                height: 400,
                menubar: false,

                plugins: [
                  "paste",
                  "link",
                  "lists",
                  "image",
                  "code",
                  "table",
                  "wordcount",
                ],

                toolbar:
                  "undo redo | blocks | bold italic underline | " +
                  "alignleft aligncenter alignright | " +
                  "bullist numlist | link image | code",

                block_formats:
                  "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6",
                content_style:
                  "body { font-family: Arial, sans-serif; font-size:14px; color:#111; background:#fff }",
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={mutation.isPending}
            type="submit"
            className="w-full bg-orange-700 hover:bg-orange-800 transition text-white font-semibold py-3 rounded-md disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
};
