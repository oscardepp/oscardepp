#!/usr/bin/env python3

from pathlib import Path
import sys

TRANSLATIONS = str.maketrans({
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2013": "-",
    "\u2014": "-",
    "\u2026": "...",
    "\u00a0": " ",
})

for filename in sys.argv[1:]:
    path = Path(filename)

    try:
        text = path.read_text()
    except UnicodeDecodeError:
        continue

    normalized = text.translate(TRANSLATIONS)

    if normalized != text:
        path.write_text(normalized)