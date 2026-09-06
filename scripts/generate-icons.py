#!/usr/bin/env python3
"""Regenerate Italy 2026 placeholder app icons."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'icons'
APP = ROOT / 'src' / 'app'

GREEN = (0, 140, 69)
WHITE = (244, 245, 240)
RED = (205, 33, 42)
GOLD = (232, 197, 71)


def make_icon(size: int) -> Image.Image:
    img = Image.new('RGB', (size, size), WHITE)
    draw = ImageDraw.Draw(img)
    third = size // 3
    draw.rectangle([0, 0, third, size], fill=GREEN)
    draw.rectangle([third, 0, third * 2, size], fill=WHITE)
    draw.rectangle([third * 2, 0, size, size], fill=RED)

    pad = int(size * 0.08)
    overlay = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse(
        [pad, pad, size - pad, size - pad],
        outline=(15, 42, 58, 40),
        width=max(2, size // 64),
    )

    badge_r = int(size * 0.28)
    cx = cy = size // 2
    od.ellipse(
        [cx - badge_r, cy - badge_r, cx + badge_r, cy + badge_r],
        fill=(15, 42, 58, 230),
    )
    img = Image.alpha_composite(img.convert('RGBA'), overlay)
    draw = ImageDraw.Draw(img)

    try:
        font_big = ImageFont.truetype(
            '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
            int(size * 0.22),
        )
        font_sm = ImageFont.truetype(
            '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
            int(size * 0.12),
        )
    except OSError:
        font_big = ImageFont.load_default()
        font_sm = font_big

    label = 'IT'
    bbox = draw.textbbox((0, 0), label, font=font_big)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        (cx - tw / 2, cy - th / 2 - size * 0.06),
        label,
        fill=GOLD,
        font=font_big,
    )

    year = '2026'
    bbox2 = draw.textbbox((0, 0), year, font=font_sm)
    tw2 = bbox2[2] - bbox2[0]
    draw.text(
        (cx - tw2 / 2, cy + size * 0.06),
        year,
        fill=WHITE,
        font=font_sm,
    )

    return img.convert('RGB')


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, size in {
        'icon-180.png': 180,
        'icon-192.png': 192,
        'icon-512.png': 512,
        'icon-32.png': 32,
    }.items():
        make_icon(size).save(OUT / name, 'PNG', optimize=True)

    make_icon(180).save(APP / 'apple-icon.png', 'PNG', optimize=True)
    make_icon(32).save(APP / 'icon.png', 'PNG', optimize=True)
    print(f'Icons written to {OUT} and {APP}')


if __name__ == '__main__':
    main()
