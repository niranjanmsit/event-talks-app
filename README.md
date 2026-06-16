# BigQuery Release Radar

BigQuery Release Radar is a modern, real-time Google Cloud BigQuery release notes tracker. It aggregates and visualizes updates directly from the official Google Cloud Atom feed, providing developers with search, type-based filtering, live statistics, and instant Twitter/X sharing capabilities.

---

## ⚡ Key Features

- **Live Feed Parsing**: Fetches the official Google Cloud BigQuery release notes XML feed, parsing and grouping updates dynamically by entry dates.
- **SSL Verification Bypass**: Configured with a secure, unverified SSL context to ensure functionality within restricted corporate networks or proxy firewalls.
- **Live Search & Filter**: Instant, client-side search by keywords and filter pills to filter updates by type (`Feature`, `Issue`, `Change`, `Announcement`, `Breaking`).
- **Interactive Tweet Composer**: Click any update card to instantly auto-draft a structured tweet, featuring character count limits (280) and a visual character check status.
- **One-Click Share to X**: Hooks up directly to the official X/Twitter Web Intent sharing endpoint.
- **Feed Analytics**: A live panel providing a total count of updates, categorized by features, issues, and changes.

---

## 🛠️ Architecture & Tech Stack

### Backend (Python Flask)
- Handles static asset hosting and API proxying.
- Downloads the Atom RSS feed from Google Cloud.
- Parses the XML node tree using `xml.etree.ElementTree`.
- Divides multi-update entry contents by `<h3>` tags and uses regex parsing to strip out HTML tags for plain-text tweeting.

### Frontend (HTML5 / CSS3 / Vanilla JavaScript SPA)
- **Structure**: Semantic HTML5 layout grid.
- **Design System**: Glassmorphism aesthetic featuring Outfit/Fira Code Google Fonts, custom color gradients for badges, and keyframe animations.
- **Logic**: Dynamic DOM updates via AJAX fetch queries, live searching, and composition validation.

---

## 📁 Project Directory Structure

```text
my-agentic-app/
├── app.py              # Flask server, feed downloader & parser
├── package.json        # Node configuration for local hosting scripts
├── .gitignore          # Version control file exclusions
├── README.md           # Project documentation
└── static/             # Frontend Single Page Application
    ├── index.html      # Layout grid structure, search, composer
    ├── styles.css      # Glassmorphism styling, type badges, animations
    └── app.js          # Fetch API calls, statistics, search filters
```

---

## 🚀 Quick Start Guide

### Prerequisites
Ensure you have Python 3.x installed on your machine.

### 1. Install Dependencies
Install Flask from your command terminal:
```bash
pip install flask
```
*Note: If you are behind a corporate firewall/proxy that blocks SSL verification, run:*
```bash
pip install flask --trusted-host pypi.org --trusted-host files.pythonhosted.org --trusted-host pypi.python.org
```

### 2. Run the Server
Launch the Flask development server:
```bash
python app.py
```

### 3. Open in Browser
Open your browser and navigate to:
```text
http://127.0.0.1:5000
```

---

## 📄 License
This project is open-source and licensed under the MIT License.
