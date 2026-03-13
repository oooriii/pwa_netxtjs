import { Feature, FeatureKey } from "@/domain/features/feature";
import { FeatureGateway } from "@/domain/features/feature-gateway";

const features: Feature[] = [
  {
    key: "notifications",
    title: "Notificacions",
    description: "Demana permisos i envia una notificació local de prova.",
  },
  {
    key: "camera",
    title: "Càmera",
    description: "Obre la càmera amb getUserMedia i la tanca després de validar-la.",
  },
  {
    key: "geolocation",
    title: "Geolocalització",
    description: "Demana ubicació i mostra coordenades de prova.",
  },
];

export class FeatureService {
  constructor(private readonly gateway: FeatureGateway) {}

  list(): Feature[] {
    return features;
  }

  async checkSupport(featureKey: FeatureKey): Promise<boolean> {
    return this.gateway.isSupported(featureKey);
  }

  async enable(featureKey: FeatureKey): Promise<string> {
    return this.gateway.requestPermission(featureKey);
  }

  async runTest(featureKey: FeatureKey): Promise<string> {
    return this.gateway.test(featureKey);
  }
}
