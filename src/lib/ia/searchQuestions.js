import { chatbotData } from "../../data/chatbotData"

export function searchQuestions(userQuestion) {

  const question = userQuestion.toLowerCase()

  for (const item of chatbotData) {

    const match = item.keywords.some(keyword =>
      question.includes(keyword)
    )

    if (match) {
      return item
    }

  }

  return {
    answer: "Ainda não tenho uma resposta científica para essa pergunta. Tente perguntar sobre hipertrofia, biomecânica ou amplitude de movimento.",
    reference: ""
  }
}