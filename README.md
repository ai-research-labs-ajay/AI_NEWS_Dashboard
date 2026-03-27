# 🚀 AI-Powered Market News Scraper & Trading Insight Dashboard

An advanced **real-time financial news intelligence system** that aggregates data from multiple global sources, performs **AI-based sentiment analysis**, detects **market impact**, and generates **trading insights**.

This project is designed for:
- 📊 Traders
- 🤖 AI Agent Developers
- 📈 Quant & Algo Trading Systems

---

## 🔥 Key Features

- 🔄 **Real-Time News Scraping (Auto Refresh every 60s)**
- 🌍 **Multi-Source Data Aggregation (Global + Indian Markets)**
- 🧠 **AI Sentiment Analysis (Bullish / Bearish / Neutral)**
- 📊 **Impact Scoring Engine (LOW / MEDIUM / HIGH)**
- ⚡ **Live Dashboard Updates using Socket.IO**
- 🔍 **Search & Filter System (Source-based filtering)**
- 📈 **Market Direction Prediction**
- 🌐 **Geopolitical Risk Detection Engine**
- 🧩 **Modular & Scalable Architecture**

---

## 🧩 Tech Stack

### 🔹 Backend
- **Flask** – Web server
- **Flask-SocketIO** – Real-time communication
- **Eventlet** – Async worker
- **Requests** – HTTP requests
- **BeautifulSoup** – HTML parsing
- **Feedparser** – RSS feeds parsing
- **VADER Sentiment** – NLP sentiment analysis

### 🔹 Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Socket.IO Client

### 🔹 Deployment
- AWS EC2 / Render
- Gunicorn (Production server)

---

## 📰 Data Sources

### 🔴 HTML Scraping (Dynamic Websites)

| Source        | Type        | Purpose |
|--------------|------------|--------|
| Moneycontrol | HTML Scraping | Indian stock market news |
| Reuters      | HTML Scraping | Global financial news |
| Twitter (Nitter) | Scraping via proxy | Real-time trader sentiment |

#### Twitter Scraping Strategy:
Uses multiple fallback proxies:
- https://nitter.net
- https://nitter.poast.org
- https://nitter.privacydev.net

---

### 🟢 RSS Feed Sources

| Source | Category |
|-------|--------|
| Economic Times | Indian Markets |
| CNBC | Global Finance |
| Bloomberg | Market News |
| Al Jazeera | Global Economy |
| NY Times | Business |
| Reddit (r/stocks) | Retail sentiment |

---

## 🧠 AI Processing Engine

### 1. Sentiment Analysis

Uses **VADER NLP Model**:

| Score | Label |
|------|------|
| > 0.05 | Bullish 📈 |
| < -0.05 | Bearish 📉 |
| Otherwise | Neutral 🤝 |

---

### 2. News Scoring System

Each news is scored using keyword intelligence:

#### 🔥 High Impact (+5)
- RBI Policy
- Rate Hike / Cut
- Inflation
- Recession
- War

#### 📊 Market Keywords (+1)
- NIFTY, BANKNIFTY, PCR
- FII/DII
- Breakout, Support, Resistance

#### 🚀 Bullish (+2)
- Rally, Breakout
- Strong Buy
- Golden Cross

#### 📉 Bearish (+2)
- Crash, Sell-off
- Downtrend
- Death Cross

#### 🌍 Geopolitical (+2)
- War, Sanctions
- Fed / RBI
- Inflation / GDP

---

### 3. Impact Classification

| Score | Impact |
|------|--------|
| 6+   | HIGH 🔴 |
| 3–5  | MEDIUM ⚠️ |
| <3   | LOW 🟢 |

---

## 🌍 Geopolitical Risk Engine

Analyzes global tensions affecting markets.

### Output Example:

```json
{
  "tension_index": 0.72,
  "risk_level": "HIGH",
  "market_impact": "significant",
  "estimated_volatility_increase": 1.5
}
