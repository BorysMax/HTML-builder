const fs = require('fs');
const path = require('path');
const pathSrc = path.join(__dirname, 'files');
const pathDst = path.join(__dirname, 'files-copy');

fs.exists(pathDst, (exists) => {
    if (exists) {
        console.log('Destination folder already exists!')
    } else {
        fs.mkdir(pathDst, (err) => {
            if (err) console.log(err);
        });    
    }
});

fs.readdir(pathSrc, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            let fileSrc = path.join(pathSrc, file.name);
            let fileDst = path.join(pathDst, file.name);
            fs.copyFile(fileSrc, fileDst, (err) => {
                if (err) console.log(err);
                console.log(`Copied ${file.name}` + '\t' + 'to folder ' + pathDst);
            });
        });    
    }
})
    