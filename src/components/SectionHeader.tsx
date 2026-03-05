import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

const SectionHeader = ({ badge, title, description }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    {badge && <span className="info-badge mb-4 inline-block">{badge}</span>}
    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-balance">{description}</p>
    )}
  </motion.div>
);

export default SectionHeader;
