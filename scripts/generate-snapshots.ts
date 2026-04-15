import { average, scoreToLevel } from "../lib/scoring";
import { getAdminSupabase } from "../lib/supabase";

async function main() {
  const supabase = getAdminSupabase();
  if (!supabase) {
    console.log("No Supabase configured. Skipping snapshot generation.");
    return;
  }

  const { data: cities, error: cityError } = await supabase.from("cities").select("id, slug, name");
  if (cityError) throw cityError;

  for (const city of cities ?? []) {
    const { data: events, error: eventError } = await supabase
      .from("events")
      .select("severity_score")
      .eq("city_id", city.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (eventError) throw eventError;

    const score = average((events ?? []).map((event: any) => Number(event.severity_score ?? 20)));
    const level = scoreToLevel(score);

    const { error: insertError } = await supabase.from("city_snapshots").insert({
      city_id: city.id,
      score,
      level,
      summary: `${city.name} is currently ${level} risk based on the latest monitored events.`
    });

    if (insertError) throw insertError;
  }

  console.log("Generated snapshots.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
