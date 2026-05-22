import sys
import os.path

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import gaurabda as G
import gaurabda.TServer as GS
from flask import Flask
from flask_cors import CORS

# Get the Flask app from GS (assuming it's available)
app = GS.app  # or however you get the Flask app from gaurabda.TServer
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://bhavapp.vercel.app",
            "http://localhost:5173",
            "http://localhost:3000",
            "https://thebhavapp.com",
            "https://www.thebhavapp.com"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

GCAL_PORT = int(os.getenv('PORT', 8047))

if __name__ == '__main__':
    # Use Flask's run method instead
    app.run(host='0.0.0.0', port=GCAL_PORT)