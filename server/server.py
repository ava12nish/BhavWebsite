import sys
import os.path
import urllib.request
import urllib.parse
import json
import math
import zoneinfo
import ssl
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import gaurabda as G
import gaurabda.TServer as GS
from gaurabda.GCLocation import GCLocation
# Monkey patch the missing import in gaurabda.TServer
GS.GCLocation = GCLocation

from flask import Flask, request, jsonify
from flask_cors import CORS

app = GS.app
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Load the timezone database of gaurabda
import gaurabda.GCTimeZone as GZ
GZ.LoadFile('')

# SSL context for macOS certificate verification bypass
ssl_context = ssl._create_unverified_context()

def get_closest_timezone(lat, lon):
    import gaurabda.GCLocationList as gl
    gl.OpenFile('')
    min_dist = float('inf')
    closest_tz = '-5:00 America/New_York'
    for loc in gl.locationList:
        dlat = math.radians(loc.m_fLatitude - lat)
        dlon = math.radians(loc.m_fLongitude - lon)
        a = math.sin(dlat/2)**2 + math.cos(math.radians(lat)) * math.cos(math.radians(loc.m_fLatitude)) * math.sin(dlon/2)**2
        dist = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        if dist < min_dist:
            min_dist = dist
            closest_tz = loc.m_strTimeZone
    return closest_tz

def resolve_tzname(tzname):
    if not tzname:
        return '-5:00 America/New_York'
    
    # 1. Try case-insensitive suffix or substring match first
    for tz in GZ.gzone:
        name = tz['name']
        if name.lower().endswith(tzname.lower()) or tzname.lower() in name.lower():
            return name
            
    # 2. Try offset matching using zoneinfo
    try:
        zi = zoneinfo.ZoneInfo(tzname)
        now = datetime.now()
        offset_mins = int(zi.utcoffset(now).total_seconds() / 60.0)
        for tz in GZ.gzone:
            if tz['offset'] == offset_mins:
                return tz['name']
    except Exception as e:
        print(f"Error resolving timezone by offset for {tzname}: {e}", file=sys.stderr)
        
    # Default fallback
    return '-5:00 America/New_York'

def search_external_locations(query):
    if not query or len(query) < 2:
        return []
    
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={urllib.parse.quote(query)}&count=15&language=en&format=json"
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'BhavApp/1.0'}
        )
        with urllib.request.urlopen(req, timeout=5, context=ssl_context) as response:
            data = json.loads(response.read().decode('utf-8'))
            results = data.get('results', [])
            if not results:
                return []
            
            mapped = []
            for r in results:
                city = r.get('name')
                country = r.get('country', '')
                state = r.get('admin1', '')
                lat = r.get('latitude')
                lon = r.get('longitude')
                timezone_iana = r.get('timezone', 'UTC')
                
                if state:
                    display_name = f"{city}, {state} ({country})"
                else:
                    display_name = f"{city} ({country})"
                
                try:
                    zi = zoneinfo.ZoneInfo(timezone_iana)
                    offset = zi.utcoffset(datetime.now()).total_seconds() / 3600.0
                except:
                    offset = 0.0
                    
                # Find matching gaurabda timezone name
                resolved_tz = resolve_tzname(timezone_iana)
                    
                mapped.append({
                    'city': city,
                    'country': country,
                    'name': display_name,
                    'latitude': lat,
                    'longitude': lon,
                    'offset': offset,
                    'tzid': 1,
                    'tzname': resolved_tz
                })
            return mapped
    except Exception as e:
        print(f"Error querying Open-Meteo geocoding: {e}", file=sys.stderr)
        return []

# Custom findLocation endpoint to override gaurabda's default one
def my_find_location():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    if latitude is not None and longitude is not None:
        try:
            lat = float(latitude)
            lon = float(longitude)
        except ValueError:
            return jsonify([])
            
        city = "Coordinated Location"
        country = "Earth"
        display_name = f"Location at {lat:.4f}, {lon:.4f}"
        
        try:
            url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json&accept-language=en"
            req = urllib.request.Request(url, headers={'User-Agent': 'BhavApp/1.0'})
            with urllib.request.urlopen(req, timeout=3, context=ssl_context) as res:
                addr_data = json.loads(res.read().decode('utf-8'))
                address = addr_data.get('address', {})
                city = address.get('city') or address.get('town') or address.get('village') or address.get('suburb') or "Coordinated Location"
                country = address.get('country', "Earth")
                state = address.get('state', '')
                if state:
                    display_name = f"{city}, {state} ({country})"
                else:
                    display_name = f"{city} ({country})"
        except Exception as e:
            # Fallback to closest city name in local database if Nominatim fails
            try:
                import gaurabda.GCLocationList as gl
                gl.OpenFile('')
                min_dist = float('inf')
                closest_loc = None
                for loc in gl.locationList:
                    dlat = math.radians(loc.m_fLatitude - lat)
                    dlon = math.radians(loc.m_fLongitude - lon)
                    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat)) * math.cos(math.radians(loc.m_fLatitude)) * math.sin(dlon/2)**2
                    dist = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
                    if dist < min_dist:
                        min_dist = dist
                        closest_loc = loc
                if closest_loc:
                    city = closest_loc.m_strCity
                    country = closest_loc.m_strCountry
                    display_name = f"{city} ({country})"
            except:
                pass
                
        closest_tz = get_closest_timezone(lat, lon)
        
        try:
            clean_tz = closest_tz.split(' ')[-1] if ' ' in closest_tz else closest_tz
            zi = zoneinfo.ZoneInfo(clean_tz)
            offset = zi.utcoffset(datetime.now()).total_seconds() / 3600.0
        except:
            offset = 0.0
            
        return jsonify([{
            'city': city,
            'country': country,
            'name': display_name,
            'latitude': lat,
            'longitude': lon,
            'offset': offset,
            'tzid': 1,
            'tzname': closest_tz
        }])
        
    else:
        name = request.args.get('name')
        country_query = request.args.get('country')
        
        # Return empty list if search query is too short
        if not name or len(name) < 2:
            return jsonify({
                'EQUALS': [],
                'STARTS': [],
                'CONTAINS': []
            })
            
        results = search_external_locations(name)
        
        # Fallback to local database if external query returns no results
        if not results:
            import gaurabda.GCLocationList as gl
            gl.OpenFile('')
            e, s, c = gl.FindLocations(name, country_query)
            return jsonify({
                'EQUALS': [a.data() for a in e],
                'STARTS': [a.data() for a in s],
                'CONTAINS': [a.data() for a in c]
            })
            
        return jsonify({
            'EQUALS': results,
            'STARTS': [],
            'CONTAINS': []
        })

# Custom getCalendar wrapper to sanitize tzname
original_get_calendar = app.view_functions['getCalendar']

def custom_get_calendar():
    if request.method == 'POST':
        data = request.get_json(silent=True) or {}
        if 'tzname' in data:
            try:
                request.json['tzname'] = resolve_tzname(data['tzname'])
            except Exception as e:
                print(f"Error patching POST tzname: {e}")
    elif request.method == 'GET':
        from werkzeug.datastructures import MultiDict
        try:
            request.args = MultiDict(request.args)
            request.args['tzname'] = resolve_tzname(request.args.get('tzname'))
        except Exception as e:
            print(f"Error patching GET tzname: {e}")
            
    return original_get_calendar()

# Inject the custom endpoints
app.view_functions['findLocation'] = my_find_location
app.view_functions['getCalendar'] = custom_get_calendar

GCAL_PORT = int(os.getenv('PORT', 8047))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=GCAL_PORT)