export type RiskLevel = "low" | "medium" | "high";

export interface City {
  id: string;
  slug: string;
  name: string;
  country: string;
  level: RiskLevel;
  score: number;
  summary: string;
  updatedAt: string;
}

export interface UpdateItem {
  id: string;
  citySlug: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  severity: RiskLevel;
}

export interface RumorCheckResult {
  verdict: "likely_true" | "unclear" | "likely_false";
  confidence: number;
  explanation: string;
}
