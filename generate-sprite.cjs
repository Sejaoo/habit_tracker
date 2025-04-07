const SVGSpriter = require('svg-sprite');
const fs = require('fs');
const path = require('path');

const spriter = new SVGSpriter({
  dest: 'src/assets',
  mode: { symbol: { sprite: 'daily-basis-sprite.svg' } },
});

const iconsDir = path.resolve(__dirname, 'src/icons');
const files = fs.readdirSync(iconsDir);
files.forEach(file => {
  if (file.endsWith('.svg')) {
    const filePath = path.join(iconsDir, file);
    spriter.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
  }
});

spriter.compile((error, result) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  fs.mkdirSync('src/assets', { recursive: true });
  let content = result.symbol.sprite.contents.toString();
  content = content.replace(/id="\d{3}-([^"]+)"/g, 'id="$1"');
  fs.writeFileSync(path.join(__dirname, 'src/assets/daily-basis-sprite.svg'), content);
  console.log('Generated successfully!');
});