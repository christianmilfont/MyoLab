import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Play, Dumbbell, Target, TrendingUp, Filter } from "lucide-react";

type ResistanceProfile = "ascending" | "descending" | "bell" | "constant";

interface Machine {
  id: string;
  name: string;
  type: "machine" | "cable" | "free_weight" | "smith";
  muscles: string[];
  exercises: string[];
  resistanceProfile: ResistanceProfile;
  profileMatch: number; // 0-100 how well it matches muscle's length-tension
  description: string;
  advantages: string[];
  videoPlaceholder: boolean;
}

const muscleGroups = [
  "Peitoral",
  "Dorsais",
  "Deltoides",
  "Bíceps",
  "Tríceps",
  "Quadríceps",
  "Isquiotibiais",
  "Glúteos",
  "Panturrilha",
];

const exerciseTypes = [
  "Supino",
  "Crucifixo",
  "Remada",
  "Puxada",
  "Desenvolvimento",
  "Elevação Lateral",
  "Rosca",
  "Tríceps Pulley",
  "Agachamento",
  "Leg Press",
  "Extensora",
  "Flexora",
  "Stiff",
  "Hip Thrust",
  "Panturrilha em Pé",
];

const machines: Machine[] = [
  {
    id: "1",
    name: "Peck Deck (Voador)",
    type: "machine",
    muscles: ["Peitoral"],
    exercises: ["Crucifixo"],
    resistanceProfile: "bell",
    profileMatch: 92,
    description: "Excelente para isolamento do peitoral. O perfil de resistência tipo sino combina bem com a curva de comprimento-tensão do peitoral, oferecendo maior tensão na posição alongada.",
    advantages: ["Alta tensão na posição alongada", "Isolamento eficaz", "Seguro para falha"],
    videoPlaceholder: true,
  },
  {
    id: "2",
    name: "Crossover (Cabo)",
    type: "cable",
    muscles: ["Peitoral"],
    exercises: ["Crucifixo"],
    resistanceProfile: "constant",
    profileMatch: 88,
    description: "Resistência constante ao longo de toda amplitude. Permite ajustar ângulos para enfatizar diferentes regiões do peitoral.",
    advantages: ["Resistência constante", "Versatilidade de ângulos", "Tensão contínua"],
    videoPlaceholder: true,
  },
  {
    id: "3",
    name: "Supino Máquina Convergente",
    type: "machine",
    muscles: ["Peitoral", "Tríceps", "Deltoides"],
    exercises: ["Supino"],
    resistanceProfile: "ascending",
    profileMatch: 78,
    description: "Simula o supino com barra mas com trajetória guiada convergente, respeitando a biomecânica natural do empurrar.",
    advantages: ["Segurança", "Trajetória convergente", "Bom para iniciantes"],
    videoPlaceholder: true,
  },
  {
    id: "4",
    name: "Supino com Barra",
    type: "free_weight",
    muscles: ["Peitoral", "Tríceps", "Deltoides"],
    exercises: ["Supino"],
    resistanceProfile: "ascending",
    profileMatch: 72,
    description: "Clássico exercício composto. A resistência é menor na posição alongada (onde o peitoral mais precisa) e maior no topo.",
    advantages: ["Alto recrutamento motor", "Força funcional", "Progressão de carga"],
    videoPlaceholder: true,
  },
  {
    id: "5",
    name: "Pulley Alto (Puxada)",
    type: "cable",
    muscles: ["Dorsais", "Bíceps"],
    exercises: ["Puxada"],
    resistanceProfile: "constant",
    profileMatch: 85,
    description: "Resistência constante via cabo. Excelente para dorsais com tensão mantida durante toda amplitude.",
    advantages: ["Tensão constante", "Fácil ajuste de carga", "Múltiplas pegadas"],
    videoPlaceholder: true,
  },
  {
    id: "6",
    name: "Remada Máquina (Hammer Strength)",
    type: "machine",
    muscles: ["Dorsais", "Bíceps"],
    exercises: ["Remada"],
    resistanceProfile: "bell",
    profileMatch: 90,
    description: "Perfil de resistência que maximiza a tensão no meio da amplitude, coincidindo com a posição de maior produção de força dos dorsais.",
    advantages: ["Unilateral possível", "Perfil otimizado", "Estável"],
    videoPlaceholder: true,
  },
  {
    id: "7",
    name: "Cadeira Extensora",
    type: "machine",
    muscles: ["Quadríceps"],
    exercises: ["Extensora"],
    resistanceProfile: "ascending",
    profileMatch: 70,
    description: "Isola o quadríceps. A resistência aumenta conforme a perna estende, mas o quadríceps é mais forte em posições intermediárias.",
    advantages: ["Isolamento total", "Seguro", "Bom para pré-exaustão"],
    videoPlaceholder: true,
  },
  {
    id: "8",
    name: "Leg Press 45°",
    type: "machine",
    muscles: ["Quadríceps", "Glúteos"],
    exercises: ["Leg Press"],
    resistanceProfile: "ascending",
    profileMatch: 82,
    description: "Permite cargas altas com segurança. O ângulo de 45° oferece boa tensão na posição alongada dos quadríceps e glúteos.",
    advantages: ["Altas cargas", "Segurança", "Amplitude ajustável"],
    videoPlaceholder: true,
  },
  {
    id: "9",
    name: "Mesa Flexora",
    type: "machine",
    muscles: ["Isquiotibiais"],
    exercises: ["Flexora"],
    resistanceProfile: "descending",
    profileMatch: 88,
    description: "O perfil descendente combina bem com os isquiotibiais, que produzem mais força em posição alongada (joelho estendido).",
    advantages: ["Perfil compatível", "Isolamento", "Posição alongada favorecida"],
    videoPlaceholder: true,
  },
  {
    id: "10",
    name: "Stiff com Barra",
    type: "free_weight",
    muscles: ["Isquiotibiais", "Glúteos"],
    exercises: ["Stiff"],
    resistanceProfile: "ascending",
    profileMatch: 75,
    description: "Exercício livre que enfatiza a cadeia posterior. A maior tensão ocorre na posição mais baixa (alongada).",
    advantages: ["Alongamento sob carga", "Cadeia posterior", "Funcional"],
    videoPlaceholder: true,
  },
  {
    id: "11",
    name: "Hip Thrust com Barra",
    type: "free_weight",
    muscles: ["Glúteos"],
    exercises: ["Hip Thrust"],
    resistanceProfile: "ascending",
    profileMatch: 80,
    description: "Máxima tensão no topo do movimento (contração do glúteo). Perfil ascendente que combina com a produção de força do glúteo no encurtamento.",
    advantages: ["Pico de contração no glúteo", "Alta carga possível", "Específico para glúteos"],
    videoPlaceholder: true,
  },
  {
    id: "12",
    name: "Rosca Scott Máquina",
    type: "machine",
    muscles: ["Bíceps"],
    exercises: ["Rosca"],
    resistanceProfile: "bell",
    profileMatch: 86,
    description: "O apoio do scott elimina compensações. O perfil tipo sino proporciona boa tensão na fase intermediária e alongada.",
    advantages: ["Isolamento máximo", "Sem compensação", "Tensão na posição alongada"],
    videoPlaceholder: true,
  },
  {
    id: "13",
    name: "Rosca no Cabo (Pulley Baixo)",
    type: "cable",
    muscles: ["Bíceps"],
    exercises: ["Rosca"],
    resistanceProfile: "constant",
    profileMatch: 84,
    description: "Resistência constante em toda a amplitude. Mantém o bíceps sob tensão contínua.",
    advantages: ["Tensão constante", "Versátil", "Boa para drop sets"],
    videoPlaceholder: true,
  },
  {
    id: "14",
    name: "Tríceps Pulley (Corda)",
    type: "cable",
    muscles: ["Tríceps"],
    exercises: ["Tríceps Pulley"],
    resistanceProfile: "constant",
    profileMatch: 83,
    description: "Tensão constante via cabo com possibilidade de abertura no final para ativar a cabeça lateral.",
    advantages: ["Tensão constante", "Abertura final", "Fácil progressão"],
    videoPlaceholder: true,
  },
  {
    id: "15",
    name: "Desenvolvimento Máquina",
    type: "machine",
    muscles: ["Deltoides", "Tríceps"],
    exercises: ["Desenvolvimento"],
    resistanceProfile: "ascending",
    profileMatch: 76,
    description: "Seguro para ombros com trajetória guiada. Bom para iniciantes ou para treinar próximo à falha.",
    advantages: ["Segurança articular", "Trajetória fixa", "Fácil uso"],
    videoPlaceholder: true,
  },
  {
    id: "16",
    name: "Elevação Lateral no Cabo",
    type: "cable",
    muscles: ["Deltoides"],
    exercises: ["Elevação Lateral"],
    resistanceProfile: "constant",
    profileMatch: 90,
    description: "Resistência constante que mantém o deltoide lateral sob tensão em toda amplitude, superior aos halteres na fase inicial.",
    advantages: ["Tensão desde o início", "Resistência constante", "Unilateral"],
    videoPlaceholder: true,
  },
  {
    id: "17",
    name: "Panturrilha no Smith",
    type: "smith",
    muscles: ["Panturrilha"],
    exercises: ["Panturrilha em Pé"],
    resistanceProfile: "ascending",
    profileMatch: 74,
    description: "Permite cargas altas com segurança. A barra guiada facilita o equilíbrio para focar na panturrilha.",
    advantages: ["Altas cargas", "Estabilidade", "Amplitude completa"],
    videoPlaceholder: true,
  },
];

const profileLabels: Record<ResistanceProfile, string> = {
  ascending: "Ascendente",
  descending: "Descendente",
  bell: "Sino (Bell)",
  constant: "Constante",
};

const profileColors: Record<ResistanceProfile, string> = {
  ascending: "text-green-400",
  descending: "text-orange-400",
  bell: "text-blue-400",
  constant: "text-purple-400",
};

const typeLabels: Record<string, string> = {
  machine: "Máquina",
  cable: "Cabo",
  free_weight: "Peso Livre",
  smith: "Smith",
};

const ProfileChart = ({ profile }: { profile: ResistanceProfile }) => {
  const paths: Record<ResistanceProfile, string> = {
    ascending: "M 10 70 Q 50 60 90 15",
    descending: "M 10 15 Q 50 60 90 70",
    bell: "M 10 70 Q 30 10 50 10 Q 70 10 90 70",
    constant: "M 10 40 L 90 40",
  };

  return (
    <svg viewBox="0 0 100 80" className="w-full h-16">
      <text x="5" y="10" className="fill-muted-foreground text-[6px]">Força</text>
      <text x="70" y="78" className="fill-muted-foreground text-[6px]">ROM</text>
      <line x1="10" y1="5" x2="10" y2="72" className="stroke-border" strokeWidth="0.5" />
      <line x1="10" y1="72" x2="95" y2="72" className="stroke-border" strokeWidth="0.5" />
      <path d={paths[profile]} fill="none" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const MaquinasPage = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const filtered = machines.filter((m) => {
    if (selectedMuscle && !m.muscles.includes(selectedMuscle)) return false;
    if (selectedExercise && !m.exercises.includes(selectedExercise)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => b.profileMatch - a.profileMatch);

  return (
    <div className="py-16">
      <div className="section-container">
        <SectionHeader
          title="Melhores Máquinas por Perfil de Resistência"
          description="Encontre os melhores equipamentos para cada músculo baseado na compatibilidade entre o perfil de resistência da máquina e a curva comprimento-tensão do músculo."
        />

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" /> Filtrar por Músculo
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => setSelectedMuscle(null)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  !selectedMuscle ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Todos
              </button>
              {muscleGroups.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedMuscle === m ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Dumbbell className="w-4 h-4" /> Filtrar por Exercício
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => setSelectedExercise(null)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  !selectedExercise ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Todos
              </button>
              {exerciseTypes.map((e) => (
                <button
                  key={e}
                  onClick={() => setSelectedExercise(e)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedExercise === e ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-6">
          <Filter className="w-4 h-4 inline mr-1" />
          {sorted.length} equipamento{sorted.length !== 1 ? "s" : ""} encontrado{sorted.length !== 1 ? "s" : ""}
        </p>

        <div className="grid gap-6">
          {sorted.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <div className="grid md:grid-cols-[1fr_180px_200px] gap-6">
                {/* Info */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="font-display font-bold text-lg text-foreground">{machine.name}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {typeLabels[machine.type]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{machine.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {machine.muscles.map((m) => (
                      <Badge key={m} variant="outline" className="text-xs">
                        {m}
                      </Badge>
                    ))}
                    {machine.exercises.map((e) => (
                      <Badge key={e} className="text-xs bg-primary/10 text-primary border-primary/20">
                        {e}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {machine.advantages.map((a) => (
                      <span key={a} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resistance Profile Chart */}
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xs text-muted-foreground mb-1">Perfil de Resistência</p>
                  <ProfileChart profile={machine.resistanceProfile} />
                  <p className={`text-sm font-medium mt-1 ${profileColors[machine.resistanceProfile]}`}>
                    {profileLabels[machine.resistanceProfile]}
                  </p>
                </div>

                {/* Match Score + Video */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Compatibilidade</p>
                    <div className="relative w-16 h-16 mx-auto">
                      <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-secondary" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          className="stroke-primary"
                          strokeWidth="3"
                          strokeDasharray={`${machine.profileMatch} ${100 - machine.profileMatch}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                        {machine.profileMatch}%
                      </span>
                    </div>
                  </div>

                  {machine.videoPlaceholder && (
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors text-sm">
                      <Play className="w-4 h-4" />
                      Ver Execução
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16">
            <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum equipamento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaquinasPage;
