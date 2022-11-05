const fs = require('fs');
const path = require('path');
const pathSrc = path.join(__dirname, 'styles');
const pathDst = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'project-dist', 'assets');
const fileBundle = path.join(__dirname, 'project-dist', 'style.css');

function makeDir (pathDir) {
  fs.exists(pathDir, (exists) => {
    if (exists) {
        console.log(`${pathDir}  folder already exists!`)
    } else {
        fs.mkdir(pathDir, (err) => {
            if (err) console.log(err);
        });    
    }
  });
}

makeDir(pathDst);
makeDir(pathAssets);

fs.open(fileBundle, 'w', (err) => {
  if(err) console.log(err);
});

fs.readdir(pathSrc, { withFileTypes: true }, (err, files) => {
  if (err) {
      console.log(err);
  } else {
    files.forEach(file => {
      if (path.extname(file.name) === '.css') {
        let fileSrc = path.join(pathSrc, file.name);
        console.log(file.name + '\t' + 'append to bundle.css');
        fs.readFile(fileSrc, "utf8", (err, data) => {
          if(err) {s
            console.log(err); 
          } else {
            fs.appendFile(fileBundle, data, (err) => {
              if(err) console.log(err); 
            });    
          }  
        });
      }  
    });    
  }
})

function copyFileFromDir (pathSrc, pathDst) {
  fs.readdir(pathSrc, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
      files.forEach(file => {
          let fileSrc = path.join(pathSrc, file.name);
          let fileDst = path.join(pathDst, file.name);
          if (file.isDirectory()) {
            makeDir(fileDst);
            console.log(`Copied Folder ${file.name}` + '\t' + 'to folder ' + pathDst);
            copyFileFromDir (path.join(pathSrc, file.name), path.join(pathDst, file.name));
          } else {
            fs.copyFile(fileSrc, fileDst, (err) => {
              if (err) console.log(err);
              console.log(`Copied File ${file.name}` + '\t' + 'to folder ' + pathDst);
            })
          }
      });    
    }
  })
}

copyFileFromDir (path.join(__dirname, 'assets'), path.join(pathDst, 'assets'));

