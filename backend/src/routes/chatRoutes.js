import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY || process.env.GENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    if (!apiKey) return res.status(200).json({ reply: "I’m ready to chat once an AI key is configured on the server." });

    const r = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert AI Nutrition Assistant. Give concise, actionable guidance with safe, evidence-based recommendations." },
          ...(messages || []).map((m) => ({ role: m.role || (m.isBot ? "assistant" : "user"), content: m.text || m.content }))
        ],
        temperature: 0.3,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(500).json({ error: "LLM_ERROR", detail: text });
    }
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", detail: String(err) });
  }
});

export default router;


