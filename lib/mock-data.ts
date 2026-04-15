import { City, UpdateItem } from "@/types";

export const mockCities: City[] = [
  {
    id: "1",
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    level: "low",
    score: 22,
    summary: "Low disruption signals with normal transport and routine advisories.",
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    slug: "doha",
    name: "Doha",
    country: "Qatar",
    level: "medium",
    score: 46,
    summary: "Some supply-chain and weather-linked alerts need monitoring.",
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    slug: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    level: "medium",
    score: 53,
    summary: "Elevated regional chatter with no broad public disruption confirmed.",
    updatedAt: new Date().toISOString()
  }
];

export const mockUpdates: UpdateItem[] = [
  {
    id: "u1",
    citySlug: "dubai",
    title: "Airport operations stable with minor gate delays",
    summary: "Signals remain routine. Traffic is elevated but flowing normally.",
    sourceName: "Operations Feed",
    sourceUrl: "https://example.com/1",
    publishedAt: new Date().toISOString(),
    severity: "low"
  },
  {
    id: "u2",
    citySlug: "doha",
    title: "Localized weather advisory under review",
    summary: "Forecasters are monitoring wind and reduced visibility near transit corridors.",
    sourceName: "Weather Monitor",
    sourceUrl: "https://example.com/2",
    publishedAt: new Date().toISOString(),
    severity: "medium"
  },
  {
    id: "u3",
    citySlug: "riyadh",
    title: "Authorities deny viral claim about city-wide closure",
    summary: "No evidence supports a broad closure. Normal operations continue.",
    sourceName: "Fact Check Desk",
    sourceUrl: "https://example.com/3",
    publishedAt: new Date().toISOString(),
    severity: "medium"
  }
];
