import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { searchQuestions } from "../lib/searchQuestions"

import { SiChatbot } from "react-icons/si"
import { FaUser } from "react-icons/fa"
import { IoChevronDown } from "react-icons/io5"

export default function ChatBot() {

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")

  const [messages, setMessages] = useState<any[]>([
    {
      type: "bot",
      text: "Olá! 👋 Pergunte algo sobre hipertrofia, biomecânica ou contração muscular."
    }
  ])

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

    <div className="fixed bottom-6 right-6 z-50">

      {/* BOTÃO FLUTUANTE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-7 rounded-full shadow-xl transition-all hover:scale-110"
        >
          <SiChatbot size={22}/>
        </button>
      )}

      {/* CHAT */}
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-white shadow-2xl rounded-2xl p-4 border border-gray-200"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">

              <h3 className="font-bold text-lg text-muted-foreground flex items-center gap-2">
                <SiChatbot />
                MyoLab Bot
              </h3>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <IoChevronDown size={22}/>
              </button>

            </div>

            {/* MENSAGENS */}
            <div className="h-64 overflow-y-auto mb-3 text-sm space-y-3">

              {messages.map((msg, i) => (

                <div
                  key={i}
                  className={`flex items-end gap-2 ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {msg.type === "bot" && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                      <SiChatbot size={16}/>
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 text-gray-800"
                    }`}
                  >
                    {msg.text}

                    {msg.reference && (
                      <div className="text-xs text-gray-500 mt-1">
                        📚 {msg.reference}
                      </div>
                    )}
                  </div>

                  {msg.type === "user" && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white">
                      <FaUser size={14}/>
                    </div>
                  )}

                </div>

              ))}

            </div>

            {/* INPUT */}
            <div className="flex gap-2">

              <input
                className="border rounded-full px-3 py-2 flex-1 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo..."
              />

              <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-full"
              >
                Enviar
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  )
}