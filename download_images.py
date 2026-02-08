
import json
import os
import urllib.request
import time

json_path = '/Users/nguyenminhtri/.gemini/antigravity/scratch/TringuyenCV/projects_data.json'
base_dir = '/Users/nguyenminhtri/.gemini/antigravity/scratch/TringuyenCV'
image_subdir = 'images/projects'
output_dir = os.path.join(base_dir, image_subdir)

print(f"Loading JSON from {json_path}")

try:
    with open(json_path, 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"Error: {json_path} not found.")
    exit(1)

download_count = 0
error_count = 0

for project in data:
    pid = project.get('id', 'unknown')
    print(f"Processing project: {pid}...")
    
    mapping = {
        'thumbnail': '_thumb.jpg',
        'heroImage': '_hero.jpg',
        'artImage': '_art.jpg'
    }
    
    for key, suffix in mapping.items():
        original_url = project.get(key)
        if not original_url:
            continue
            
        if original_url.startswith('http'):
            # Only download if it's a URL
            filename = f"{pid}{suffix}"
            filepath = os.path.join(output_dir, filename)
            relative_path = f"{image_subdir}/{filename}"
            
            print(f"  Downloading {key}: {original_url} -> {filename}")
            
            try:
                # Add headers to avoid some 403s
                req = urllib.request.Request(
                    original_url, 
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                
                with urllib.request.urlopen(req) as response:
                    content = response.read()
                    with open(filepath, 'wb') as out_file:
                        out_file.write(content)
                
                # Update JSON entry
                project[key] = relative_path
                download_count += 1
                
                # Sleep a bit to be polite
                time.sleep(1)
                
            except Exception as e:
                print(f"  Error downloading {original_url}: {e}")
                error_count += 1
        else:
            print(f"  Skipping {key} (already local or invalid): {original_url}")

# Save updated JSON
print(f"Saving updated JSON to {json_path}...")
with open(json_path, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Download complete. {download_count} files downloaded, {error_count} errors.")
