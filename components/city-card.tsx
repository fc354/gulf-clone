import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { City } from "@/types";

const cityIcons: Record<string, string> = {
  dubai: "🏙",
  doha: "🕌",
  riyadh: "🌆",
};

const categoryIcons = [
  { icon: "✈️", label: "出行与撤离" },
  { icon: "🛡", label: "人身安全" },
  { icon: "🛒", label: "日常物资" },
  { icon: "🏥", label: "医疗就医" },
  { icon: "🏫", label: "子女学校" },
  { icon: "📡", label: "通讯联络" },
];

export function CityCard({ city, featured }: { city: City; featured?: boolean }) {
  const icon = cityIcons[city.slug] || "🏙";
  const isLow = city.level === "low";

  if (featured) {
    return (
      <Link href={`/city/${city.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: "16px 16px 8px",
          marginBottom: 12
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22
              }}>{icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{city.name}</div>
                <div style={{ fontSize: 12, color: "#999" }}>{city.country} · 我关注的城市</div>
              </div>
            </div>
            <StatusBadge level={city.level} />
          </div>

          {/* 6-category grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {categoryIcons.map((cat) => (
              <div key={cat.label} style={{
                background: "#f7f8fa",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>{cat.icon}</span>
                  <span style={{ fontSize: 13, color: "#333" }}>{cat.label}</span>
                </div>
                <span style={{ fontSize: 12, color: isLow ? "#00b96b" : "#fa8c16", fontWeight: 500 }}>
                  ●{isLow ? "正常" : "关注"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  // Compact list row for "other cities"
  return (
    <Link href={`/city/${city.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18
          }}>{icon}</div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{city.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StatusBadge level={city.level} />
          <span style={{ color: "#ccc", fontSize: 16 }}>›</span>
        </div>
      </div>
    </Link>
  );
}
