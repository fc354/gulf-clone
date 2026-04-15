import { getAdminSupabase } from "@/lib/supabase";
import { mockCities, mockUpdates } from "@/lib/mock-data";
import { City, UpdateItem } from "@/types";

export async function listCities(): Promise<City[]> {
  const supabase = getAdminSupabase();
  if (!supabase) return mockCities;

  const { data, error } = await supabase
    .from("city_snapshots_view")
    .select("id, slug, name, country, level, score, summary, updated_at")
    .order("score", { ascending: false });

  if (error || !data?.length) return mockCities;

  return data.map((row: any) => ({
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    country: row.country,
    level: row.level,
    score: row.score,
    summary: row.summary,
    updatedAt: row.updated_at
  }));
}

export async function getCity(slug: string): Promise<City | null> {
  const cities = await listCities();
  return cities.find((city) => city.slug === slug) ?? null;
}

export async function listCityUpdates(slug: string): Promise<UpdateItem[]> {
  const supabase = getAdminSupabase();
  if (!supabase) return mockUpdates.filter((item) => item.citySlug === slug);

  const { data, error } = await supabase
    .from("updates_view")
    .select("id, city_slug, title, summary, source_name, source_url, published_at, severity")
    .eq("city_slug", slug)
    .order("published_at", { ascending: false })
    .limit(20);

  if (error || !data?.length) return mockUpdates.filter((item) => item.citySlug === slug);

  return data.map((row: any) => ({
    id: String(row.id),
    citySlug: row.city_slug,
    title: row.title,
    summary: row.summary,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    publishedAt: row.published_at,
    severity: row.severity
  }));
}
