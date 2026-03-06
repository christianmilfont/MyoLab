import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface AnimatedLockedOverlayProps {
  message?: string;
}

const AnimatedLockedOverlay = ({ message = "Conteúdo bloqueado (EM BREVE FASE 2)" }: AnimatedLockedOverlayProps) => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mb-4 text-gray-400"
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
      >
        <Lock className="w-28 h-28" />
      </motion.div>
      <motion.p
        className="text-gray-700 font-semibold text-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedLockedOverlay;