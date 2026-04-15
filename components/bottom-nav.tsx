"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "首页",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#1677ff" : "none"} stroke={active ? "#1677ff" : "#999"} strokeWidth="1.8">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    )
  },
  {
    href: "/updates",
    label: "动态",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1677ff" : "#999"} strokeWidth="1.8">
        <path d="M4 6h16M4 10h16M4 14h10"/>
        <circle cx="18" cy="17" r="3" fill={active ? "#1677ff" : "none"} stroke={active ? "#1677ff" : "#999"}/>
      </svg>
    )
  },
  {
    href: "/rumor-check",
    label: "辟谣",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1677ff" : "#999"} strokeWidth="1.8">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
    )
  },
  {
    href: "/about",
    label: "分享",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1677ff" : "#999"} strokeWidth="1.8">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
      </svg>
    )
  }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "#fff",
      borderTop: "1px solid #ebebeb",
      display: "flex",
      zIndex: 100,
      paddingBottom: "env(safe-area-inset-bottom, 0px)"
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 0 6px",
            textDecoration: "none",
            gap: 2
          }}>
            {tab.icon(active)}
            <span style={{
              fontSize: 11,
              color: active ? "#1677ff" : "#999",
              fontWeight: active ? 600 : 400
            }}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
