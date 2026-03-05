import { useState } from "react";
import { motion } from "framer-motion";
import { Microscope, Atom, Zap, BookOpen } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import SarcomereVisual from "@/components/SarcomereVisual";
import ExpandableCard from "@/components/ExpandableCard";

const CienciaPage = () => {
  const [contracted, setContracted] = useState(false);

  return (
    <div className="py-16">
      {/* Hero */}
      <section className="section-container py-12">
        <SectionHeader
          badge="Fisiologia"
          title="A Ciência da Hipertrofia Muscular"
          description="Entenda os mecanismos celulares e moleculares que levam ao crescimento muscular."
        />
      </section>

      {/* Cross-bridges */}
      <section className="bg-secondary/30 py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Pontes Cruzadas: Actina e Miosina
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A contração muscular ocorre pela interação entre duas proteínas: <strong className="text-foreground">actina</strong> (filamento fino) e <strong className="text-foreground">miosina</strong> (filamento grosso). As cabeças de miosina se ligam aos sítios ativos da actina, formando as chamadas <strong className="text-foreground">pontes cruzadas</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Através do ciclo de pontes cruzadas (ligação → power stroke → desligamento → re-armação), o filamento de actina é puxado sobre o de miosina, encurtando o sarcômero e gerando força.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A quantidade de pontes cruzadas ativas determina a força produzida. Quanto mais pontes formadas simultaneamente, maior a tensão mecânica na fibra — e maior o estímulo para hipertrofia.
              </p>
              <button
                onClick={() => setContracted(!contracted)}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {contracted ? "Relaxar sarcômero" : "Contrair sarcômero"}
              </button>
            </div>
            <SarcomereVisual contracted={contracted} />
          </div>
        </div>
      </section>

      {/* Force Production */}
      <section className="section-container py-16">
        <SectionHeader
          badge="Produção de Força"
          title="Como o Músculo Produz Força"
          description="A produção de força depende do número de pontes cruzadas ativas e da velocidade da contração."
        />
        <div className="space-y-4 max-w-3xl mx-auto">
          <ExpandableCard
            title="Relação Força-Velocidade"
            summary="Contrações mais lentas permitem maior formação de pontes cruzadas."
            icon={<Zap className="w-5 h-5" />}
          >
            <p>
              Existe uma relação inversa entre a velocidade de contração e a força produzida. Em velocidades baixas, mais cabeças de miosina conseguem se ligar à actina simultaneamente, gerando mais tensão. Por isso, contrações controladas e com cadência adequada são mais eficientes para gerar tensão mecânica.
            </p>
          </ExpandableCard>

          <ExpandableCard
            title="Relação Comprimento-Tensão"
            summary="O sarcômero tem um comprimento ótimo para produção de força."
            icon={<Microscope className="w-5 h-5" />}
          >
            <p>
              O comprimento do sarcômero afeta quantas pontes cruzadas podem se formar. Em comprimentos muito curtos, os filamentos se sobrepõem excessivamente. Em comprimentos muito longos, há pouca sobreposição. O comprimento ótimo permite máxima formação de pontes cruzadas — geralmente em torno de 2.0-2.2 μm.
            </p>
            <p className="mt-3">
              Porém, pesquisas recentes mostram que treinar em posições alongadas (próximas ao comprimento máximo) pode gerar adaptações únicas, incluindo adição de sarcômeros em série.
            </p>
          </ExpandableCard>

          <ExpandableCard
            title="Recrutamento de Unidades Motoras"
            summary="Fibras de alto limiar são as mais responsivas à hipertrofia."
            icon={<Atom className="w-5 h-5" />}
          >
            <p>
              O sistema nervoso recruta unidades motoras seguindo o princípio do tamanho (de Henneman). Unidades motoras pequenas (fibras tipo I) são recrutadas primeiro, seguidas pelas maiores (fibras tipo II) conforme a demanda de força aumenta.
            </p>
            <p className="mt-3">
              As fibras tipo II têm maior potencial hipertrófico. Para recrutá-las, é necessário utilizar cargas suficientemente altas ou levar séries com cargas mais leves próximo à falha concêntrica.
            </p>
          </ExpandableCard>

          <ExpandableCard
            title="Mecanotransdução"
            summary='Como a célula muscular "sente" a tensão mecânica.'
            icon={<BookOpen className="w-5 h-5" />}
          >
            <p>
              A tensão mecânica aplicada à fibra muscular é detectada por proteínas mecanossensoras, como a titina e integrinas na membrana celular. Essas proteínas convertem o sinal mecânico em sinais bioquímicos (mecanotransdução), ativando vias como mTOR e MAPK que estimulam a síntese de proteínas musculares.
            </p>
          </ExpandableCard>
        </div>
      </section>

      {/* Moderate-Heavy Loads */}
      <section className="bg-secondary/30 py-16">
        <div className="section-container max-w-3xl">
          <SectionHeader
            badge="Aplicação Prática"
            title="Por Que Cargas Moderadas a Altas?"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { range: "< 30% 1RM", effect: "Baixo", detail: "Recrutamento insuficiente de fibras tipo II, mesmo próximo à falha." },
              { range: "30–60% 1RM", effect: "Moderado", detail: "Eficaz se levado à falha. Alto volume metabólico." },
              { range: "60–85% 1RM", effect: "Alto", detail: "Zona ótima. Recrutamento amplo com volume mecânico significativo." },
              { range: "> 85% 1RM", effect: "Alto", detail: "Excelente tensão por rep, mas volume total limitado pela fadiga neural." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="pillar-card"
              >
                <div className="text-primary font-display font-bold text-lg mb-1">{item.range}</div>
                <div className={`text-xs font-medium mb-2 ${
                  item.effect === "Alto" ? "text-accent" : item.effect === "Moderado" ? "text-warning" : "text-muted-foreground"
                }`}>
                  Estímulo: {item.effect}
                </div>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CienciaPage;
