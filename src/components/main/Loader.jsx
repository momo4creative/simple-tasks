import {} from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-28 -28 56 56"
        className="h-6 w-6 animate-spin transition duration-100 ease-in-out"
        fill="none"
        stroke="currentColor"
      >
        <motion.circle
          rx="50"
          ry="50"
          r="25"
          strokeWidth={6}
          strokeDasharray={155}
          strokeDashoffset={155}
          animate={{ strokeDashoffset: [310, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.svg>
    </>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> */
}
