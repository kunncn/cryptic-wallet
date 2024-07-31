import { motion } from "framer-motion";
const PageTransitionComponent = ({ children, delay = 0, customTransition }) => {
  const transition = customTransition || {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.3, delay },
  };

  return (
    <motion.div {...transition}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageTransitionComponent;
