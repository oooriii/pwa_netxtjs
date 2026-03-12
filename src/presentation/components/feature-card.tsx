"use client";

import { useEffect, useMemo, useState } from "react";

import { Bell, Camera, Circle, LocateFixed, Play, ShieldCheck } from "lucide-react";

import { Feature } from "@/domain/features/feature";
import { FeatureService } from "@/application/features/feature-service";
import { BrowserFeatureGateway } from "@/infrastructure/browser/browser-feature-gateway";
import { Button } from "@/presentation/components/ui/button";

const featureService = new FeatureService(new BrowserFeatureGateway());

type Status = "idle" | "working" | "done";

const iconByFeature = {
  notifications: Bell,
  camera: Camera,
  geolocation: LocateFixed,
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Encara no provat");

  useEffect(() => {
    featureService.checkSupport(feature.key).then(setSupported);
  }, [feature.key]);

  const badge = useMemo(() => {
    if (!supported) return "No suportat";
    if (status === "working") return "Executant...";
    if (status === "done") return "Test completat";
    return "Preparat";
  }, [status, supported]);

  const FeatureIcon = iconByFeature[feature.key];

  const handleEnable = async () => {
    setStatus("working");
    const permission = await featureService.enable(feature.key);
    setMessage(`Permís: ${permission}`);
    setStatus("done");
  };

  const handleTest = async () => {
    setStatus("working");
    const response = await featureService.runTest(feature.key);
    setMessage(response);
    setStatus("done");
  };

  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 shadow-lg shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <FeatureIcon className="h-5 w-5" />
            {feature.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{feature.description}</p>
        </div>
        <span className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1 text-xs">
          <Circle className={`h-2.5 w-2.5 ${supported ? "fill-emerald-400 text-emerald-400" : "fill-red-500 text-red-500"}`} />
          {badge}
        </span>
      </div>

      <p className="mb-4 text-sm text-[var(--foreground)]">{message}</p>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleEnable} disabled={!supported || status === "working"}>
          <ShieldCheck className="mr-1 h-4 w-4" /> Activar
        </Button>
        <Button size="sm" onClick={handleTest} disabled={!supported || status === "working"}>
          <Play className="mr-1 h-4 w-4" /> Provar

        </Button>
      </div>
    </article>
  );
}
