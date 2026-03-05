import { motion } from "framer-motion";

const SarcomereVisual = ({ contracted = false }: { contracted?: boolean }) => {
  const width = contracted ? 160 : 240;
  
  return (
    <div className="diagram-container flex flex-col items-center gap-4">
      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Sarcômero — {contracted ? "Contraído" : "Relaxado"}
      </h4>
      <svg viewBox="0 0 300 120" className="w-full max-w-sm">
        {/* Z-lines */}
        <motion.line
          x1={150 - width / 2} y1="10" x2={150 - width / 2} y2="110"
          stroke="hsl(210 100% 55%)" strokeWidth="3"
          animate={{ x1: 150 - width / 2, x2: 150 - width / 2 }}
          transition={{ duration: 0.8 }}
        />
        <motion.line
          x1={150 + width / 2} y1="10" x2={150 + width / 2} y2="110"
          stroke="hsl(210 100% 55%)" strokeWidth="3"
          animate={{ x1: 150 + width / 2, x2: 150 + width / 2 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Actin filaments (thin) */}
        {[35, 55, 75, 95].map((y) => (
          <motion.line
            key={`actin-l-${y}`}
            y1={y} y2={y}
            stroke="hsl(190 80% 50%)" strokeWidth="2"
            animate={{ x1: 150 - width / 2 + 3, x2: 150 - width * 0.1 }}
            transition={{ duration: 0.8 }}
          />
        ))}
        {[35, 55, 75, 95].map((y) => (
          <motion.line
            key={`actin-r-${y}`}
            y1={y} y2={y}
            stroke="hsl(190 80% 50%)" strokeWidth="2"
            animate={{ x1: 150 + width * 0.1, x2: 150 + width / 2 - 3 }}
            transition={{ duration: 0.8 }}
          />
        ))}

        {/* Myosin filaments (thick) */}
        {[45, 65, 85].map((y) => (
          <motion.line
            key={`myosin-${y}`}
            y1={y} y2={y}
            stroke="hsl(0 70% 55%)" strokeWidth="4" strokeLinecap="round"
            animate={{ x1: 150 - width * 0.3, x2: 150 + width * 0.3 }}
            transition={{ duration: 0.8 }}
          />
        ))}

        {/* Labels */}
        <text x="150" y="125" textAnchor="middle" fill="hsl(215 15% 55%)" fontSize="10" fontFamily="Inter">
          {contracted ? "Pontes cruzadas ativas" : "Posição de repouso"}
        </text>
      </svg>
      <div className="flex gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-accent" />
          <span>Actina</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded bg-destructive" />
          <span>Miosina</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary" />
          <span>Linha Z</span>
        </div>
      </div>
    </div>
  );
};

export default SarcomereVisual;
