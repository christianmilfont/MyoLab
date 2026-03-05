import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Move, Ruler, ArrowRight, Lightbulb, FlaskConical, Target } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const pillars = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Resistência Mecânica",
    desc: "Como a tensão mecânica é o principal estímulo para hipertrofia — e como maximizá-la.",
    link: "/ciencia",
  },
  {
    icon: <Move className="w-6 h-6" />,
    title: "Biomecânica dos Movimentos",
    desc: "Padrões de movimento, vetores de força e como a técnica muda o estímulo muscular.",
    link: "/biomecanica",
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Amplitude e Alongamento sob Carga",
    desc: "Por que treinar em maior amplitude gera mais hipertrofia — baseado em evidências.",
    link: "/amplitude",
  },
];

const myths = [
  {
    myth: "Mais séries = mais hipertrofia sempre",
    science: "O volume ideal depende da capacidade de recuperação individual. Excesso de volume pode prejudicar a adaptação.",
  },
  {
    myth: "A contração máxima no pico é o que importa",
    science: "A tensão mecânica na posição alongada parece ser ainda mais relevante para hipertrofia, segundo estudos recentes.",
  },
  {
    myth: "Máquinas são inferiores a pesos livres",
    science: "Máquinas podem oferecer curvas de resistência mais favoráveis para determinados músculos.",
  },
];

const curiosities = [
  { icon: <FlaskConical className="w-5 h-5" />, text: "O sarcômero é a menor unidade funcional do músculo, com apenas ~2.5 μm de comprimento." },
  { icon: <Target className="w-5 h-5" />, text: "A tensão mecânica ativa mecanossensores (como a titina) que sinalizam para síntese proteica." },
  { icon: <Lightbulb className="w-5 h-5" />, text: "Pesquisas recentes mostram que a hipertrofia pode ser regional — diferentes porções do músculo respondem a exercícios diferentes." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_55%/0.08),transparent_70%)]" />
        <div className="section-container relative py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="info-badge mb-6 inline-block">Biomecânica & Hipertrofia</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
              A ciência por trás do{" "}
              <span className="gradient-text">crescimento muscular</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Entenda como a tensão mecânica, a biomecânica dos exercícios e a amplitude de
              movimento se combinam para gerar hipertrofia. Conteúdo baseado em evidências
              científicas.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/ciencia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Explorar a Ciência <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/interativo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors border border-border"
              >
                Simulador Interativo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Hypertrophy Works */}
      <section className="section-container py-20">
        <SectionHeader
          badge="Fundamentos"
          title="Como a Hipertrofia Muscular Acontece?"
          description="A hipertrofia é o aumento da seção transversal das fibras musculares, resultado da acumulação de proteínas contráteis (actina e miosina) em resposta ao estímulo mecânico."
        />
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { title: "Estímulo Mecânico", desc: "O músculo é submetido a tensão mecânica durante o exercício resistido." },
            { title: "Sinalização Celular", desc: "Mecanossensores ativam vias de sinalização como mTOR, estimulando síntese proteica." },
            { title: "Adaptação Estrutural", desc: "Novas proteínas são adicionadas aos sarcômeros, aumentando o tamanho da fibra muscular." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="pillar-card text-center"
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-display font-bold mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mechanical Tension */}
      <section className="bg-secondary/30 py-20">
        <div className="section-container">
          <SectionHeader
            badge="Conceito Central"
            title="Tensão Mecânica: O Principal Driver da Hipertrofia"
            description="Dentre os mecanismos propostos para hipertrofia (tensão mecânica, estresse metabólico e dano muscular), a tensão mecânica é considerada o estímulo primário."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="pillar-card">
              <h3 className="font-display font-semibold text-foreground mb-3">O que é tensão mecânica?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                É a força aplicada ao músculo durante a contração. Quando o músculo gera força contra uma
                resistência externa, as fibras musculares experimentam tensão mecânica. Essa tensão é
                detectada por mecanossensores na membrana celular, que ativam cascatas de sinalização
                intracelular levando à síntese de novas proteínas contráteis.
              </p>
            </div>
            <div className="pillar-card">
              <h3 className="font-display font-semibold text-foreground mb-3">Por que cargas moderadas a altas?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para maximizar a tensão mecânica, é necessário recrutar o maior número possível de unidades
                motoras, especialmente as de alto limiar (fibras tipo II). Cargas moderadas a altas (acima de
                ~60% de 1RM) ou séries levadas próximo à falha garantem o recrutamento progressivo dessas
                unidades motoras, maximizando o estímulo hipertrófico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-container py-20">
        <SectionHeader
          badge="Explore"
          title="Os Três Pilares do MyoLab"
          description="Navegue pelos conceitos fundamentais que conectam ciência e prática na musculação."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {pillars.map((p) => (
            <motion.div key={p.title} variants={item}>
              <Link to={p.link} className="pillar-card block h-full group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explorar <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Myths vs Science */}
      <section className="bg-secondary/30 py-20">
        <div className="section-container">
          <SectionHeader badge="Mitos vs Ciência" title="O Que a Ciência Realmente Diz" />
          <div className="space-y-6 max-w-3xl mx-auto">
            {myths.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="myth-card myth">
                  <p className="text-xs font-medium text-destructive uppercase tracking-wider mb-1">Mito</p>
                  <p className="text-sm text-foreground">{m.myth}</p>
                </div>
                <div className="myth-card science">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Ciência</p>
                  <p className="text-sm text-foreground">{m.science}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curiosities */}
      <section className="section-container py-20">
        <SectionHeader badge="Curiosidades" title="Fatos Científicos Fascinantes" />
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {curiosities.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="text-accent mb-3">{c.icon}</div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
