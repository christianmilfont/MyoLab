import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableCardProps {
  title: string;
  summary: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const ExpandableCard = ({ title, summary, children, icon }: ExpandableCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pillar-card cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-start gap-4">
        {icon && <div className="text-primary mt-1 shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display font-semibold text-foreground">{title}</h3>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
            </motion.div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{summary}</p>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border text-sm text-secondary-foreground leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableCard;
