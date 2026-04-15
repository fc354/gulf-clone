import { notFound } from "next/navigation";
import Link from "next/link";
import { ChatbotPanel } from "@/components/chatbot-panel";
import { StatusBadge } from "@/components/status-badge";
import { UpdatesFeed } from "@/components/updates-feed";
import { getCity, listCityUpdates } from "@/lib/data";

const categoryIcons = [
  { icon: "✈️", label: "出行与撤离" },
  { icon: "🛡", label: "人身安全" },
  { icon: "🛒", label: "日常物资" },
  { icon: "🏥", label: "医疗就医" },
  { icon: "🏫", label: "子女学校" },
  { icon: "📡", label: "通讯联络" },
];

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = await getCity(slug);
  if (!city) notFound();
  const updates = await listCityUpdates(slug);
  const isLow = city.level === "low";

  return (
    <div className="page-content">
      {/* Back bar */}
      <div style={{
        background: "#fff",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderBottom: "1px solid #f0f0f0",
        marginBottom: 8
      }}>
        <Link href="/" style={{ color: "#1677ff", fontSize: 14, textDecoration: "none" }}>← 返回</Link>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{city.name}</span>
        <div style={{ marginLeft: "auto" }}>
          <StatusBadge level={city.level} />
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Summary card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: "#999", marginBottom: 2 }}>{city.country}</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{city.name}安全概况</div>
          <p style={{ fontSize: 13, color: "#333", lineHeight: 1.7, margin: "0 0 14px" }}>{city.summary}</p>

          {/* 6 categories */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {categoryIcons.map((cat) => (
              <div key={cat.label} style={{
                background: "#f7f8fa", borderRadius: 12,
                padding: "10px 12px",
                display: "flex", alignItems: "center", justifyContent: "space-between"
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

        {/* AI chatbot */}
        <ChatbotPanel citySlug={slug} />

        {/* Updates feed */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>最新动态</div>
          <UpdatesFeed updates={updates} />
        </div>
      </div>
    </div>
  );
}
