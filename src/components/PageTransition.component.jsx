import React from "react";
import { motion } from "framer-motion";

const PageTransitionComponent = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionComponent;
