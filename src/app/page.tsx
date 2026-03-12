import { FeatureService } from "@/application/features/feature-service";
import { BrowserFeatureGateway } from "@/infrastructure/browser/browser-feature-gateway";
import { FeatureCard } from "@/presentation/components/feature-card";
import { PwaInstaller } from "@/presentation/components/pwa-installer";

const featureService = new FeatureService(new BrowserFeatureGateway());

export default function HomePage() {
  const features = featureService.list();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">PWA Next.js Template</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Arquitectura DDD + SOLID amb catàleg de funcionalitats del navegador per testejar permisos i comportament.
        </p>
      </header>

      <PwaInstaller />

      <section className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard key={feature.key} feature={feature} />
        ))}
      </section>
    </main>
  );
}
