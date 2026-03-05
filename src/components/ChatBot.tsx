import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { searchQuestions } from "../lib/searchQuestions"

import { SiChatbot } from "react-icons/si"
import { FaUser } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

export default function ChatBot() {

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)

  const [messages, setMessages] = useState<any[]>([
    {
      type: "bot",
      text: "Olá! 👋 Pergunte algo sobre hipertrofia, biomecânica ou contração muscular."
    }
  ])

  async function streamText(text: string) {

    setTyping(true)

    const words = text.split(" ")

    let current = ""

    for (let i = 0; i < words.length; i++) {

      current += words[i] + " "

      setMessages((prev) => {

        const updated = [...prev]

        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: current
        }

        return updated
      })

      await new Promise(r => setTimeout(r, 40))
    }

    setTyping(false)
  }

  async function handleSend() {

    if (!input) return

    const question = input

    setMessages(prev => [
      ...prev,
      { type: "user", text: question },
      { type: "bot", text: "" }
    ])

    setInput("")

    const result = searchQuestions(question)

    await streamText(result.answer)
  }

  return (

    <div className="fixed bottom-6 right-6 z-50">

      {/* BOTÃO FLUTUANTE */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
          p-4 rounded-full
          bg-gradient-to-r from-blue-500 to-cyan-400
          shadow-lg shadow-cyan-500/30
          hover:scale-110
          transition
          "
        >
          <SiChatbot size={22} color="white"/>
        </button>
      )}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3 }}
            className="
            w-[340px]
            rounded-2xl
            border border-white/10
            backdrop-blur-xl
            bg-black/60
            shadow-2xl shadow-cyan-500/10
            p-4
            "
          >

            {/* HEADER */}

            <div className="flex justify-between items-center mb-3">

              <h3 className="font-bold text-white flex items-center gap-2">

                <SiChatbot className="text-cyan-400"/>

                MyoLab AI

              </h3>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <IoClose size={20}/>
              </button>

            </div>

            {/* CHAT */}

            <div className="h-72 overflow-y-auto space-y-4 mb-3 text-sm">

              {messages.map((msg, i) => (

                <div
                  key={i}
                  className={`flex gap-2 ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {msg.type === "bot" && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-cyan-500 text-white">
                      <SiChatbot size={14}/>
                    </div>
                  )}

                  <div
                    className={`
                    max-w-[70%]
                    px-4 py-2
                    rounded-2xl
                    ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-200 backdrop-blur"
                    }
                    `}
                  >

                    {msg.text}

                    {typing && i === messages.length - 1 && (
                      <span className="ml-1 animate-pulse text-cyan-400">
                        ▌
                      </span>
                    )}

                  </div>

                  {msg.type === "user" && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500 text-white">
                      <FaUser size={12}/>
                    </div>
                  )}

                </div>

              ))}

            </div>

            {/* INPUT */}

            <div className="flex gap-2">

              <input
                className="
                flex-1
                bg-white/10
                border border-white/10
                rounded-full
                px-3 py-2
                text-sm
                text-white
                placeholder:text-gray-400
                focus:outline-none
                "
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo..."
              />

              <button
                onClick={handleSend}
                className="
                px-4
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                text-white
                hover:opacity-90
                "
              >
                →
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  )
}