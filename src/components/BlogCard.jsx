import { Link } from "react-router-dom";

export const BlogCard = ({ item }) => {
  return (
    <Link
      onClick={() => {
        scrollTo(0, 0);
      }}
      to={`/posts/${item.id}`}
    >
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative">
          <img
            src={item?.image}
            alt="blog"
            className="w-full h-48 object-cover"
          />

          {/* Category Tag */}
          <span className="absolute top-3 left-3 bg-orange-700 text-white text-xs px-4 py-1 rounded-full shadow-sm">
            {item?.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {item?.title}
          </h2>

          {/* Description */}
          <p
            className="text-sm text-gray-600 line-clamp-4 "
            dangerouslySetInnerHTML={{ __html: item?.content }}
          ></p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>
              {new Date(item?.createdAt?.seconds * 1000).toLocaleDateString()}
            </span>
            <span className="hover:text-black cursor-pointer transition">
              Read more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
