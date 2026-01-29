import { motion } from 'framer-motion';

const thinkingVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const dotTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut',
};

export default function Thinking() {
  return (
    <motion.div
      className="flex h-5 w-12 items-end justify-center gap-1"
      variants={thinkingVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-primary/40"
        variants={dotVariants}
        transition={dotTransition}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-primary/40"
        variants={dotVariants}
        transition={dotTransition}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-primary/40"
        variants={dotVariants}
        transition={dotTransition}
      />
    </motion.div>
  );
}
