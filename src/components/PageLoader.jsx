const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[5px] z-50 overflow-hidden">
      <div className="h-full bg-orange-700 animate-loader"></div>

      <style>
        {`
          @keyframes loader {
            0% {
              transform: translateX(-100%);
              width: 30%;
            }
            50% {
              width: 60%;
            }
            100% {
              transform: translateX(100%);
              width: 30%;
            }
          }

          .animate-loader {
            animation: loader 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;
