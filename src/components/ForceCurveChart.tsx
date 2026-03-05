import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { rom: "0°", freeWeights: 30, machine: 50, cable: 45 },
  { rom: "30°", freeWeights: 60, machine: 55, cable: 50 },
  { rom: "60°", freeWeights: 85, machine: 60, cable: 55 },
  { rom: "90°", freeWeights: 100, machine: 70, cable: 60 },
  { rom: "120°", freeWeights: 80, machine: 80, cable: 65 },
  { rom: "150°", freeWeights: 50, machine: 90, cable: 70 },
  { rom: "180°", freeWeights: 25, machine: 95, cable: 75 },
];

const ForceCurveChart = () => (
  <div className="diagram-container">
    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
      Curva de Resistência por Tipo de Equipamento
    </h4>
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
        <XAxis dataKey="rom" stroke="hsl(215 15% 55%)" fontSize={12} />
        <YAxis stroke="hsl(215 15% 55%)" fontSize={12} unit="%" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(220 18% 10%)",
            border: "1px solid hsl(220 15% 18%)",
            borderRadius: "8px",
            color: "hsl(210 20% 92%)",
            fontSize: 12,
          }}
        />
        <Area type="monotone" dataKey="freeWeights" name="Pesos Livres" stroke="hsl(210 100% 55%)" fill="hsl(210 100% 55% / 0.15)" strokeWidth={2} />
        <Area type="monotone" dataKey="machine" name="Máquinas" stroke="hsl(190 80% 50%)" fill="hsl(190 80% 50% / 0.15)" strokeWidth={2} />
        <Area type="monotone" dataKey="cable" name="Cabos" stroke="hsl(150 60% 45%)" fill="hsl(150 60% 45% / 0.15)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
    <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground justify-center">
      <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-primary" /> Pesos Livres</div>
      <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-accent" /> Máquinas</div>
      <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-success" /> Cabos</div>
    </div>
  </div>
);

export default ForceCurveChart;
