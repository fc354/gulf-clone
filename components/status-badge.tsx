import { RiskLevel } from "@/types";

const config: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  low:    { label: "平安",   color: "#00b96b", bg: "#e8fff4" },
  medium: { label: "关注",   color: "#fa8c16", bg: "#fff7e6" },
  high:   { label: "警报",   color: "#f5222d", bg: "#fff1f0" }
};

export function StatusBadge({ level }: { level: RiskLevel }) {
  const c = config[level];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      color: c.color,
      background: c.bg
    }}>
      {c.label}
    </span>
  );
}
