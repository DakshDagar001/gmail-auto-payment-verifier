import requests
import json
import os

API_BASE = os.getenv('API_BASE_URL', 'http://localhost:3000')
API_KEY = os.getenv('API_KEY', 'your_super_secret_api_key_here')

def refresh_payments():
    print("Triggering manual payment verification refresh...")
    try:
        url = f"{API_BASE}/api/verify/manual-refresh"
        headers = {
            "x-api-key": API_KEY
        }
        
        response = requests.post(url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        print(f"Success! Found {data['count']} new transactions.")
        print(json.dumps(data['data'], indent=2))
        
        return data['data']
        
    except requests.exceptions.RequestException as e:
        print(f"Error communicating with verification server: {e}")
        return []

if __name__ == "__main__":
    refresh_payments()
