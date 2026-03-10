import { useState, useEffect, useRef } from "react";

import { searchQuestions } from "../lib/ia/searchQuestions";
import { getWorkoutSuggestion } from "../lib/ia/aiTrainer";
import { generateWorkout } from "../lib/ia/coachGenerator";

import { SiChatbot } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function ChatBot() {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [coachStep, setCoachStep] = useState<null | "goal" | "days">(null);
  const [goal, setGoal] = useState<string>("");

  const [hasNotification, setHasNotification] = useState(true);

  const [messages, setMessages] = useState<any[]>([
    {
      type: "bot",
      text: "Olá! Posso responder dúvidas científicas ou montar um treino."
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function addBotMessage(text: string) {
    setMessages(prev => [...prev, { type: "bot", text }]);
  }

  function typeMessage(text: string) {

    const words = text.split(" ");
    let index = 0;

    setIsTyping(true);

    const interval = setInterval(() => {

      if (index >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
        return;
      }

      const word = words[index];

      setMessages(prev => {

        const last = prev[prev.length - 1];
        const updated = [...prev];

        if (last?.type === "bot-stream") {
          updated[updated.length - 1].text += " " + word;
        } else {
          updated.push({ type: "bot-stream", text: word });
        }

        return updated;

      });

      index++;

    }, 35);
  }

  function handleSend() {

    if (!input.trim()) return;

    const text = input.trim().toLowerCase();

    setMessages(prev => [...prev, { type: "user", text: input }]);

    setInput("");

    if (text.includes("montar treino") || text.includes("criar treino")) {
      addBotMessage("Qual seu objetivo?");
      setCoachStep("goal");
      return;
    }

    const workout = getWorkoutSuggestion(text);

    if (workout) {

      const answer = `
${workout.title}

• ${workout.exercises.join("\n• ")}

💡 ${workout.tip}
`;

      typeMessage(answer);
      return;

    }

    const result = searchQuestions(text);

    typeMessage(result?.answer || "Não encontrei uma resposta para isso.");

  }

  function selectGoal(g: string) {

    setGoal(g);

    setMessages(prev => [
      ...prev,
      { type: "user", text: g }
    ]);

    addBotMessage("Quantos dias por semana você pretende treinar?");

    setCoachStep("days");
  }

  function selectDays(d: number) {

    setMessages(prev => [
      ...prev,
      { type: "user", text: `${d} dias` }
    ]);

    const workout = generateWorkout(goal, d);

    typeMessage(workout);

    setCoachStep(null);
  }

  return (

    <div className="fixed bottom-6 right-6 z-50">

      {/* BOTÃO FECHADO */}

      {!open && (

        <div className="relative">

          <button
            onClick={() => {
              setOpen(true);
              setHasNotification(false);
            }}
            className="p-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg"
          >
            <SiChatbot size={22} color="white" />
          </button>

          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black"/>
          )}

        </div>

      )}

      {/* CHAT */}

      {open && (

        <div className="w-96 bg-black/80 backdrop-blur-xl border border-cyan-400/20 shadow-2xl rounded-2xl p-4 text-white">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-3">

            <h3 className="font-semibold flex items-center gap-2">
              <SiChatbot />
              MyoLab AI
            </h3>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <IoClose size={20} />
            </button>

          </div>

          {/* MESSAGES */}

          <div className="h-72 overflow-y-auto mb-3 text-sm space-y-4 pr-2">

            {messages.map((msg, i) => (

              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.type === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {msg.type !== "user" && (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-cyan-500">
                    <SiChatbot size={13}/>
                  </div>
                )}

                <div
                  className={`max-w-[70%] px-4 py-2 rounded-xl ${
                    msg.type === "user"
                      ? "bg-blue-500"
                      : "bg-white/10"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.type === "user" && (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-500">
                    <FaUser size={12}/>
                  </div>
                )}

              </div>

            ))}

            {isTyping && (
              <div className="text-xs text-cyan-300">
                MyoLab AI está pensando...
              </div>
            )}

            <div ref={bottomRef}/>

          </div>

          {/* COACH MODE */}

          {coachStep === "goal" && (

            <div className="flex gap-2 mb-3">

              {["hipertrofia","força","resistência"].map(g => (

                <button
                  key={g}
                  onClick={() => selectGoal(g)}
                  className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20"
                >
                  {g}
                </button>

              ))}

            </div>

          )}

          {coachStep === "days" && (

            <div className="flex gap-2 mb-3">

              {[3,4,5].map(d => (

                <button
                  key={d}
                  onClick={() => selectDays(d)}
                  className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20"
                >
                  {d} dias
                </button>

              ))}

            </div>

          )}

          {/* INPUT */}

          <div className="flex gap-2">

            <input
              className="flex-1 bg-black/40 border border-cyan-400/20 rounded-full px-3 py-2 text-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Pergunte algo ou peça um treino..."
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 rounded-full text-sm"
            >
              Enviar
            </button>

          </div>

        </div>

      )}

    </div>

  );

}