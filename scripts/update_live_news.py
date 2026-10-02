import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

FEED = "live-news.json"
QUERY = urllib.parse.quote("US 2026 midterm elections OR congressional elections")
RSS_URL = f"https://news.google.com/rss/search?q={QUERY}&hl=en-US&gl=US&ceid=US:en"
MAX_ITEMS = 24
MAX_AGE_DAYS = 7

def clean(text):
    return re.sub(r"\\s+", " ", re.sub(r"<[^>]+>", "", text or "")).strip()

def fetch():
    req = urllib.request.Request(RSS_URL, headers={"User-Agent": "Orynt-Live-News/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read()

def main():
    root = ET.fromstring(fetch())
    now = datetime.now(timezone.utc)
    items = []

    for item in root.findall(".//item"):
        title = clean(item.findtext("title"))
        link = clean(item.findtext("link"))
        pub = clean(item.findtext("pubDate"))
        description = clean(item.findtext("description"))
        source_el = item.find("source")
        source = clean(source_el.text if source_el is not None else "Google News")

        if not title or not link:
            continue

        try:
            dt = datetime.strptime(pub, "%a, %d %b %Y %H:%M:%S %Z").replace(tzinfo=timezone.utc)
        except ValueError:
            continue

        if (now - dt).days > MAX_AGE_DAYS:
            continue

        # Google News may expose a redirect URL; keep it as the direct source link.
        summary = description
        if len(summary) > 280:
            summary = summary[:277].rsplit(" ", 1)[0] + "..."

        items.append({
            "title": title,
            "category": "ELECTIONS",
            "date": dt.date().isoformat(),
            "time": dt.strftime("%d %b %Y · %H:%M UTC"),
            "source": source,
            "url": link,
            "summary": summary
        })

    # Deduplicate by normalized title and keep newest first.
    seen = set()
    unique = []
    for item in sorted(items, key=lambda x: x["date"] + x["time"], reverse=True):
        key = re.sub(r"[^a-z0-9]+", " ", item["title"].lower()).strip()
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
        if len(unique) == MAX_ITEMS:
            break

    if not unique:
        raise RuntimeError("No recent midterm-election stories were returned.")

    with open(FEED, "w", encoding="utf-8") as f:
        json.dump(unique, f, ensure_ascii=False, indent=2)
        f.write("\n")

if __name__ == "__main__":
    main()
