import sys
import os.path

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Import the fully patched app from server.py (in the same directory)
from server import app

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8047))
    app.run(host='0.0.0.0', port=port)