import { UpdateItem } from "@/types";
import { StatusBadge } from "@/components/status-badge";
import { formatRelative } from "@/lib/utils";

export function UpdatesFeed({ updates }: { updates: UpdateItem[] }) {
  return (
    <div>
      {updates.map((item) => (
        <article key={item.id} style={{
          background: "#fff",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <StatusBadge level={item.severity} />
            <span style={{ fontSize: 11, color: "#bbb" }}>{formatRelative(item.publishedAt)}</span>
            <a href={item.sourceUrl} target="_blank" rel="noreferrer" style={{
              fontSize: 11, color: "#1677ff", textDecoration: "none", marginLeft: "auto"
            }}>{item.sourceName}</a>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.summary}</div>
        </article>
      ))}
    </div>
  );
}
