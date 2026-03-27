import eventlet
eventlet.monkey_patch()

import json
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO

from scraper import fetch_news, background_scraper

# =========================
# CONFIG
# =========================
OUTPUT_FILE = "market_news.json"

# =========================
# FLASK INIT
# =========================
app = Flask(__name__, static_folder="frontend", static_url_path="")
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# =========================
# LOAD SAVED NEWS
# =========================
def load_saved_news():
    try:
        with open(OUTPUT_FILE, "r") as f:
            return json.load(f)
    except:
        return []

# =========================
# API ROUTE
# =========================
@app.route("/scrape", methods=["GET"])
def scrape():
    data = load_saved_news()
    return jsonify(data)

# =========================
# SERVE FRONTEND
# =========================
@app.route("/")
def serve_home():
    return send_from_directory(app.static_folder, "index.html")

# =========================
# BACKGROUND SCRAPER WRAPPER
# =========================
def start_scraper():
    print("🔥 Background scraper started...")
    background_scraper(socketio)

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    print("🚀 Starting Flask + WebSocket Server...")

    # ✅ FIX: ensure background thread starts properly
    socketio.start_background_task(start_scraper)

    # ✅ FIX: required for Render (important)
    socketio = SocketIO(app, cors_allowed_origins="*", async_mode="gevent")
