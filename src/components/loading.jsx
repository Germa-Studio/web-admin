const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-700 bg-opacity-50 fixed inset-0 z-[99]">
      <div className="bg-white p-8 rounded-lg shadow-lg z-50 relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
