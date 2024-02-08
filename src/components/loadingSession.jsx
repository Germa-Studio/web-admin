const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100 bg-opacity-90 z-[99]">
      <div className="p-8 z-50 relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <h1 className="-ms-9">LOADING</h1>
      </div>
    </div>
  );
};

export default LoadingAnimation;
