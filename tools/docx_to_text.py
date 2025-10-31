import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

if len(sys.argv) < 3:
    print('Usage: python docx_to_text.py <input.docx> <output.txt>')
    sys.exit(1)

infile = Path(sys.argv[1])
outfile = Path(sys.argv[2])

if not infile.exists():
    print(f'Input file not found: {infile}')
    sys.exit(2)

with zipfile.ZipFile(infile, 'r') as z:
    try:
        xml = z.read('word/document.xml')
    except KeyError:
        print('document.xml not found in docx')
        sys.exit(3)

# Parse XML and extract text from <w:t> elements
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
root = ET.fromstring(xml)
texts = [t.text for t in root.findall('.//w:t', ns) if t.text]
# Join with spaces and newlines where appropriate by detecting paragraph tags
paragraphs = []
for p in root.findall('.//w:p', ns):
    texts_in_p = [t.text for t in p.findall('.//w:t', ns) if t.text]
    if texts_in_p:
        paragraphs.append(''.join(texts_in_p))

outfile.write_text('\n\n'.join(paragraphs), encoding='utf-8')
print(f'Wrote text to {outfile}')
