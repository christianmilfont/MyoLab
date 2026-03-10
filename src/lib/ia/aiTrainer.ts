export const workouts = {
  peito: {
    title: "Treino de Peito",
    exercises: ["Supino", "Peck Deck", "Crucifixo"],
    tip: "Foque em amplitude completa e controle excêntrico."
  },

  costas: {
    title: "Treino de Costas",
    exercises: ["Barra Fixa", "Remada Curvada", "Pulldown"],
    tip: "Pense em puxar com os cotovelos e não com as mãos."
  },

  pernas: {
    title: "Treino de Pernas",
    exercises: ["Agachamento", "Leg Press", "Cadeira Extensora"],
    tip: "Controle a descida e evite rebote no fundo."
  },

  biceps: {
    title: "Treino de Bíceps",
    exercises: ["Rosca Direta", "Rosca Alternada", "Rosca Scott"],
    tip: "Evite usar impulso do corpo."
  },

  triceps: {
    title: "Treino de Tríceps",
    exercises: ["Tríceps Pulley", "Tríceps Testa", "Mergulho"],
    tip: "Controle a fase excêntrica."
  }
};

export function getWorkoutSuggestion(input: string) {
  const text = input.toLowerCase();

  if (text.includes("peito")) return workouts.peito;
  if (text.includes("costas")) return workouts.costas;
  if (text.includes("perna")) return workouts.pernas;
  if (text.includes("bíceps") || text.includes("biceps")) return workouts.biceps;
  if (text.includes("tríceps") || text.includes("triceps")) return workouts.triceps;

  return null;
}