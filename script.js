

// let allNews = [];

// /* =========================
//    🔥 SOCKET.IO CONNECTION
// ========================= */
// const socket = io("http://127.0.0.1:5000");

// socket.on("news_update", (data) => {
//     console.log("🔥 New Live News:", data);

//     // Add new news to existing list (no logic change)
//     allNews = [...data, ...allNews];

//     // Re-render UI
//     renderNews(allNews);
// });


// /* =========================
//    FETCH + RENDER
// ========================= */
// async function startScraping() {

//     const loader = document.getElementById("loader");
//     const container = document.getElementById("newsContainer");

//     loader.classList.remove("hidden");
//     container.innerHTML = "";

//     const response = await fetch("/scrape");
//     const data = await response.json();

//     loader.classList.add("hidden");

//     allNews = data;
//     renderNews(data);
// }


// /* =========================
//    RENDER FUNCTION
// ========================= */
// function renderNews(newsList) {
//     const container = document.getElementById("newsContainer");
//     container.innerHTML = "";

//     newsList.forEach(news => {

//         const card = document.createElement("div");
//         card.className = "card";

//         card.innerHTML = `
//             <h3>${news.title}</h3>
//             <p><b>Source:</b> ${news.source}</p>
//             <p><b>Impact:</b> ${news.impact}</p>
//             <p class="${news.sentiment_label}">
//                 <b>Sentiment:</b> ${news.sentiment_label}
//             </p>

//             <div class="overlay">
//                 <p><b>Summary:</b> ${news.summary}</p>
//                 <p><b>Score:</b> ${news.score}</p>
//                 <p><b>Risk:</b> ${getRisk(news)}</p>
//                 <p><b>Market Effect:</b> ${getMarketEffect(news)}</p>
//                 <a href="${news.link}" target="_blank">Read Full News</a>
//             </div>
//         `;

//         container.appendChild(card);
//     });
// }


// /* =========================
//    FILTER BY SOURCE
// ========================= */
// function filterSource(source) {
//     if (source === "ALL") {
//         renderNews(allNews);
//     } else {
//         const filtered = allNews.filter(n => n.source === source);
//         renderNews(filtered);
//     }
// }


// /* =========================
//    RISK LOGIC
// ========================= */
// function getRisk(news) {
//     if (news.impact === "HIGH" && news.sentiment_label === "bearish") {
//         return "HIGH RISK 🔴";
//     }
//     if (news.impact === "HIGH") {
//         return "VOLATILE ⚠️";
//     }
//     return "LOW RISK 🟢";
// }


// /* =========================
//    MARKET EFFECT
// ========================= */
// function getMarketEffect(news) {
//     if (news.sentiment_label === "bullish") {
//         return "Market Likely UP 📈";
//     }
//     if (news.sentiment_label === "bearish") {
//         return "Market Likely DOWN 📉";
//     }
//     return "Sideways 🤝";
// }



//  /* =========================
//    🔍 SEARCH FUNCTION (FIXED)
// ========================= */
// function searchNews() {
//     const input = document.getElementById("searchBox");

//     if (!input) return;

//     const text = input.value.toLowerCase();

//     const filtered = allNews.filter(n =>
//         (n.title && n.title.toLowerCase().includes(text)) ||
//         (n.summary && n.summary.toLowerCase().includes(text)) ||
//         (n.source && n.source.toLowerCase().includes(text))
//     );

//     renderNews(filtered);
// }


// /* =========================
//    🔥 ACTIVE BUTTON HIGHLIGHT
// ========================= */
// function setActiveButton(clickedBtn) {

//     // Remove active from all buttons
//     document.querySelectorAll("nav button, .filters button")
//         .forEach(btn => btn.classList.remove("active"));

//     // Add active to clicked
//     clickedBtn.classList.add("active");
// }




let allNews = [];

/* =========================
   🔴 LIVE NEWS TICKER
========================= */
function updateTicker(newsList) {
    const ticker = document.getElementById("tickerContent");

    if (!ticker) return;

    if (!newsList || newsList.length === 0) {
        ticker.innerText = "⚡ No live news...";
        return;
    }

    let tickerText = newsList
        .slice(0, 10)
        .map(n => {
            let emoji =
                n.sentiment_label === "bullish" ? "🟢" :
                n.sentiment_label === "bearish" ? "🔴" : "⚪";

            return `${emoji} ${n.title}`;
        })
        .join("   🔸   ");

    ticker.innerText = tickerText;

    // 🔥 AUTO SPEED CONTROL
    let length = tickerText.length;

    let duration = Math.max(40, length / 5); // dynamic speed

    ticker.style.animation = `scrollTicker ${duration}s linear infinite`;
}

/* =========================
   🔥 SOCKET.IO CONNECTION
========================= */
const socket = io("http://127.0.0.1:5000");

socket.on("news_update", (data) => {
    console.log("🔥 Live Update:", data);

    const news = data.news || [];
    const geo = data.geo || {};

    // ✅ FIX: merge correctly
    allNews = [...news, ...allNews];

    renderNews(allNews);

    // ✅ OPTIONAL: show geo risk in console
    console.log("🌍 Geo Risk:", geo.risk_level, "| Index:", geo.tension_index);

    // ✅ OPTIONAL: show in UI (ticker)
    if (geo.risk_level) {
        document.getElementById("tickerContent").innerText =
            `🌍 Geo Risk: ${geo.risk_level} | Volatility x${geo.estimated_volatility_increase}`;
    }
});


/* =========================
   FETCH + RENDER
========================= */
async function startScraping() {

    const loader = document.getElementById("loader");
    const container = document.getElementById("newsContainer");

    loader.classList.remove("hidden");
    container.innerHTML = "";

    try {
        const response = await fetch("/scrape");
        const data = await response.json();

        loader.classList.add("hidden");

        allNews = data;
        renderNews(data);

        // 🔴 UPDATE TICKER
        updateTicker(data);

    } catch (error) {
        console.error("❌ Fetch Error:", error);
        loader.classList.add("hidden");
    }
}


/* =========================
   RENDER FUNCTION
========================= */
function renderNews(newsList) {
    const container = document.getElementById("newsContainer");
    container.innerHTML = "";

    newsList.forEach(news => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${news.title}</h3>
            <p><b>Source:</b> ${news.source}</p>
            <p><b>Impact:</b> ${news.impact}</p>
            <p class="${news.sentiment_label}">
                <b>Sentiment:</b> ${news.sentiment_label}
            </p>

            <div class="overlay">
                <p><b>Summary:</b> ${news.summary}</p>
                <p><b>Score:</b> ${news.score}</p>
                <p><b>Risk:</b> ${getRisk(news)}</p>
                <p><b>Market Effect:</b> ${getMarketEffect(news)}</p>
                <a href="${news.link}" target="_blank">Read Full News</a>
            </div>
        `;

        container.appendChild(card);
    });
}


/* =========================
   FILTER BY SOURCE
========================= */
function filterSource(source) {
    if (source === "ALL") {
        renderNews(allNews);
    } else {
        const filtered = allNews.filter(n => n.source === source);
        renderNews(filtered);
    }
}


/* =========================
   RISK LOGIC
========================= */
function getRisk(news) {
    if (news.impact === "HIGH" && news.sentiment_label === "bearish") {
        return "HIGH RISK 🔴";
    }
    if (news.impact === "HIGH") {
        return "VOLATILE ⚠️";
    }
    return "LOW RISK 🟢";
}


/* =========================
   MARKET EFFECT
========================= */
function getMarketEffect(news) {
    if (news.sentiment_label === "bullish") {
        return "Market Likely UP 📈";
    }
    if (news.sentiment_label === "bearish") {
        return "Market Likely DOWN 📉";
    }
    return "Sideways 🤝";
}


/* =========================
   🔍 SEARCH FUNCTION
========================= */
function searchNews() {
    const input = document.getElementById("searchBox");

    if (!input) return;

    const text = input.value.toLowerCase();

    const filtered = allNews.filter(n =>
        (n.title && n.title.toLowerCase().includes(text)) ||
        (n.summary && n.summary.toLowerCase().includes(text)) ||
        (n.source && n.source.toLowerCase().includes(text))
    );

    renderNews(filtered);
}


/* =========================
   🔥 ACTIVE BUTTON HIGHLIGHT
========================= */
function setActiveButton(clickedBtn) {

    document.querySelectorAll("nav button, .filters button")
        .forEach(btn => btn.classList.remove("active"));

    clickedBtn.classList.add("active");
}