import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Move,
  Ruler,
  ArrowRight,
  Lightbulb,
  FlaskConical,
  Target,
  Dumbbell
} from "lucide-react";

import SectionHeader from "@/components/SectionHeader";
import ChatBot from "@/components/ChatBot";
import ChatNotification from "@/components/ChatNotification";
import AnimatedArrow from "@/components/AnimatedArrow";

import mascot from "@/assets/mascotao-preview.png";

const pillars = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Tensão Mecânica",
    desc: "O principal estímulo hipertrófico, gerado quando o músculo produz força contra resistência.",
    link: "/ciencia",
  },
  {
    icon: <Move className="w-6 h-6" />,
    title: "Biomecânica",
    desc: "Ângulo articular, vetores de força e execução mudam completamente o estímulo muscular.",
    link: "/biomecanica",
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Amplitude",
    desc: "Treinar em posições alongadas pode aumentar significativamente a hipertrofia.",
    link: "/amplitude",
  },
];

const curiosities = [
  {
    icon: <FlaskConical className="w-5 h-5" />,
    text: "O sarcômero mede cerca de 2–2.5 μm e é a menor unidade funcional do músculo."
  },
  {
    icon: <Target className="w-5 h-5" />,
    text: "A proteína titina atua como sensor mecânico durante o alongamento muscular."
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    text: "Hipertrofia pode ser regional — diferentes exercícios estimulam regiões diferentes do músculo."
  }
];

const stats = [
  { label: "Unidades Motoras", value: "100k+" },
  { label: "Sarcômeros por Fibra", value: "10.000+" },
  { label: "Tempo de Contração", value: "5 ms" },
];

const Index = () => {
  return (
    <div>

      {/* HERO */}

      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >

        {/* Mascote */}

        <img
          src={mascot}
          alt="MyoLab Mascot"
          className="
          absolute
          right-[-120px]
          top-[-20px]
          w-[900px]
          opacity-60
          pointer-events-none
          select-none
          z-0
          "
        />

        {/* Glow */}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_55%/0.15),transparent_70%)]" />

        <div className="section-container relative py-28 z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >

            <span className="info-badge mb-6 inline-block">
              Plataforma Científica de Hipertrofia
            </span>

            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
              A ciência por trás do{" "}
              <span className="gradient-text">
                crescimento muscular
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Entenda como biomecânica, tensão mecânica e amplitude de movimento
              determinam o estímulo hipertrófico. Tudo baseado em literatura
              científica moderna.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/ciencia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Explorar a Ciência
                <AnimatedArrow size={16}/>
              </Link>

              <Link
                to="/maquinas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-secondary hover:bg-secondary/70 text-sm"
              >
                Biblioteca de Exercícios
                <Dumbbell size={16}/>
              </Link>

            </div>

          </motion.div>


          {/* Stats */}

          <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl">

            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass-card text-center p-4 rounded-xl"
              >

                <p className="text-2xl font-bold text-primary">
                  {s.value}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>


      {/* CHATBOT */}

      <ChatNotification />
      <ChatBot />


      {/* PILLARS */}

      <section className="section-container py-20">

        <SectionHeader
          badge="Fundamentos"
          title="Os Pilares da Hipertrofia"
          description="Três princípios fundamentais explicam a maior parte das adaptações musculares ao treinamento."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >

              <Link
                to={p.link}
                className="pillar-card block group"
              >

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition">
                  {p.icon}
                </div>

                <h3 className="font-display font-semibold text-foreground mb-2">
                  {p.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {p.desc}
                </p>

                <span className="text-primary text-sm flex items-center gap-1">
                  Explorar
                  <ArrowRight size={16}/>
                </span>

              </Link>

            </motion.div>
          ))}

        </div>

      </section>


      {/* EXERCISE LIBRARY CTA */}

      <section className="bg-secondary/30 py-20">

        <div className="section-container text-center max-w-3xl">

          <SectionHeader
            badge="Exercícios"
            title="Biblioteca Científica de Exercícios"
            description="Explore exercícios analisados pela biomecânica, vetores de força e estímulo muscular."
          />

          <Link
            to="/maquinas"
            className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Ver Exercícios
            <ArrowRight size={18}/>
          </Link>

        </div>

      </section>


      {/* CURIOSITIES */}

      <section className="section-container py-20">

        <SectionHeader
          badge="Curiosidades"
          title="Fatos Fascinantes da Fisiologia Muscular"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">

          {curiosities.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >

              <div className="text-primary mb-3">
                {c.icon}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.text}
              </p>

            </motion.div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default Index;