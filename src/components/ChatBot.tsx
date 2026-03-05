import { useState } from "react"
import { searchQuestions } from "../lib/searchQuestions"

export default function ChatBot() {

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  function handleSend() {

    if (!input) return

    const result = searchQuestions(input)

    const newMessages = [
      ...messages,
      { type: "user", text: input },
      {
        type: "bot",
        text: result.answer,
        reference: result.reference
      }
    ]

    setMessages(newMessages)
    setInput("")
  }

  return (

    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-xl p-4">

      <h3 className="font-bold mb-2">SarcoBot 🧬</h3>

      <div className="h-60 overflow-y-auto mb-3 text-sm">

        {messages.map((msg, i) => (

          <div key={i} className="mb-2">

            {msg.type === "user" ? (
              <div className="text-right text-blue-600">
                {msg.text}
              </div>
            ) : (
              <div className="text-gray-800">
                {msg.text}

                {msg.reference && (
                  <div className="text-xs text-gray-500 mt-1">
                    📚 {msg.reference}
                  </div>
                )}
              </div>
            )}

          </div>

        ))}

      </div>

      <div className="flex gap-2">

        <input
          className="border rounded p-2 flex-1 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre hipertrofia..."
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Enviar
        </button>

      </div>

    </div>
  )
}