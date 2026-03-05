import { motion } from "framer-motion";
import { ArrowDownUp, ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ExpandableCard from "@/components/ExpandableCard";

const patterns = [
  {
    icon: <ArrowUpDown className="w-5 h-5" />,
    name: "Supinar (Press)",
    desc: "Movimentos de empurrar: supino, desenvolvimento, flexão.",
    muscles: "Peitoral maior, deltóide anterior, tríceps braquial",
    biomechanics: "O vetor de força é perpendicular ao tronco. A resistência é máxima quando o braço de momento articular é maior — geralmente no ponto médio do movimento.",
    vectors: "No supino, o vetor gravitacional é vertical. A inclinação do banco altera qual porção do peitoral recebe maior tensão: banco plano enfatiza o peitoral esternal, enquanto o inclinado enfatiza a porção clavicular.",
    technique: "Alterar a largura da pegada muda o braço de momento no cotovelo e no ombro. Pegada mais larga aumenta o braço de momento no ombro (mais peitoral), enquanto pegada mais estreita enfatiza o tríceps.",
  },
  {
    icon: <ArrowDownUp className="w-5 h-5" />,
    name: "Remar (Pull)",
    desc: "Movimentos de puxar: remada, pulldown, pull-up.",
    muscles: "Latíssimo do dorso, rombóides, trapézio, bíceps braquial",
    biomechanics: "Movimentos de puxada envolvem extensão e/ou adução do ombro, junto com flexão do cotovelo. O latíssimo é um potente extensor e adutor do ombro.",
    vectors: "Puxadas verticais (pulldown) enfatizam a adução do ombro. Puxadas horizontais (remadas) enfatizam a extensão do ombro e retração escapular, ativando mais os rombóides e trapézio médio.",
    technique: "A pronação ou supinação do antebraço muda a contribuição do bíceps. Pegada supinada aumenta a vantagem mecânica do bíceps na flexão do cotovelo.",
  },
  {
    icon: <MoveDown className="w-5 h-5" />,
    name: "Agachar (Squat)",
    desc: "Padrões de agachamento: agachamento, leg press, hack.",
    muscles: "Quadríceps, glúteo máximo, adutores",
    biomechanics: "O agachamento é um movimento multiarticular que envolve flexão simultânea de quadril, joelho e tornozelo. A distribuição de carga entre quadríceps e glúteos depende da inclinação do tronco e profundidade.",
    vectors: "A barra nas costas cria um vetor de compressão axial na coluna. No leg press, a resistência é aplicada nos pés em ângulo, reduzindo a carga espinhal mas alterando os vetores articulares.",
    technique: "Agachamento mais profundo aumenta o braço de momento no quadril (mais glúteo) e a amplitude do quadríceps. A posição dos pés (largura e rotação) altera a contribuição dos adutores.",
  },
  {
    icon: <MoveUp className="w-5 h-5" />,
    name: "Quadril (Hip Hinge)",
    desc: "Levantamentos de quadril: stiff, romeno, hip thrust.",
    muscles: "Isquiotibiais, glúteo máximo, eretores da espinha",
    biomechanics: "O hip hinge é uma flexão primária do quadril com mínima flexão de joelho. Isso coloca os isquiotibiais em posição alongada, maximizando seu braço de momento no quadril.",
    vectors: "No stiff/romeno, a resistência é máxima na posição alongada (tronco paralelo ao solo). No hip thrust, a resistência é máxima na extensão completa do quadril, favorecendo o pico de ativação do glúteo.",
    technique: "Manter os joelhos mais estendidos no stiff aumenta o alongamento dos isquiotibiais. Flexionar levemente os joelhos (romeno) permite maior carga mas reduz a tensão em posição alongada.",
  },
];

const BiomecanicaPage = () => {
  return (
    <div className="py-16">
      <section className="section-container py-12">
        <SectionHeader
          badge="Biomecânica"
          title="Biomecânica dos Exercícios"
          description="Entenda os padrões de movimento fundamentais da musculação e como variáveis biomecânicas afetam o estímulo muscular."
        />
      </section>

      <section className="section-container pb-16">
        <div className="space-y-6 max-w-4xl mx-auto">
          {patterns.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ExpandableCard
                title={p.name}
                summary={p.desc}
                icon={p.icon}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Músculos Principais</h4>
                    <p className="text-muted-foreground">{p.muscles}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Função Biomecânica</h4>
                    <p className="text-muted-foreground">{p.biomechanics}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Vetores de Força</h4>
                    <p className="text-muted-foreground">{p.vectors}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Impacto da Técnica</h4>
                    <p className="text-muted-foreground">{p.technique}</p>
                  </div>
                </div>
              </ExpandableCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Force Vectors Diagram */}
      <section className="bg-secondary/30 py-16">
        <div className="section-container max-w-3xl">
          <SectionHeader
            badge="Conceito-Chave"
            title="Braço de Momento e Tensão Muscular"
            description="O braço de momento é a distância perpendicular entre o vetor de força e o eixo articular. Quanto maior o braço de momento, maior a tensão no músculo."
          />
          <div className="diagram-container">
            <svg viewBox="0 0 400 250" className="w-full">
              {/* Joint */}
              <circle cx="200" cy="200" r="8" fill="hsl(210 100% 55%)" />
              <text x="200" y="230" textAnchor="middle" fill="hsl(215 15% 55%)" fontSize="11" fontFamily="Inter">Articulação</text>

              {/* Bone */}
              <line x1="200" y1="200" x2="340" y2="80" stroke="hsl(210 20% 92%)" strokeWidth="3" strokeLinecap="round" />

              {/* Force vector (gravity) */}
              <line x1="300" y1="120" x2="300" y2="200" stroke="hsl(190 80% 50%)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="315" y="165" fill="hsl(190 80% 50%)" fontSize="10" fontFamily="Inter">Força (gravidade)</text>

              {/* Moment arm */}
              <line x1="200" y1="200" x2="300" y2="200" stroke="hsl(0 70% 55%)" strokeWidth="1.5" strokeDasharray="5 5" />
              <text x="250" y="215" textAnchor="middle" fill="hsl(0 70% 55%)" fontSize="10" fontFamily="Inter">Braço de momento</text>

              {/* Perpendicular indicator */}
              <rect x="293" y="193" width="7" height="7" fill="none" stroke="hsl(215 15% 55%)" strokeWidth="1" />

              {/* Arrow marker */}
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(190 80% 50%)" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BiomecanicaPage;
