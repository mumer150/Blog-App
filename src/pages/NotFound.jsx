import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[86vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* BIG NUMBER */}
        <h1 className="text-7xl font-bold text-gray-900 tracking-tight">
          404
        </h1>

        {/* MESSAGE */}
        <h2 className="mt-4 text-xl font-medium text-gray-800">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center justify-center px-5 py-3 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition"
        >
          Go back home
        </button>

        {/* SUBTLE DECORATION */}
        <div className="mt-10 text-[10px] text-gray-300 tracking-widest">
          ERROR • NOT FOUND • ERROR
        </div>
      </div>
    </div>
  );
};

export default NotFound;
