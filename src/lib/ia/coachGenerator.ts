export function generateWorkout(goal: string, days: number) {

  if (goal === "hipertrofia") {

    if (days === 3) {
      return `
Treino 3x por semana

Dia A
• Supino
• Remada
• Rosca Bíceps

Dia B
• Agachamento
• Leg Press
• Panturrilha

Dia C
• Desenvolvimento
• Tríceps Pulley
• Elevação lateral
`;
    }

    if (days === 4) {
      return `
Treino 4x por semana

Upper
• Supino
• Remada
• Rosca Bíceps

Lower
• Agachamento
• Leg Press
• Mesa Flexora

Upper
• Peck Deck
• Pulldown
• Tríceps Pulley

Lower
• Hack
• Cadeira Extensora
• Panturrilha
`;
    }
  }

  return `
Treino sugerido

• Supino
• Remada
• Agachamento
• Rosca
• Tríceps
`;
}