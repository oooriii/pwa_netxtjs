export type FeatureKey = "notifications" | "camera" | "geolocation";

export interface Feature {
  key: FeatureKey;
  title: string;
  description: string;
}
