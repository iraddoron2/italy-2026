#!/usr/bin/env python3
"""Generate Italy 2026 app icons from the brand logo (black border removed, safe inset)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE_CANDIDATES = [
    ROOT / 'public' / 'brand' / 'italy-icon-source.jpeg',
    Path.home() / 'Downloads' / 'italy-icon.jpeg',
]
PUBLIC = ROOT / 'public'
ICONS = PUBLIC / 'icons'
APP = ROOT / 'src' / 'app'
CREAM = (251, 247, 241)
# Keep artwork inside this inset so rounded iOS / app masks never clip the fork or ribbons.
SAFE = 0.18
SIZE = 1024


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError(
        'Missing italy-icon source. Expected public/brand/italy-icon-source.jpeg '
        'or ~/Downloads/italy-icon.jpeg'
    )


def is_near_black(rgb: tuple[int, int, int], thresh: int = 40) -> bool:
    return max(rgb) <= thresh


def content_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    w, h = im.size
    px = im.load()

    def row_ok(y: int) -> bool:
        step = max(1, w // 300)
        vals = [px[x, y] for x in range(0, w, step)]
        return sum(1 for c in vals if not is_near_black(c)) / len(vals) > 0.12

    def col_ok(x: int) -> bool:
        step = max(1, h // 300)
        vals = [px[x, y] for y in range(0, h, step)]
        return sum(1 for c in vals if not is_near_black(c)) / len(vals) > 0.12

    top = next(y for y in range(h) if row_ok(y))
    bottom = next(y for y in range(h - 1, -1, -1) if row_ok(y))
    left = next(x for x in range(w) if col_ok(x))
    right = next(x for x in range(w - 1, -1, -1) if col_ok(x))
    return left, top, right, bottom


def square_crop(im: Image.Image, bbox: tuple[int, int, int, int]) -> Image.Image:
    left, top, right, bottom = bbox
    w, h = im.size
    side = max(right - left + 1, bottom - top + 1)
    cx = (left + right) / 2
    cy = (top + bottom) / 2
    sq_left = max(0, int(round(cx - side / 2)))
    sq_top = max(0, int(round(cy - side / 2)))
    if sq_left + side > w:
        sq_left = w - side
    if sq_top + side > h:
        sq_top = h - side
    return im.crop((sq_left, sq_top, sq_left + side, sq_top + side))


def scrub_black(im: Image.Image) -> Image.Image:
    out = im.copy()
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if max(r, g, b) <= 70 and abs(g - r) < 18 and abs(g - b) < 18:
                px[x, y] = CREAM
                continue
            nx = abs(x - w / 2) / (w / 2)
            ny = abs(y - h / 2) / (h / 2)
            if (
                max(nx, ny) > 0.88
                and max(r, g, b) <= 90
                and abs(g - r) < 20
                and abs(g - b) < 20
            ):
                px[x, y] = CREAM
    return out


def near_cream(rgb: tuple[int, ...], tol: int = 14) -> bool:
    return all(abs(rgb[i] - CREAM[i]) <= tol for i in range(3))


def art_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    w, h = im.size
    px = im.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if not near_cream(px[x, y]):
                found = True
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if not found:
        raise RuntimeError('No logo artwork found')
    return minx, miny, maxx, maxy


def with_safe_inset(im: Image.Image) -> Image.Image:
    cleaned = scrub_black(im)
    minx, miny, maxx, maxy = art_bbox(cleaned)
    art = cleaned.crop((minx, miny, maxx + 1, maxy + 1))

    canvas = Image.new('RGB', (SIZE, SIZE), CREAM)
    inner = int(SIZE * (1 - 2 * SAFE))
    aw, ah = art.size
    scale = min(inner / aw, inner / ah)
    nw, nh = max(1, int(aw * scale)), max(1, int(ah * scale))
    art_r = art.resize((nw, nh), Image.Resampling.LANCZOS)
    ox = (SIZE - nw) // 2
    oy = (SIZE - nh) // 2
    canvas.paste(art_r, (ox, oy))
    return canvas


def main() -> None:
    source = resolve_source()
    brand_dir = PUBLIC / 'brand'
    brand_dir.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)

    stored = brand_dir / 'italy-icon-source.jpeg'
    if source.resolve() != stored.resolve():
        stored.write_bytes(source.read_bytes())

    original = Image.open(stored).convert('RGB')
    cropped = square_crop(original, content_bbox(original))
    opaque = with_safe_inset(cropped)

    opaque.save(PUBLIC / 'logo-opaque.png', 'PNG', optimize=True)
    opaque.convert('RGBA').save(PUBLIC / 'logo.png', 'PNG', optimize=True)
    opaque.convert('RGBA').save(PUBLIC / 'logo-app.png', 'PNG', optimize=True)

    for name, size in {
        'icon-32.png': 32,
        'icon-180.png': 180,
        'icon-192.png': 192,
        'icon-512.png': 512,
    }.items():
        opaque.resize((size, size), Image.Resampling.LANCZOS).save(
            ICONS / name, 'PNG', optimize=True
        )

    opaque.resize((180, 180), Image.Resampling.LANCZOS).save(
        APP / 'apple-icon.png', 'PNG', optimize=True
    )
    opaque.resize((32, 32), Image.Resampling.LANCZOS).save(
        APP / 'icon.png', 'PNG', optimize=True
    )

    print(f'Source: {stored}')
    print(f'Safe inset: {SAFE:.0%} on {SIZE}px canvas')
    print(f'Wrote logo + PWA icons under {PUBLIC}')


if __name__ == '__main__':
    main()
