import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchQuestions } from "../lib/searchQuestions";
import { SiChatbot } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<any[]>([
    {
      type: "bot",
      text: "Olá! 👋 Pergunte algo sobre hipertrofia, biomecânica ou contração muscular."
    }
  ]);

  const [hasNotification, setHasNotification] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

function typeMessage(text: string, reference?: string) {
  const safeText = (text || "Desculpe, não encontrei uma resposta.").trim();
  if (!safeText) {
    setMessages(prev => [
      ...prev,
      { type: "bot", text: "Desculpe, não encontrei uma resposta.", reference }
    ]);
    return;
  }

  const words = safeText.split(/\s+/);
  let index = 0;
  setIsTyping(true);

  const interval = setInterval(() => {
    if (index >= words.length) {
      clearInterval(interval);

      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        updated[lastIndex].type = "bot";
        updated[lastIndex].reference = reference;
        return updated;
      });

      setIsTyping(false);
      return;
    }

    const word = words[index];

    setMessages(prev => {
      const last = prev[prev.length - 1];
      const updated = [...prev];

      // só concatena se word existir
      if (word) {
        if (last?.type === "bot-stream") {
          updated[updated.length - 1].text += (updated[updated.length - 1].text ? " " : "") + word;
        } else {
          updated.push({ type: "bot-stream", text: word });
        }
      }

      return updated;
    });

    index++; // sempre avança, mesmo se word for vazio
  }, 50);
}

  function handleSend() {
    if (!input.trim()) return;

    const result = searchQuestions(input.trim());

    setMessages(prev => [
      ...prev,
      { type: "user", text: input.trim() }
    ]);

    setInput("");

    setTimeout(() => {
      typeMessage(result?.answer, result?.reference);
    }, 300); // mais rápido, mas você pode ajustar
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* BOTÃO */}
      {!open && (
        <div className="relative">
          <motion.button
            onClick={() => {
              setOpen(true);
              setHasNotification(false);
            }}
            whileHover={{ scale: 1.1 }}
            className="p-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/40"
          >
            <SiChatbot size={22} color="white" />
          </motion.button>

          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
          )}
        </div>
      )}

      {/* CHAT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-96 bg-black/70 backdrop-blur-xl border border-cyan-400/20 shadow-2xl rounded-2xl p-4 text-white"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <SiChatbot />
                MyoLab AI
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="h-72 overflow-y-auto mb-3 text-sm space-y-4 pr-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.type !== "user" && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 text-white">
                      <SiChatbot size={16} />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white/10"
                    }`}
                  >
                    {msg.text}
                    {msg.reference && (
                      <div className="text-xs text-cyan-300 mt-1">
                        📚 {msg.reference}
                      </div>
                    )}
                  </div>

                  {msg.type === "user" && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white">
                      <FaUser size={14} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="text-xs text-cyan-300">
                  MyoLab AI está pensando...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="flex gap-2">
              <input
                className="flex-1 bg-black/40 border border-cyan-400/20 rounded-full px-3 py-2 text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Pergunte algo..."
                onKeyDown={e => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 rounded-full text-white"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}