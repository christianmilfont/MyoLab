import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedArrowProps {
  className?: string;
  size?: number;
  color?: string;
}

const AnimatedArrow = ({
  className = "",
  size = 16,
  color = "currentColor",
}: AnimatedArrowProps) => {
  return (
    <motion.span
      className={`inline-flex items-center ${className}`}
      initial={{ x: -2, opacity: 0.7 }} // posição inicial: levemente à esquerda e translúcida
      whileHover={{ x: 4, opacity: 1 }} // animação ao hover: desliza 4px para a direita e fica opaca
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // animação natural tipo mola
    >
      <ArrowRight size={size} color={color} />
    </motion.span>
  );
};

export default AnimatedArrow;