const path = require('path');
const fs = require('fs');
const fullpath = __dirname;
let readStream = fs.createReadStream(
    path.join(fullpath, 'text.txt'),
    'utf8'
  );

readStream.on('data', function (chunk) {
  console.log(chunk);
});