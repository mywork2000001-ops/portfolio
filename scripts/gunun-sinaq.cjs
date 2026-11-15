// Günün sınağı siyahısı: Test bankı (HUB P0010) testlərindən src/data/gunun-sinaq.json yaradır.
// İşlət: node scripts/gunun-sinaq.cjs  (HUB qovluğu: ../../Projects)
const fs = require('fs'), path = require('path');
const dir = path.resolve(__dirname, '../../../Projects/P0010_Riyaziyyat_Test_Bank/app/public/lessons/tests');
const files = fs.readdirSync(dir).filter(f => /^p[12]-s\d+-t\d+\.html$/.test(f))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
const list = files.map(f => {
  const t = ((fs.readFileSync(path.join(dir, f), 'utf8').match(/<title>([^<]*)/) || [])[1] || f).replace(/\s+/g, ' ').trim();
  return { p: f, t };
});
fs.writeFileSync(path.resolve(__dirname, '../src/data/gunun-sinaq.json'), JSON.stringify(list, null, 1) + '\n');
console.log('gunun-sinaq.json:', list.length, 'test');
