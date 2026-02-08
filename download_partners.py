
import os
import urllib.request
import urllib.error

partners = {
    "ninety_eight": "https://s2.coinmarketcap.com/static/img/coins/200x200/10903.png", # Coin98
    "heineken": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Heineken_logo.svg/512px-Heineken_logo.svg.png",
    "dena": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/DeNA_logo.svg/512px-DeNA_logo.svg.png",
    "bandai_namco": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Bandai_Namco_Holdings_logo.svg/512px-Bandai_Namco_Holdings_logo.svg.png",
    "gameloft": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Gameloft_Logo_2020.svg/512px-Gameloft_Logo_2020.svg.png"
}

output_dir = 'images/partners'
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

for name, url in partners.items():
    filename = f"{name}.png"
    filepath = os.path.join(output_dir, filename)
    print(f"Downloading {name} from {url}...")
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = response.read()
            with open(filepath, 'wb') as f:
                f.write(data)
        print(f"  Success: {filename}")
    except Exception as e:
        print(f"  Failed to download {name}: {e}")
        # Create a placeholder if download fails so the layout works
        # (Though in real scenario we'd want to retry or fix URL, for now placeholder helps)
        pass
