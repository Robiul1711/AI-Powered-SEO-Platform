import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-20">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#AC6CFF] animate-spin" />
        <div className="absolute inset-0 bg-[#AC6CFF] opacity-30 blur-lg rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default PageLoader;
