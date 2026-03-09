// ─────────────────────────────────────────────────────────────────────────────
// src/index.js — Gold Loan Backend
// ─────────────────────────────────────────────────────────────────────────────
import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// ─────────────────────────────────────────────────────────────────────────────
// METAL PRICE CACHE — GoldAPI.io se fetch, 1 ghante mein ek baar
// 100 req/day free hai isliye cache zaroori hai
// ─────────────────────────────────────────────────────────────────────────────
const OZ_TO_GRAM = 31.1035;
let priceCache = null;
let lastFetched = 0;
const CACHE_MS = 60 * 60 * 1000; // 1 ghanta

async function fetchMetalPrices() {
  const now = Date.now();

  // Cache valid hai to same data return karo (API call bachao)
  if (priceCache && (now - lastFetched) < CACHE_MS) {
    console.log("📦 Returning cached prices");
    return priceCache;
  }

  try {
    // GoldAPI.io se teeno metals ek saath fetch karo
    // XAU = Gold, XAG = Silver, XPT = Platinum — sab INR mein
    const [goldRes, silverRes, platRes] = await Promise.all([
      fetch("https://www.goldapi.io/api/XAU/INR", {
        headers: { "x-access-token": process.env.GOLDAPI_KEY, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(8000),
      }),
      fetch("https://www.goldapi.io/api/XAG/INR", {
        headers: { "x-access-token": process.env.GOLDAPI_KEY, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(8000),
      }),
      fetch("https://www.goldapi.io/api/XPT/INR", {
        headers: { "x-access-token": process.env.GOLDAPI_KEY, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    // Gold — must succeed
    if (!goldRes.ok) throw new Error(`GoldAPI Gold error: ${goldRes.status}`);
    const goldData = await goldRes.json();
    const goldOzInr = goldData.price;
    if (!goldOzInr || goldOzInr < 10000) throw new Error("Invalid gold price");

    // Silver
    let silver999 = Math.round((34 / OZ_TO_GRAM) * 83.5); // fallback
    if (silverRes.ok) {
      const silverData = await silverRes.json();
      if (silverData.price && silverData.price > 100) {
        silver999 = Math.round(silverData.price / OZ_TO_GRAM);
      }
    }

    // Platinum
    let platinum950 = Math.round((980 / OZ_TO_GRAM) * 83.5 * 0.95); // fallback
    if (platRes.ok) {
      const platData = await platRes.json();
      if (platData.price && platData.price > 1000) {
        platinum950 = Math.round(platData.price / OZ_TO_GRAM * 0.95);
      }
    }

    priceCache = {
      gold24k:  Math.round(goldOzInr / OZ_TO_GRAM),
      silver999,
      platinum950,
      isLive: true,
      fetchedAt: new Date().toISOString(),
    };
    lastFetched = now;

    console.log(`✅ Live prices — Gold: ₹${priceCache.gold24k}/g | Silver: ₹${priceCache.silver999}/g | Platinum: ₹${priceCache.platinum950}/g`);
    return priceCache;

  } catch (err) {
    console.error("❌ Metal price fetch failed:", err.message);

    // Fallback: USD→INR se calculate karo
    try {
      const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
      if (fxRes.ok) {
        const fx = await fxRes.json();
        const usdInr = fx.rates?.INR || 83.5;
        const fallback = {
          gold24k:     Math.round((3100 / OZ_TO_GRAM) * usdInr),
          silver999:   Math.round((34   / OZ_TO_GRAM) * usdInr),
          platinum950: Math.round((980  / OZ_TO_GRAM) * usdInr * 0.95),
          isLive: false,
          fetchedAt: new Date().toISOString(),
        };
        priceCache = fallback;
        lastFetched = now - CACHE_MS + 15 * 60 * 1000;
        return fallback;
      }
    } catch {}

    return { gold24k:8800, silver999:98, platinum950:3100, isLive:false, fetchedAt: new Date().toISOString() };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: GET /api/metal-prices
// Frontend yahan se live prices fetch karta hai
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/metal-prices", async (req, res) => {
  try {
    const prices = await fetchMetalPrices();
    res.json(prices);
  } catch {
    res.status(500).json({ error: "Price fetch failed" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Nodemailer
// ─────────────────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n || 0);

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: POST /api/loan-leads — Silent lead capture
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/loan-leads", async (req, res) => {
  res.status(200).json({ success: true }); // turant return

  try {
    const d = req.body;
    if (!d || !d.name) return;

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    await transporter.sendMail({
      from: `"Gold Loan Leads 🏦" <${process.env.GMAIL_USER}>`,
      to: process.env.LEAD_EMAIL || process.env.GMAIL_USER,
      subject: `🔥 New Lead — ${d.name} | ${d.contact}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px}
    .card{background:#fff;border-radius:12px;max-width:540px;margin:0 auto;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}
    .header{background:linear-gradient(135deg,#f59e0b,#dc2626);padding:24px;text-align:center}
    .header h1{color:#fff;margin:0;font-size:20px}
    .header p{color:rgba(255,255,255,.85);margin:6px 0 0;font-size:12px}
    .body{padding:22px}
    .sec{font-size:10px;font-weight:700;letter-spacing:2px;color:#999;text-transform:uppercase;margin:18px 0 8px}
    .row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f3f3f3}
    .row:last-child{border-bottom:none}
    .lbl{color:#777;font-size:13px}
    .val{color:#111;font-size:13px;font-weight:600}
    .box{background:linear-gradient(to right,#fff1f2,#fffbeb);border-radius:10px;padding:16px;margin-top:18px;text-align:center}
    .amt{font-size:30px;font-weight:900;color:#b91c1c}
    .footer{background:#f9f9f9;padding:12px;text-align:center;font-size:11px;color:#bbb}
  </style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>🏦 New Gold Loan Lead</h1>
    <p>${submittedAt}</p>
  </div>
  <div class="body">
    <div class="sec">👤 Personal Details</div>
    <div class="row"><span class="lbl">Name</span><span class="val">${d.name}</span></div>
    <div class="row"><span class="lbl">Email</span><span class="val">${d.email}</span></div>
    <div class="row"><span class="lbl">Contact</span><span class="val">${d.contact}</span></div>
    <div class="row"><span class="lbl">State</span><span class="val">${d.state}</span></div>
    <div class="row"><span class="lbl">Pincode</span><span class="val">${d.pincode}</span></div>
    <div class="sec">💎 Metal Details</div>
    <div class="row"><span class="lbl">Metal</span><span class="val">${(d.metal||"").toUpperCase()}</span></div>
    <div class="row"><span class="lbl">Purity</span><span class="val">${d.subtype||"—"}</span></div>
    <div class="row"><span class="lbl">Weight</span><span class="val">${d.weight} grams</span></div>
    <div class="row"><span class="lbl">Metal Value</span><span class="val">${fmt(d.goldValue)}</span></div>
    <div class="row"><span class="lbl">Amount Required</span><span class="val">${fmt(d.required)}</span></div>
    <div class="box">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#dc2626;text-transform:uppercase">🎯 Eligible Loan Amount</div>
      <div class="amt">${fmt(d.eligible)}</div>
      <div style="font-size:11px;color:#888;margin-top:4px">Based on 75% LTV of metal value</div>
    </div>
  </div>
  <div class="footer">Gold Loan Calculator &nbsp;•&nbsp; ${submittedAt}</div>
</div>
</body>
</html>`,
    });

    console.log(`✅ Lead email sent — ${d.name} (${d.contact})`);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Gold Loan Backend running 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Sending leads to: ${process.env.LEAD_EMAIL || process.env.GMAIL_USER}`);
  // Server start hote hi prices prefetch karo
  fetchMetalPrices();
});