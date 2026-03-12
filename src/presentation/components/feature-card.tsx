"use client";

import { useEffect, useMemo, useState } from "react";
import { Feature } from "@/domain/features/feature";
import { FeatureService } from "@/application/features/feature-service";
import { BrowserFeatureGateway } from "@/infrastructure/browser/browser-feature-gateway";
import { Button } from "@/presentation/components/ui/button";

const featureService = new FeatureService(new BrowserFeatureGateway());

type Status = "idle" | "working" | "done";

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
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{feature.description}</p>
        </div>
        <span className="rounded-md bg-slate-800 px-2 py-1 text-xs">{badge}</span>
      </div>

      <p className="mb-4 text-sm text-slate-200">{message}</p>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleEnable} disabled={!supported || status === "working"}>
          Activar
        </Button>
        <Button size="sm" onClick={handleTest} disabled={!supported || status === "working"}>
          Provar
        </Button>
      </div>
    </article>
  );
}
