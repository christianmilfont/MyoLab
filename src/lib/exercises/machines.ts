export type ResistanceProfile = "ascending" | "descending" | "bell" | "constant";

export interface Machine {
  id: string;
  name: string;
  muscles: string[];
  exercises: string[];
  hypertrophyScore: number;
  description: string;
  advantages: string[];
  video: string;
  activation: string[];
  image?: string;
}

export const machines: Machine[] = [
  {
    id: "1",
    name: "Peck Deck",
    muscles: ["Peitoral"],
    exercises: ["Crucifixo"],
    hypertrophyScore: 94,
    description: "Alta tensão na posição encurtada do peitoral.",
    advantages: ["Isolamento", "Seguro", "Alta tensão"],
    activation: ["Peitoral maior", "Deltoide anterior"],
    video: "https://www.youtube.com/embed/eozdVDA78K0",
    image: "/machines/peck-deck.jpg",
  },

  {
    id: "2",
    name: "Crossover",
    muscles: ["Peitoral"],
    exercises: ["Crucifixo"],
    hypertrophyScore: 88,
    description: "Resistência constante durante toda amplitude.",
    advantages: ["Tensão contínua", "Versátil"],
    activation: ["Peitoral maior", "Deltoide anterior"],
    video: "https://www.youtube.com/embed/taI4XduLpTk",
    image: "/machines/crossover.jpg",
  },

  {
    id: "3",
    name: "Chest Press",
    muscles: ["Peitoral", "Tríceps"],
    exercises: ["Supino"],
    hypertrophyScore: 90,
    description: "Movimento guiado para desenvolvimento do peitoral.",
    advantages: ["Estável", "Alta carga"],
    activation: ["Peitoral maior", "Tríceps", "Deltoide anterior"],
    video: "https://www.youtube.com/embed/vthMCtgVtFw",
    image: "/machines/chest-press.jpg",
  },

  {
    id: "4",
    name: "Pulley Tríceps",
    muscles: ["Tríceps"],
    exercises: ["Tríceps Pulley"],
    hypertrophyScore: 85,
    description: "Excelente isolamento do tríceps.",
    advantages: ["Tensão contínua"],
    activation: ["Tríceps lateral", "Tríceps medial"],
    video: "https://www.youtube.com/embed/2-LAMcpzODU",
    image: "/machines/triceps-pulley.jpg",
  },

  {
    id: "5",
    name: "Rosca Máquina",
    muscles: ["Bíceps"],
    exercises: ["Rosca"],
    hypertrophyScore: 82,
    description: "Movimento guiado para bíceps.",
    advantages: ["Isolamento"],
    activation: ["Bíceps braquial", "Braquial"],
    video: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    image: "/machines/biceps-machine.jpg",
  }
];