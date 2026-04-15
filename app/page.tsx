import { CityCard } from "@/components/city-card";
import { listCities } from "@/lib/data";

function getNow() {
  const now = new Date();
  const days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const day = days[now.getDay()];
  const h = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return { dateStr: `${y}年${m}月${d}日 ${day}`, timeStr: `${h}:${min}` };
}

export default async function HomePage() {
  const cities = await listCities();
  const featured = cities[0];
  const others = cities.slice(1);
  const { dateStr, timeStr } = getNow();

  return (
    <div className="page-content">
      {/* Top bar */}
      <div style={{
        background: "#fff",
        padding: "12px 16px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "#1677ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 16
          }}>湾</div>
          <span style={{ fontSize: 16, fontWeight: 700 }}>平安海湾</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#666" }}>字号</span>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            border: "1px solid #ebebeb", borderRadius: 6, padding: "3px 8px",
            fontSize: 13, color: "#333"
          }}>
            大 <span style={{ color: "#ccc", marginLeft: 2 }}>▼</span>
          </div>
          <div style={{
            border: "1px solid #ebebeb", borderRadius: 8,
            padding: "4px 10px", fontSize: 13, color: "#333"
          }}>更换城市</div>
        </div>
      </div>

      {/* Page title */}
      <div style={{ padding: "16px 16px 8px", background: "#fff", marginBottom: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>海湾安全速报</h1>
        <div style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 6 }}>
          <span>{dateStr}</span>
          <span>·</span>
          <span style={{ color: "#1677ff", fontWeight: 600 }}>{timeStr} 更新</span>
          <span>·</span>
          <span>55分钟前更新</span>
        </div>
      </div>

      {/* Overall status banner */}
      <div style={{ padding: "0 16px 12px", background: "#fff", marginBottom: 8 }}>
        <div style={{
          background: "#e8fff4",
          borderRadius: 12,
          padding: "12px 14px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00b96b", display: "inline-block" }}></span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#00b96b" }}>今天，海湾整体平安</span>
          </div>
          <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, margin: 0 }}>
            停火后海湾地区航班逐步恢复但仍有延误，零售供应充足，学校将分阶段复课，整体局势趋于缓和。
          </p>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Featured city */}
        {featured && (
          <>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 8 }}>
              {featured.name} · 我关注的城市
            </div>
            <CityCard city={featured} featured />
          </>
        )}

        {/* Other cities */}
        {others.length > 0 && (
          <>
            <div style={{ fontSize: 13, color: "#999", margin: "16px 0 8px" }}>其他城市</div>
            {others.map(city => (
              <CityCard key={city.id} city={city} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
