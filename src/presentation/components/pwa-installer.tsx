"use client";

import { useEffect, useState } from "react";
import { Button } from "@/presentation/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installStatus, setInstallStatus] = useState("Instal·lació no disponible");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        setInstallStatus("No s'ha pogut registrar el service worker");
      });
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setInstallStatus("Instal·lació disponible");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

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
