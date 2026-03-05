import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import ExpandableCard from "@/components/ExpandableCard";
import ForceCurveChart from "@/components/ForceCurveChart";
import { Settings, Scaling, Activity, TrendingUp, Dumbbell } from "lucide-react";

const AvancadoPage = () => {
  return (
    <div className="py-16">
      <section className="section-container py-12">
        <SectionHeader
          badge="Conteúdo Avançado"
          title="Conceitos Avançados de Biomecânica"
          description="Aprofunde-se em conceitos que conectam a biomecânica com a otimização da hipertrofia."
        />
      </section>

      {/* Force Curve */}
      <section className="section-container pb-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ForceCurveChart />
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="section-container max-w-3xl space-y-4">
          <ExpandableCard
            title="Curva de Resistência dos Exercícios"
            summary="A resistência varia ao longo do ROM dependendo do equipamento."
            icon={<Settings className="w-5 h-5" />}
          >
            <p>Cada exercício tem uma "curva de resistência" — como a dificuldade muda ao longo da amplitude. Com pesos livres, a resistência é determinada pela gravidade e pelo braço de momento articular, criando picos e vales de tensão. Máquinas e cabos podem alterar essa curva, distribuindo a tensão de forma mais uniforme ou enfatizando diferentes porções do ROM.</p>
          </ExpandableCard>

          <ExpandableCard
            title="Máquinas vs Pesos Livres"
            summary="Cada modalidade oferece vantagens biomecânicas distintas."
            icon={<Dumbbell className="w-5 h-5" />}
          >
            <p><strong>Pesos livres:</strong> Exigem estabilização multiplanar, recrutam mais musculatura sinergista, mas a resistência é limitada pela gravidade (vetor vertical). A curva de resistência segue o braço de momento gravitacional.</p>
            <p className="mt-2"><strong>Máquinas:</strong> Permitem isolar melhor o músculo-alvo, podem usar cames excêntricos para modificar a curva de resistência, e são mais seguras para treinar próximo à falha. Ideais para enfatizar posições específicas do ROM.</p>
          </ExpandableCard>

          <ExpandableCard
            title="Momento de Força nas Articulações"
            summary="O torque articular determina a demanda muscular real."
            icon={<Scaling className="w-5 h-5" />}
          >
            <p>O momento de força (torque) é o produto da força pela distância perpendicular ao eixo de rotação. Em exercícios multiarticulares, cada articulação tem seu próprio momento, e a distribuição de carga entre os músculos depende desses momentos relativos.</p>
            <p className="mt-2">Por exemplo, no agachamento: inclinar mais o tronco aumenta o momento no quadril (mais glúteo/isquiotibiais), enquanto manter o tronco mais ereto aumenta o momento no joelho (mais quadríceps).</p>
          </ExpandableCard>

          <ExpandableCard
            title="Relação Comprimento-Tensão"
            summary="O sarcômero tem um comprimento ideal para produção máxima de força."
            icon={<Activity className="w-5 h-5" />}
          >
            <p>A relação comprimento-tensão descreve como a força isométrica máxima varia com o comprimento do sarcômero. No comprimento ótimo (~2.0-2.2 μm), há sobreposição máxima entre actina e miosina, permitindo o maior número de pontes cruzadas.</p>
            <p className="mt-2">Em comprimentos menores, há interferência por sobreposição excessiva. Em comprimentos maiores, há menos sobreposição — mas pesquisas recentes sugerem que treinar nessa zona alongada pode gerar adaptações hipertróficas únicas.</p>
          </ExpandableCard>

          <ExpandableCard
            title="Hipertrofia em Posição Alongada"
            summary="Evidências crescentes suportam o treino em comprimento muscular longo."
            icon={<TrendingUp className="w-5 h-5" />}
          >
            <p>Estudos de Milo Wolf e colaboradores demonstram que exercícios que desafiam o músculo em posição alongada podem gerar hipertrofia superior. Os mecanismos propostos incluem:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Maior ativação da titina como mecanossensor</li>
              <li>Maior estresse mecânico por fibra (menos sobreposição = menos pontes ativas = mais estresse por ponte)</li>
              <li>Possível adição de sarcômeros em série como adaptação ao treino em comprimento longo</li>
              <li>Maior dano muscular seletivo nas fibras mais solicitadas</li>
            </ul>
          </ExpandableCard>
        </div>
      </section>
    </div>
  );
};

export default AvancadoPage;
