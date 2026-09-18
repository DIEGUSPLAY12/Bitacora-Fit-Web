export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      {/* ── Grid Pattern ── */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ── Ambient Glows ── */}
      {/* Top Left Glow */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px]"
        aria-hidden="true"
      />
      
      {/* Bottom Right Glow */}
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px]"
        aria-hidden="true"
      />
      
      {/* Center Subtle Glow */}
      <div 
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] rounded-full bg-white/[0.02] blur-[150px]"
        aria-hidden="true"
      />
    </div>
  );
}
