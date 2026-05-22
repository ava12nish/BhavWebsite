import sys
import os.path
from flask_cors import CORS

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import gaurabda.TServer as GS

# Get the Flask app
app = GS.app

# Configure CORS
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

# After getting the app
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8047))
    app.run(host='0.0.0.0', port=port) 