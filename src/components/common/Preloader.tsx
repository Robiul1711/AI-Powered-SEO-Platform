import { useEffect, useState } from "react";
import { motion } from "motion/react";
import logo from "@/assets/images/footerLogo.png";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 2200); // slightly longer than the logic to ensure 100% is reached visually

    return () => {
      clearInterval(timer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <img
          src={logo}
          alt="Logo"
          className="w-48 md:w-64 h-auto object-contain"
        />
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
        {/* Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#7000FF] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.03 }} // Instant updates controlled by state
        />

        {/* Glow Effect on the leading edge */}
        <motion.div
          className="absolute top-0 bottom-0 w-10 bg-white/50 blur-md"
          style={{ left: `${progress}%`, translateX: "-50%" }}
        />
      </div>

      {/* Percentage Text */}
      <motion.p
        className="mt-4 font-inter text-gray-400 text-sm font-medium tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        LOADING {progress}%
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
