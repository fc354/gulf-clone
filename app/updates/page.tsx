import { UpdatesFeed } from "@/components/updates-feed";
import { listCityUpdates } from "@/lib/data";

export default async function UpdatesPage() {
  const updates = await listCityUpdates("dubai");
  return (
    <div className="page-content">
      <div style={{ padding: "16px 16px 8px", background: "#fff", marginBottom: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>最新动态</h1>
        <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>实时追踪海湾地区安全信息</p>
      </div>
      <div style={{ padding: "0 16px" }}>
        <UpdatesFeed updates={updates} />
      </div>
    </div>
  );
}
