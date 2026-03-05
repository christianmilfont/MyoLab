import { motion } from "framer-motion";
import { Ruler, ArrowDown, ArrowUp } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const exercises = [
  {
    name: "Supino",
    partial: "Apenas a metade superior do movimento. O peitoral recebe tensão mínima na posição alongada.",
    full: "Amplitude completa com descida controlada até o peito. Maximiza a tensão no peitoral na posição alongada do ombro.",
    benefit: "Estudos mostram maior ativação do peitoral em amplitudes completas.",
  },
  {
    name: "Agachamento",
    partial: "Quarto agachamento ou meia amplitude. Limita a ativação de glúteos e porção distal do quadríceps.",
    full: "Agachamento profundo (abaixo do paralelo). Maior braço de momento no quadril e maior alongamento do reto femoral.",
    benefit: "Agachamentos profundos geram mais hipertrofia de quadríceps e glúteos.",
  },
  {
    name: "Stiff / Romeno",
    partial: "Amplitude limitada, sem alcançar grande alongamento dos isquiotibiais.",
    full: "Descida até sentir forte alongamento dos isquiotibiais, mantendo coluna neutra.",
    benefit: "Isquiotibiais respondem fortemente à tensão em posição alongada.",
  },
  {
    name: "Rosca Bíceps",
    partial: "Apenas a porção média-superior. Perde a fase de maior tensão na posição alongada.",
    full: "Extensão completa do cotovelo até flexão máxima. A porção alongada do bíceps recebe estímulo adicional.",
    benefit: "Rosca inclinada maximiza a tensão em posição alongada da cabeça longa do bíceps.",
  },
];

const AmplitudePage = () => {
  return (
    <div className="py-16">
      <section className="section-container py-12">
        <SectionHeader
          badge="Amplitude de Movimento"
          title="Amplitude de Movimento e Hipertrofia"
          description="Evidências crescentes mostram que treinar em maior amplitude — especialmente na posição alongada — pode maximizar o crescimento muscular."
        />
      </section>

      {/* Key concept */}
      <section className="bg-secondary/30 py-16">
        <div className="section-container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="pillar-card">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Hipertrofia em Posição Alongada</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pesquisas recentes (Wolf et al.) demonstram que a tensão mecânica aplicada quando o músculo está em posição alongada é particularmente potente para estimular hipertrofia. Isso pode estar relacionado a maior ativação de mecanossensores como a titina e possível adição de sarcômeros em série.
              </p>
            </div>
            <div className="pillar-card">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold text-foreground">Amplitude Parcial vs Completa</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Amplitudes parciais na porção encurtada do movimento tendem a gerar menos hipertrofia que amplitudes completas. Porém, amplitudes parciais na porção alongada podem ser tão eficazes (ou até mais) que a amplitude completa para certos músculos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise comparisons */}
      <section className="section-container py-16">
        <SectionHeader
          badge="Comparações"
          title="Amplitude Curta vs Amplitude Completa"
          description="Veja como a amplitude afeta o estímulo em exercícios populares."
        />
        <div className="space-y-6 max-w-4xl mx-auto">
          {exercises.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="pillar-card"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-4">{ex.name}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg p-4 border border-border bg-background/50">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUp className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-medium text-destructive uppercase tracking-wider">Amplitude Parcial</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{ex.partial}</p>
                </div>
                <div className="rounded-lg p-4 border border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowDown className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Amplitude Completa</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{ex.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-accent text-sm">✦</span>
                <p className="text-sm text-accent">{ex.benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual ROM comparison */}
      <section className="bg-secondary/30 py-16">
        <div className="section-container max-w-3xl">
          <SectionHeader
            badge="Visualização"
            title="Tensão ao Longo da Amplitude"
          />
          <div className="diagram-container">
            <svg viewBox="0 0 400 200" className="w-full">
              {/* Axis */}
              <line x1="40" y1="170" x2="380" y2="170" stroke="hsl(215 15% 30%)" strokeWidth="1" />
              <line x1="40" y1="170" x2="40" y2="20" stroke="hsl(215 15% 30%)" strokeWidth="1" />
              
              {/* X axis labels */}
              <text x="210" y="195" textAnchor="middle" fill="hsl(215 15% 55%)" fontSize="10" fontFamily="Inter">Amplitude de Movimento</text>
              <text x="60" y="185" fill="hsl(215 15% 45%)" fontSize="9" fontFamily="Inter">Alongado</text>
              <text x="340" y="185" fill="hsl(215 15% 45%)" fontSize="9" fontFamily="Inter" textAnchor="end">Encurtado</text>
              
              {/* Y axis label */}
              <text x="15" y="95" fill="hsl(215 15% 55%)" fontSize="10" fontFamily="Inter" transform="rotate(-90 15 95)" textAnchor="middle">Tensão</text>

              {/* Full ROM curve */}
              <path
                d="M 60 130 Q 120 30 200 50 Q 280 70 360 140"
                fill="none" stroke="hsl(210 100% 55%)" strokeWidth="2.5"
              />
              
              {/* Partial ROM curve */}
              <path
                d="M 200 100 Q 280 80 360 140"
                fill="none" stroke="hsl(0 70% 55%)" strokeWidth="2" strokeDasharray="6 4"
              />

              {/* Stretched position highlight */}
              <rect x="55" y="25" width="120" height="150" rx="6" fill="hsl(210 100% 55% / 0.06)" stroke="hsl(210 100% 55% / 0.2)" strokeWidth="1" strokeDasharray="4 4" />
              <text x="115" y="42" textAnchor="middle" fill="hsl(210 100% 55%)" fontSize="9" fontFamily="Inter">Zona de maior</text>
              <text x="115" y="54" textAnchor="middle" fill="hsl(210 100% 55%)" fontSize="9" fontFamily="Inter">estímulo hipertrófico</text>

              {/* Legend */}
              <line x1="240" y1="30" x2="265" y2="30" stroke="hsl(210 100% 55%)" strokeWidth="2.5" />
              <text x="270" y="34" fill="hsl(215 15% 55%)" fontSize="9" fontFamily="Inter">Amplitude completa</text>
              <line x1="240" y1="48" x2="265" y2="48" stroke="hsl(0 70% 55%)" strokeWidth="2" strokeDasharray="6 4" />
              <text x="270" y="52" fill="hsl(215 15% 55%)" fontSize="9" fontFamily="Inter">Amplitude parcial</text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmplitudePage;
