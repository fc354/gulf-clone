import { fetchArticles } from "../lib/fetchers";
import { getAdminSupabase } from "../lib/supabase";

async function main() {
  const supabase = getAdminSupabase();
  const articles = await fetchArticles();

  if (!supabase) {
    console.log("No Supabase configured. Demo ingest output:");
    console.log(JSON.stringify(articles, null, 2));
    return;
  }

  const payload = articles.map((article) => ({
    title: article.title,
    url: article.url,
    summary: article.summary,
    city_slug: article.citySlug,
    published_at: article.publishedAt,
    source_name: article.sourceName
  }));

  const { error } = await supabase.from("articles").upsert(payload, { onConflict: "url" });
  if (error) throw error;

  console.log(`Ingested ${payload.length} articles.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
