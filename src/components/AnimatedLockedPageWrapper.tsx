import AnimatedLockedOverlay from "./AnimatedLockedOverlay";

const AnimatedLockedPageWrapper = ({ path, children }: { path: string; children: React.ReactNode }) => {
  const lockedPages: Record<string, boolean> = {
    "/avancado": true,
    "/referencias": true,
    "/biomecanica": true,
    // Adicione outras páginas bloqueadas aqui
  };

  const isLocked = lockedPages[path];

  return (
    <div className="relative">
      {/* Aplica blur suave somente se bloqueado */}
      <div className={`${isLocked ? "filter blur-sm pointer-events-none" : ""}`}>
        {children}
      </div>

      {/* Overlay animado */}
      {isLocked && <AnimatedLockedOverlay />}
    </div>
  );
};

export default AnimatedLockedPageWrapper;