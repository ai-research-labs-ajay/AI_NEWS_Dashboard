

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

socketio = SocketIO(app, cors_allowed_origins="*")

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
# API ROUTE (FIXED)
# =========================
@app.route("/scrape", methods=["GET"])
def scrape():
    data = load_saved_news()   # ✅ now returns stored data
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
    background_scraper(socketio)

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    print("🚀 Starting Flask + WebSocket Server...")

    socketio.start_background_task(start_scraper)

    socketio.run(app, debug=True)



# -------------------
# ------------------
# ------- Above code is working correctly -------
# -----------------------------------------------


# from flask import Flask, jsonify, send_from_directory
# from flask_cors import CORS
# from flask_socketio import SocketIO
# import json

# # ✅ IMPORT FIXED
# from scraper import fetch_news, background_scraper

# # =========================
# # CONFIG
# # =========================
# OUTPUT_FILE = "market_news.json"

# # =========================
# # FLASK INIT
# # =========================
# app = Flask(__name__, static_folder="frontend", static_url_path="")
# CORS(app)

# socketio = SocketIO(app, cors_allowed_origins="*")

# # =========================
# # LOAD NEWS
# # =========================
# def load_saved_news():
#     try:
#         with open(OUTPUT_FILE, "r") as f:
#             return json.load(f)
#     except:
#         return []

# # =========================
# # API
# # =========================
# @app.route("/scrape", methods=["GET"])
# def scrape():
#     return jsonify(load_saved_news())

# # =========================
# # FRONTEND
# # =========================
# @app.route("/")
# def serve_home():
#     return send_from_directory(app.static_folder, "index.html")

# # =========================
# # BACKGROUND WRAPPER
# # =========================
# def start_scraper():
#     background_scraper(socketio)

# # =========================
# # RUN
# # =========================
# if __name__ == "__main__":
#     print("🚀 Flask Server Running...")

#     socketio.start_background_task(start_scraper)

#     socketio.run(app, debug=True)