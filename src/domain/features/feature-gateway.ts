import { FeatureKey } from "./feature";

export interface FeatureGateway {
  isSupported(featureKey: FeatureKey): Promise<boolean>;
  requestPermission(featureKey: FeatureKey): Promise<string>;
  test(featureKey: FeatureKey): Promise<string>;
}
