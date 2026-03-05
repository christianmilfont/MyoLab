import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { BookOpen, GraduationCap } from "lucide-react";

const articles = [
  {
    category: "Hipertrofia e Tensão Mecânica",
    items: [
      {
        author: "Brad Schoenfeld",
        title: "The Mechanisms of Muscle Hypertrophy and Their Application to Resistance Training",
        journal: "Journal of Strength and Conditioning Research (2010)",
        desc: "Um dos artigos mais citados sobre mecanismos da hipertrofia. Explica tensão mecânica, estresse metabólico e dano muscular.",
      },
    ],
  },
  {
    category: "Hipertrofia em Posição Alongada",
    items: [
      {
        author: "Milo Wolf",
        title: "Resistance Training at Long Muscle Lengths Enhances Muscle Hypertrophy",
        journal: "",
        desc: "Mostra evidências de que treinar em posição alongada pode gerar mais crescimento muscular.",
      },
      {
        author: "José Antonio",
        title: "Estudos clássicos sobre treinamento em posição alongada",
        journal: "",
        desc: "Estudos clássicos sobre treinamento em posição alongada em animais e humanos.",
      },
    ],
  },
];

const books = [
  {
    title: "Skeletal Muscle Structure and Function",
    author: "Richard Lieber",
    topics: ["Sarcômero", "Relação comprimento-tensão", "Arquitetura muscular"],
  },
  {
    title: "Physiology of Sport and Exercise",
    author: "W. Larry Kenney",
    topics: ["Fisiologia do exercício", "Adaptações neuromusculares"],
  },
  {
    title: "Skeletal Muscle: Form and Function",
    author: "Brian MacIntosh",
    topics: ["Actina", "Miosina", "Sarcômeros", "Produção de força"],
  },
];

const concepts = [
  "Interação entre actina e miosina",
  "Formação de pontes cruzadas",
  "Tensão mecânica",
  "Hipertrofia em posição alongada",
  "Relação comprimento-tensão do músculo",
  "Biomecânica dos exercícios",
];

const ReferenciasPage = () => {
  return (
    <div className="py-16">
      <section className="section-container py-12">
        <SectionHeader
          badge="Base Científica"
          title="Referências Científicas"
          description="Os artigos, revisões e livros que fundamentam o conteúdo do MyoLab."
        />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto -mt-6 mb-8 text-sm leading-relaxed">
          O objetivo do MyoLab é traduzir conhecimento científico sobre hipertrofia muscular, biomecânica e fisiologia do exercício em informações práticas e acessíveis.
        </p>

        {/* Concepts covered */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-sm text-muted-foreground mb-3 text-center">Todos os conceitos são baseados em literatura revisada por pares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {concepts.map(c => (
              <span key={c} className="info-badge">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-secondary/30 py-16">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-bold text-foreground">Artigos Científicos</h3>
          </div>
          <div className="space-y-8">
            {articles.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">{cat.category}</h4>
                <div className="space-y-4">
                  {cat.items.map((item, j) => (
                    <div key={j} className="pillar-card">
                      <p className="text-xs text-muted-foreground mb-1">{item.author}</p>
                      <h5 className="font-medium text-foreground mb-1">{item.title}</h5>
                      {item.journal && <p className="text-xs text-accent italic mb-2">{item.journal}</p>}
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="section-container py-16 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h3 className="font-display text-xl font-bold text-foreground">Livros de Referência</h3>
        </div>
        <div className="space-y-4">
          {books.map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="pillar-card"
            >
              <h4 className="font-medium text-foreground">{book.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">por {book.author}</p>
              <div className="flex flex-wrap gap-2">
                {book.topics.map(t => (
                  <span key={t} className="info-badge">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReferenciasPage;
