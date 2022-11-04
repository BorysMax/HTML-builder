const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathDir, { withFileTypes: true }, (error, data) => {
    if(error) {
        throw error; 
    } else {
        data.forEach(file => {
            let pathFile = path.join(pathDir, file.name);
            fs.stat(pathFile, function (error, stats) {
                if (error) {
                    throw error;
                } else {
                    console.log(
                        path.parse(pathFile).name + '\t' + 
                        path.parse(pathFile).ext.slice(1) + '\t' + 
                        (stats.size/1024).toFixed(2) + '\t'+ 
                        'kB');
                }
            })    
        })
    }
})