# app.py - BigQuery Release Notes Flask Backend Server
from flask import Flask, jsonify, send_from_directory
import urllib.request
import xml.etree.ElementTree as ET
import re
import os

app = Flask(__name__, static_folder='static', static_url_path='')

import ssl

def fetch_and_parse_feed():
    url = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    # Bypass SSL verification for restricted proxy environments
    context = ssl._create_unverified_context()
    with urllib.request.urlopen(req, context=context) as response:
        xml_data = response.read()
    
    root = ET.fromstring(xml_data)
    
    # Atom namespace
    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    
    entries = []
    
    for entry_el in root.findall('atom:entry', ns):
        date_str = entry_el.find('atom:title', ns).text
        updated_str = entry_el.find('atom:updated', ns).text
        id_str = entry_el.find('atom:id', ns).text
        
        link_el = entry_el.find('atom:link[@rel="alternate"]', ns)
        link_str = link_el.attrib['href'] if link_el is not None else ""
        
        content_el = entry_el.find('atom:content', ns)
        content_html = content_el.text if content_el is not None else ""
        
        # Parse individual updates inside content HTML separated by <h3>
        parts = content_html.split('<h3>')
        entry_updates = []
        
        for part in parts[1:]:
            subparts = part.split('</h3>')
            if len(subparts) >= 2:
                update_type = subparts[0].strip()
                update_html = subparts[1].strip()
                
                # Strip HTML tags for clean tweeting text
                plain_text = re.sub(r'<[^>]+>', '', update_html)
                # Normalize double spacing and line endings
                plain_text = re.sub(r'\s+', ' ', plain_text).strip()
                
                entry_updates.append({
                    'type': update_type,
                    'html': update_html,
                    'text': plain_text
                })
        
        entries.append({
            'date': date_str,
            'updated': updated_str,
            'id': id_str,
            'link': link_str,
            'updates': entry_updates
        })
        
    return entries

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/release-notes')
def get_release_notes():
    try:
        notes = fetch_and_parse_feed()
        return jsonify({
            'status': 'success', 
            'data': notes
        })
    except Exception as e:
        return jsonify({
            'status': 'error', 
            'message': str(e)
        }), 500

if __name__ == '__main__':
    # Using port 5000 for Flask
    app.run(debug=True, port=5000)
