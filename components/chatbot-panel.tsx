"use client";

import { FormEvent, useState } from "react";

export function ChatbotPanel({ citySlug }: { citySlug?: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const response = await fetch(`/api/chat?city=${citySlug ?? "dubai"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setAnswer(data.answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: 16,
      marginTop: 12
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>智能问答</div>
      <div style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>询问撤离、物资、安全等最新情况</div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入你的问题…"
            style={{
              flex: 1,
              border: "1px solid #ebebeb",
              borderRadius: 20,
              padding: "8px 14px",
              fontSize: 13,
              outline: "none",
              background: "#f7f8fa"
            }}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            style={{
              background: loading ? "#ccc" : "#1677ff",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: loading ? "default" : "pointer"
            }}
          >
            {loading ? "…" : "问一问"}
          </button>
        </div>
      </form>
      {answer && (
        <div style={{
          marginTop: 12,
          background: "#f7f8fa",
          borderRadius: 12,
          padding: "10px 14px",
          fontSize: 13,
          lineHeight: 1.7,
          color: "#333"
        }}>{answer}</div>
      )}
    </div>
  );
}
