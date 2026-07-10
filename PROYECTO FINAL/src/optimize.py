import os
import re
from PIL import Image

assets_dir = os.path.join('frontend', 'assets')
frontend_dir = 'frontend'

# Keep track of converted images: { "old_path": { "new_path": ..., "width": ..., "height": ... } }
image_data = {}

# 1. Convert PNG to WebP
for filename in os.listdir(assets_dir):
    if filename.lower().endswith('.png'):
        png_path = os.path.join(assets_dir, filename)
        webp_filename = filename[:-4] + '.webp'
        webp_path = os.path.join(assets_dir, webp_filename)
        
        try:
            with Image.open(png_path) as img:
                width, height = img.size
                # Convert and save as WebP
                img.save(webp_path, 'webp', quality=85)
                
            image_data["assets/" + filename] = {
                "new_src": "assets/" + webp_filename,
                "width": width,
                "height": height
            }
            # Remove original PNG
            os.remove(png_path)
            print(f"Converted {filename} to {webp_filename} ({width}x{height})")
        except Exception as e:
            print(f"Error converting {filename}: {e}")

# 2. Update HTML files
def update_img_tag(match):
    prefix = match.group(1)
    src = match.group(2)
    suffix = match.group(3)
    
    if src in image_data:
        data = image_data[src]
        new_src = data['new_src']
        
        # Check if width and height already exist
        has_width = re.search(r'\bwidth\s*=', prefix + suffix)
        has_height = re.search(r'\bheight\s*=', prefix + suffix)
        
        add_attrs = ""
        if not has_width:
            add_attrs += f' width="{data["width"]}"'
        if not has_height:
            add_attrs += f' height="{data["height"]}"'
            
        return prefix + new_src + suffix[:1] + add_attrs + suffix[1:]
    else:
        # If not converted, just return the original
        return match.group(0)

# Also replace references in JS/CSS just in case (without width/height)
def update_general_refs(content):
    for old_src, data in image_data.items():
        content = content.replace(old_src, data['new_src'])
    return content

for root, dirs, files in os.walk(frontend_dir):
    for filename in files:
        filepath = os.path.join(root, filename)
        if filename.endswith('.html'):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update img tags with src
            img_pattern = re.compile(r'(<img\s+[^>]*?src=["\'])(assets/[^"\']+\.png)(["\'][^>]*>)', re.IGNORECASE)
            new_content = img_pattern.sub(update_img_tag, content)
            
            # General replacement for other occurrences (e.g., CSS styles in HTML, script vars)
            new_content = update_general_refs(new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated HTML: {filepath}")
                
        elif filename.endswith('.css') or filename.endswith('.js'):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = update_general_refs(content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated JS/CSS: {filepath}")

print("Optimization complete.")
