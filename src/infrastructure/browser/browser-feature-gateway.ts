import { FeatureGateway } from "@/domain/features/feature-gateway";
import { FeatureKey } from "@/domain/features/feature";

export class BrowserFeatureGateway implements FeatureGateway {
  async isSupported(featureKey: FeatureKey): Promise<boolean> {
    if (typeof window === "undefined") return false;

    switch (featureKey) {
      case "notifications":
        return "Notification" in window;
      case "camera":
        return Boolean(navigator.mediaDevices?.getUserMedia);
      case "geolocation":
        return "geolocation" in navigator;
      default:
        return false;
    }
  }

  async requestPermission(featureKey: FeatureKey): Promise<string> {
    switch (featureKey) {
      case "notifications":
        if (!("Notification" in window)) return "Notificacions no suportades";
        return Notification.requestPermission();
      case "camera":
        return this.requestCameraPermission();
      case "geolocation":
        return this.requestGeolocationPermission();
      default:
        return "Feature desconeguda";
    }
  }

  async test(featureKey: FeatureKey): Promise<string> {
    switch (featureKey) {
      case "notifications":
        return this.testNotification();
      case "camera":
        return this.testCamera();
      case "geolocation":
        return this.testGeolocation();
      default:
        return "Feature desconeguda";
    }
  }

  private async requestCameraPermission(): Promise<string> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      return "granted";
    } catch {
      return "denied";
    }
  }

  private async requestGeolocationPermission(): Promise<string> {
    try {
      await this.getCurrentPosition();
      return "granted";
    } catch {
      return "denied";
    }
  }

  private async testNotification(): Promise<string> {
    if (Notification.permission !== "granted") {
      return "Permís de notificacions no concedit";
    }

    new Notification("PWA Template", {
      body: "Notificació local de prova executada correctament.",
    });

    return "Notificació enviada";
  }

  private async testCamera(): Promise<string> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      return `Càmera validada (${tracks.length} track/s)`;
    } catch {
      return "No s'ha pogut accedir a la càmera";
    }
  }

  private async testGeolocation(): Promise<string> {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      return `Ubicació obtinguda (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
    } catch {
      return "No s'ha pogut obtenir la geolocalització";
    }
  }

  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: false,
      });
    });
  }
}
