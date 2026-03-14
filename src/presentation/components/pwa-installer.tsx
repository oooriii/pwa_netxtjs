"use client";

import { useEffect, useState } from "react";
import { Button } from "@/presentation/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installStatus, setInstallStatus] = useState("Comprovant instal·lació...");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) {
      setInstallStatus("App instal·lada (mode standalone)");
      return;
    }

    if (!window.isSecureContext) {
      setInstallStatus("La instal·lació PWA requereix HTTPS o localhost");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      setInstallStatus("Aquest navegador no suporta Service Worker");
      return;
    }

    const swUrl = `${basePath}/sw.js`;
    navigator.serviceWorker
      .register(swUrl, { scope: `${basePath || "/"}/` })
      .then(() => {
        setInstallStatus("Service Worker registrat. Esperant prompt d'instal·lació...");
      })
      .catch(() => {
        setInstallStatus("No s'ha pogut registrar el Service Worker");
      });

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setInstallStatus("Instal·lació disponible");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, [basePath]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    setInstallStatus(
      choiceResult.outcome === "accepted" ? "Instal·lada o acceptada" : "Instal·lació descartada",
    );
    setDeferredPrompt(null);
  };

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
      <h2 className="text-xl font-semibold">Instal·lació PWA</h2>
      <p className="mt-2 text-sm text-slate-300">Estat: {installStatus}</p>
      <Button className="mt-4" onClick={handleInstall} disabled={!deferredPrompt}>
        Instal·lar app
      </Button>
    </div>
  );
}
