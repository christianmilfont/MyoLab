import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Play, Dumbbell, Target, Filter } from "lucide-react";

type ResistanceProfile = "ascending" | "descending" | "bell" | "constant";

interface Machine {
  id: string;
  name: string;
  type: "machine" | "cable" | "free_weight" | "smith";
  muscles: string[];
  exercises: string[];
  resistanceProfile: ResistanceProfile;
  profileMatch: number;
  description: string;
  advantages: string[];
  videoPlaceholder: boolean;
  image?: string;
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
    description:
      "Excelente para isolamento do peitoral. O perfil de resistência tipo sino combina bem com a curva de comprimento-tensão do peitoral.",
    advantages: ["Alta tensão alongada", "Isolamento eficaz", "Seguro para falha"],
    videoPlaceholder: true,
    image: "/src/assets/machines/peck-deck.jpg",
  },
  {
    id: "2",
    name: "Crossover (Cabo)",
    type: "cable",
    muscles: ["Peitoral"],
    exercises: ["Crucifixo"],
    resistanceProfile: "constant",
    profileMatch: 88,
    description:
      "Resistência constante ao longo da amplitude. Permite ajustar ângulos para diferentes regiões do peitoral.",
    advantages: ["Tensão constante", "Versátil", "Ajuste de ângulo"],
    videoPlaceholder: true,
    image: "/src/assets/machines/crossover.jpg",
  },
  {
    id: "3",
    name: "Supino Máquina Convergente",
    type: "machine",
    muscles: ["Peitoral", "Tríceps", "Deltoides"],
    exercises: ["Supino"],
    resistanceProfile: "ascending",
    profileMatch: 78,
    description:
      "Simula o supino com barra com trajetória convergente guiada.",
    advantages: ["Seguro", "Trajetória natural", "Bom para iniciantes"],
    videoPlaceholder: true,
    image: "/src/assets/machines/chest-press.jpg",
  },
];

const profileLabels: Record<ResistanceProfile, string> = {
  ascending: "Ascendente",
  descending: "Descendente",
  bell: "Sino",
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
      <line x1="10" y1="5" x2="10" y2="72" className="stroke-border" strokeWidth="0.5" />
      <line x1="10" y1="72" x2="95" y2="72" className="stroke-border" strokeWidth="0.5" />
      <path
        d={paths[profile]}
        fill="none"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
      />
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
          description="Compare equipamentos baseado na compatibilidade com a curva comprimento-tensão muscular."
        />

        {/* Filters */}

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div>
            <label className="text-sm text-muted-foreground flex gap-2 items-center">
              <Target className="w-4 h-4" />
              Filtrar por músculo
            </label>

            <div className="flex flex-wrap gap-2 mt-3">

              <button
                onClick={() => setSelectedMuscle(null)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  !selectedMuscle
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                Todos
              </button>

              {muscleGroups.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedMuscle === m
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground flex gap-2 items-center">
              <Dumbbell className="w-4 h-4" />
              Filtrar por exercício
            </label>

            <div className="flex flex-wrap gap-2 mt-3">

              <button
                onClick={() => setSelectedExercise(null)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  !selectedExercise
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                Todos
              </button>

              {exerciseTypes.map((e) => (
                <button
                  key={e}
                  onClick={() => setSelectedExercise(e)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedExercise === e
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

        </div>

        <p className="text-sm text-muted-foreground mb-6">
          <Filter className="w-4 h-4 inline mr-1" />
          {sorted.length} equipamentos encontrados
        </p>

        {/* CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {sorted.map((machine, index) => (

            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all"
            >

              {/* IMAGE */}

              <div className="relative h-64 w-full overflow-hidden">

                <img
                  src={machine.image || "/placeholder-machine.jpg"}
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">

                  <h3 className="text-white font-bold text-lg">
                    {machine.name}
                  </h3>

                  <Badge className="mt-1 bg-white/20 text-white backdrop-blur">
                    {typeLabels[machine.type]}
                  </Badge>

                </div>
              </div>

              {/* CONTENT */}

              <div className="p-6 space-y-4">

                <p className="text-sm text-muted-foreground">
                  {machine.description}
                </p>

                <div className="flex flex-wrap gap-2">

                  {machine.muscles.map((m) => (
                    <Badge key={m} variant="outline">
                      {m}
                    </Badge>
                  ))}

                  {machine.exercises.map((e) => (
                    <Badge
                      key={e}
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {e}
                    </Badge>
                  ))}

                </div>

                <div>

                  <p className="text-xs text-muted-foreground mb-1">
                    Perfil de Resistência
                  </p>

                  <ProfileChart profile={machine.resistanceProfile} />

                  <p
                    className={`text-sm font-medium ${profileColors[machine.resistanceProfile]}`}
                  >
                    {profileLabels[machine.resistanceProfile]}
                  </p>

                </div>

                <div className="flex justify-between items-center pt-2">

                  <div className="text-sm font-bold text-primary">
                    Match {machine.profileMatch}%
                  </div>

                  {machine.videoPlaceholder && (
                    <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-secondary hover:bg-primary/20 transition">
                      <Play className="w-4 h-4" />
                      Execução
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
            <p className="text-muted-foreground">
              Nenhum equipamento encontrado.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MaquinasPage;