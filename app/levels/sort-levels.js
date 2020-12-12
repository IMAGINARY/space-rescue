// Sorts a level file according to the number of occuring "o"s. (smaller might be more interesting)

var fs = require('fs');

var contents = fs.readFileSync(process.argv[2], 'utf8');

const levelRegExp = /.*\n([\.oS]{7}\n){6}([\.oS]{7})/g;
const processLevelFile = f => f.match(levelRegExp);

const pairs = processLevelFile(contents).map(levelstr => [levelstr.match(/o/g).length, levelstr]);
const sorted = pairs.sort((a, b) => a[0] - b[0]).map(x => x[1]).join('\n\n');

console.log(sorted);
