"""Draws the app icon (teal tile, white speech bubble, "af") at every size the web and iOS need."""
import pathlib
from PIL import Image, ImageDraw, ImageFont
OUT = pathlib.Path(__file__).resolve().parent.parent / 'www' / 'icons'
OUT.mkdir(parents=True, exist_ok=True)
FONT = 'C:/Windows/Fonts/segoeuib.ttf'

def draw(size, safe=1.0):
    S = 1024
    im = Image.new('RGB', (S, S))
    d = ImageDraw.Draw(im)
    for y in range(S):  # vertical gradient teal -> deep teal
        t = y / S
        d.line([(0, y), (S, y)], fill=(int(20 - 5 * t), int(160 - 66 * t), int(150 - 61 * t)))
    k = safe
    cx, cy = S / 2, S / 2 - 30 * k
    w, h = 640 * k, 470 * k
    box = [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2]
    d.rounded_rectangle(box, radius=150 * k, fill='white')
    d.polygon([(cx - 150 * k, box[3] - 10), (cx - 40 * k, box[3] - 10), (cx - 190 * k, box[3] + 140 * k)], fill='white')
    f = ImageFont.truetype(FONT, int(330 * k))
    d.text((cx, cy - 10 * k), 'af', font=f, fill=(15, 118, 110), anchor='mm')
    r = 46 * k
    d.ellipse([box[2] - 30 * k - r, box[1] - 10 * k - r, box[2] - 30 * k + r, box[1] - 10 * k + r], fill=(245, 158, 11))
    return im.resize((size, size), Image.LANCZOS)

draw(1024).save(OUT / 'icon-1024.png')
draw(512).save(OUT / 'icon-512.png')
draw(192).save(OUT / 'icon-192.png')
draw(180).save(OUT / 'apple-touch-icon.png')
draw(512, safe=0.78).save(OUT / 'icon-512-maskable.png')
print('icons written')
