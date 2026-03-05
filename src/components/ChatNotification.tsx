import { motion } from "framer-motion"
import { SiChatbot } from "react-icons/si"

export default function ChatNotification() {

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="
      fixed
      bottom-28
      right-6
      z-40
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        bg-black/70
        backdrop-blur-lg
        border border-cyan-400/20
        text-white
        px-4
        py-3
        rounded-xl
        shadow-lg
        "
      >

        <SiChatbot className="text-cyan-400"/>

        <span className="text-sm">
          Pergunte algo para o <b>MyoLab AI</b>
        </span>

      </div>

    </motion.div>

  )

}