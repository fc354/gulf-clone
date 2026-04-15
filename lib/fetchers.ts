export interface SourceArticle {
  title: string;
  url: string;
  summary: string;
  citySlug: string;
  publishedAt: string;
  sourceName: string;
}

export async function fetchArticles(): Promise<SourceArticle[]> {
  return [
    {
      title: "Dubai operations remain normal amid high traveler volume",
      url: "https://example.com/article-1",
      summary: "Monitoring update for transport and operational continuity.",
      citySlug: "dubai",
      publishedAt: new Date().toISOString(),
      sourceName: "Demo Feed"
    },
    {
      title: "Doha weather bulletin flags visibility concerns",
      url: "https://example.com/article-2",
      summary: "Short-term visibility disruptions under review.",
      citySlug: "doha",
      publishedAt: new Date().toISOString(),
      sourceName: "Demo Feed"
    }
  ];
}
