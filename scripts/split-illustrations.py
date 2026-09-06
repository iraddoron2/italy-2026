#!/usr/bin/env python3
"""Split italy-items.png into named transparent illustration PNGs."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE_CANDIDATES = [
    ROOT / 'public' / 'brand' / 'italy-items-source.png',
    Path.home() / 'Downloads' / 'italy-items.png',
]
OUT = ROOT / 'public' / 'illustrations'

ITEMS = [
    ('pizza-slice', 'Pizza slice'),
    ('margherita-pizza', 'Margherita pizza'),
    ('parmesan-and-pasta', 'Parmesan & pasta'),
    ('spaghetti-bowl', 'Spaghetti bowl'),
    ('red-wine', 'Red wine'),
    ('olive-oil', 'Olive oil'),
    ('lemon', 'Lemon'),
    ('gelato-cone', 'Gelato cone'),
    ('espresso-moka', 'Espresso & moka'),
    ('tomatoes-and-basil', 'Tomatoes & basil'),
    ('colosseum', 'Colosseum'),
    ('leaning-tower-of-pisa', 'Leaning Tower of Pisa'),
    ('venice-gondola', 'Venice gondola'),
    ('florence-duomo', 'Florence Duomo'),
    ('corinthian-capital', 'Corinthian capital'),
    ('david-bust', 'David bust'),
    ('amalfi-coast', 'Amalfi Coast'),
    ('umbrella-pines', 'Umbrella pines'),
    ('vespa-scooter', 'Vespa scooter'),
    ('italy-flag', 'Italy flag'),
]

ROWS, COLS = 4, 5
THRESH = 18
SCALE = 2
PAD = 24


def resolve_source() -> Path:
    for path in SOURCE_CANDIDATES:
        if path.is_file():
            return path
    raise FileNotFoundError('Missing italy-items.png source')


def main() -> None:
    source = resolve_source()
    brand = ROOT / 'public' / 'brand'
    brand.mkdir(parents=True, exist_ok=True)
    stored = brand / 'italy-items-source.png'
    if source.resolve() != stored.resolve():
        stored.write_bytes(source.read_bytes())

    src = Image.open(stored).convert('RGBA')
    w, h = src.size
    px = src.load()

    def is_fg(x: int, y: int) -> bool:
        if not (0 <= x < w and 0 <= y < h):
            return False
        r, g, b, a = px[x, y]
        return a >= 8 and max(r, g, b) > THRESH

    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            if is_fg(x, y):
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)

    cell_w = (maxx - minx + 1) / COLS
    cell_h = (maxy - miny + 1) / ROWS

    sw, sh = w // SCALE, h // SCALE
    small = src.resize((sw, sh), Image.Resampling.BILINEAR)
    sp = small.load()

    def sfg(x: int, y: int) -> bool:
        if not (0 <= x < sw and 0 <= y < sh):
            return False
        r, g, b, a = sp[x, y]
        return a >= 8 and max(r, g, b) > THRESH

    visited = [[False] * sw for _ in range(sh)]
    comps: list[dict[str, object]] = []
    for y in range(sh):
        for x in range(sw):
            if visited[y][x] or not sfg(x, y):
                continue
            q = deque([(x, y)])
            visited[y][x] = True
            xs = [x]
            ys = [y]
            count = 0
            while q:
                cx, cy = q.popleft()
                count += 1
                for nx, ny in (
                    (cx + 1, cy),
                    (cx - 1, cy),
                    (cx, cy + 1),
                    (cx, cy - 1),
                ):
                    if (
                        0 <= nx < sw
                        and 0 <= ny < sh
                        and not visited[ny][nx]
                        and sfg(nx, ny)
                    ):
                        visited[ny][nx] = True
                        q.append((nx, ny))
                        xs.append(nx)
                        ys.append(ny)
            if count < 40:
                continue
            bx0, bx1 = min(xs), max(xs)
            by0, by1 = min(ys), max(ys)
            comps.append(
                {
                    'bbox': (
                        bx0 * SCALE,
                        by0 * SCALE,
                        (bx1 + 1) * SCALE,
                        (by1 + 1) * SCALE,
                    ),
                    'cx': (bx0 + bx1) / 2 * SCALE,
                    'cy': (by0 + by1) / 2 * SCALE,
                }
            )

    cell_boxes: dict[int, list[int] | None] = {i: None for i in range(20)}
    for c in comps:
        ci = min(COLS - 1, max(0, int((float(c['cx']) - minx) / cell_w)))
        ri = min(ROWS - 1, max(0, int((float(c['cy']) - miny) / cell_h)))
        idx = ri * COLS + ci
        b = list(c['bbox'])  # type: ignore[arg-type]
        if cell_boxes[idx] is None:
            cell_boxes[idx] = b
        else:
            cb = cell_boxes[idx]
            assert cb is not None
            cb[0] = min(cb[0], b[0])
            cb[1] = min(cb[1], b[1])
            cb[2] = max(cb[2], b[2])
            cb[3] = max(cb[3], b[3])

    def grow_bbox(box: list[int], max_grow: int = 32) -> list[int]:
        x0, y0, x1, y1 = box
        for _ in range(max_grow):
            changed = False
            if y0 > 0 and any(is_fg(x, y0 - 1) for x in range(x0, x1)):
                y0 -= 1
                changed = True
            if y1 < h and any(is_fg(x, y1) for x in range(x0, x1)):
                y1 += 1
                changed = True
            if x0 > 0 and any(is_fg(x0 - 1, y) for y in range(y0, y1)):
                x0 -= 1
                changed = True
            if x1 < w and any(is_fg(x1, y) for y in range(y0, y1)):
                x1 += 1
                changed = True
            if not changed:
                break
        return [x0, y0, x1, y1]

    OUT.mkdir(parents=True, exist_ok=True)
    for debug in OUT.glob('_debug-*.png'):
        debug.unlink()

    for i, (slug, _label) in enumerate(ITEMS):
        box = cell_boxes[i]
        if box is None:
            raise RuntimeError(f'No pixels for {slug}')
        x0, y0, x1, y1 = grow_bbox(box)
        x0 = max(0, x0 - 6)
        y0 = max(0, y0 - 6)
        x1 = min(w, x1 + 6)
        y1 = min(h, y1 + 6)

        crop = src.crop((x0, y0, x1, y1))
        cpx = crop.load()
        cw, ch = crop.size
        for y in range(ch):
            for x in range(cw):
                r, g, b, a = cpx[x, y]
                if a < 8 or max(r, g, b) <= THRESH:
                    cpx[x, y] = (0, 0, 0, 0)

        bbox = crop.getbbox()
        if bbox:
            crop = crop.crop(bbox)

        padded = Image.new(
            'RGBA',
            (crop.size[0] + PAD * 2, crop.size[1] + PAD * 2),
            (0, 0, 0, 0),
        )
        padded.paste(crop, (PAD, PAD))
        padded.save(OUT / f'{slug}.png', 'PNG', optimize=True)
        print(f'{slug}: {padded.size[0]}x{padded.size[1]}')

    print(f'Wrote {len(ITEMS)} illustrations to {OUT}')


if __name__ == '__main__':
    main()
