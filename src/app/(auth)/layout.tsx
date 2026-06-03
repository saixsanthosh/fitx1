export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,22,12,0.06)_0%,transparent_50%)]" />
      <div className="relative z-10 w-full max-w-md px-4 py-8">{children}</div>
    </div>
  );
}
