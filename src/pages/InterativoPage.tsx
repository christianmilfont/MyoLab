import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const exercises = [
  {
    id: "supino",
    name: "Supino",
    category: "Press",
    romOptions: ["Amplitude Completa", "Parcial (superior)", "Parcial (inferior/alongada)"],
    resistanceOptions: ["Barra livre", "Halteres", "Máquina Smith", "Máquina convergente"],
  },
  {
    id: "agachamento",
    name: "Agachamento",
    category: "Squat",
    romOptions: ["Profundo (abaixo do paralelo)", "Paralelo", "Quarto agachamento"],
    resistanceOptions: ["Barra livre (back squat)", "Barra frontal", "Hack machine", "Leg press"],
  },
  {
    id: "remada",
    name: "Remada",
    category: "Pull",
    romOptions: ["Amplitude Completa", "Foco na retração", "Foco no alongamento"],
    resistanceOptions: ["Barra livre", "Halteres", "Cabo/Polia", "Máquina"],
  },
  {
    id: "stiff",
    name: "Stiff / Romeno",
    category: "Hip Hinge",
    romOptions: ["Amplitude Completa", "Parcial (superior)", "Déficit (elevado)"],
    resistanceOptions: ["Barra livre", "Halteres", "Cabo/Polia", "Máquina"],
  },
  {
    id: "rosca",
    name: "Rosca Bíceps",
    category: "Isolamento",
    romOptions: ["Amplitude Completa", "Parcial (encurtada)", "Rosca inclinada (alongada)"],
    resistanceOptions: ["Barra reta", "Halteres", "Cabo/Polia", "Scott bench"],
  },
];

interface SimResult {
  muscles: string[];
  tensionZone: string;
  benefits: string[];
}

function getSimResult(exerciseId: string, rom: string, resistance: string): SimResult {
  const results: Record<string, SimResult> = {
    "supino-completa-livre": {
      muscles: ["Peitoral maior (esternal + clavicular)", "Deltóide anterior", "Tríceps braquial"],
      tensionZone: "Posição alongada (peito) — máxima tensão no peitoral quando a barra toca o peito.",
      benefits: ["Estímulo hipertrófico completo do peitoral", "Boa ativação em posição alongada", "Desafio na porção média do ROM"],
    },
  };

  // Simplified logic for general results
  const ex = exercises.find(e => e.id === exerciseId);
  if (!ex) return { muscles: [], tensionZone: "", benefits: [] };

  const isStretched = rom.toLowerCase().includes("completa") || rom.toLowerCase().includes("profund") || rom.toLowerCase().includes("alongada") || rom.toLowerCase().includes("déficit") || rom.toLowerCase().includes("inclinada");
  const isMachine = resistance.toLowerCase().includes("máquina") || resistance.toLowerCase().includes("cabo") || resistance.toLowerCase().includes("scott") || resistance.toLowerCase().includes("hack") || resistance.toLowerCase().includes("leg");

  const muscleMap: Record<string, string[]> = {
    supino: ["Peitoral maior", "Deltóide anterior", "Tríceps braquial"],
    agachamento: ["Quadríceps", "Glúteo máximo", "Adutores"],
    remada: ["Latíssimo do dorso", "Rombóides", "Trapézio médio", "Bíceps braquial"],
    stiff: ["Isquiotibiais", "Glúteo máximo", "Eretores da espinha"],
    rosca: ["Bíceps braquial (cabeça longa e curta)", "Braquial", "Braquiorradial"],
  };

  return {
    muscles: muscleMap[exerciseId] || [],
    tensionZone: isStretched
      ? "Posição alongada — maior tensão mecânica na fase excêntrica e no ponto de maior alongamento muscular."
      : "Porção média a encurtada — tensão concentrada no pico da contração.",
    benefits: [
      isStretched ? "Maior estímulo hipertrófico na posição alongada" : "Foco na contração de pico",
      isMachine ? "Curva de resistência mais constante ao longo do ROM" : "Maior demanda de estabilização e recrutamento global",
      isStretched && isMachine ? "Combinação ideal: tensão em posição alongada com resistência constante" : "Padrão eficiente para desenvolvimento muscular geral",
    ],
  };
}

const InterativoPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0].id);
  const [selectedRom, setSelectedRom] = useState(0);
  const [selectedResistance, setSelectedResistance] = useState(0);

  const exercise = exercises.find(e => e.id === selectedExercise)!;
  const result = useMemo(
    () => getSimResult(selectedExercise, exercise.romOptions[selectedRom], exercise.resistanceOptions[selectedResistance]),
    [selectedExercise, selectedRom, selectedResistance, exercise]
  );

  return (
    <div className="py-16">
      <section className="section-container py-12">
        <SectionHeader
          badge="Interativo"
          title="Simulador de Exercício"
          description="Selecione um exercício, amplitude e tipo de resistência para visualizar os músculos ativados e benefícios."
        />
      </section>

      <section className="section-container pb-16">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Exercise */}
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Exercício</label>
              <div className="grid grid-cols-2 gap-2">
                {exercises.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => { setSelectedExercise(ex.id); setSelectedRom(0); setSelectedResistance(0); }}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedExercise === ex.id
                        ? "bg-primary/15 border-primary/50 text-primary"
                        : "bg-secondary border-border text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {ex.name}
                    <span className="block text-xs text-muted-foreground mt-0.5">{ex.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ROM */}
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Amplitude de Movimento</label>
              <div className="space-y-2">
                {exercise.romOptions.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedRom(i)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedRom === i
                        ? "bg-primary/15 border-primary/50 text-primary"
                        : "bg-secondary border-border text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Resistance */}
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Tipo de Resistência</label>
              <div className="grid grid-cols-2 gap-2">
                {exercise.resistanceOptions.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedResistance(i)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedResistance === i
                        ? "bg-accent/15 border-accent/50 text-accent"
                        : "bg-secondary border-border text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <motion.div
            key={`${selectedExercise}-${selectedRom}-${selectedResistance}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="pillar-card">
              <h3 className="font-display font-semibold text-foreground mb-3">Músculos Ativados</h3>
              <div className="flex flex-wrap gap-2">
                {result.muscles.map(m => (
                  <span key={m} className="info-badge">{m}</span>
                ))}
              </div>
            </div>

            <div className="pillar-card">
              <h3 className="font-display font-semibold text-foreground mb-3">Região de Maior Tensão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.tensionZone}</p>
            </div>

            <div className="pillar-card">
              <h3 className="font-display font-semibold text-foreground mb-3">Benefícios para Hipertrofia</h3>
              <ul className="space-y-2">
                {result.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InterativoPage;
