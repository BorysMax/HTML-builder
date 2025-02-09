const fs = require('fs');
const path = require('path');
const pathSrc = path.join(__dirname, 'styles');
const pathHtml = path.join(__dirname, 'components');
const pathTempHtml = path.join(__dirname, 'template.html');
const pathDst = path.join(__dirname, 'project-dist');
const pathAssets = path.join(__dirname, 'assets');
const pathBundAssets = path.join(pathDst, 'assets');
const fileBundCss = path.join(pathDst, 'style.css');
const fileBundHtml = path.join(pathDst, 'index.html');

let resArray = [];

makeDir(pathDst);
makeDir(pathBundAssets);
copyFilesFromDir (pathAssets, pathBundAssets);

fs.open(fileBundCss, 'w', (err) => {
  if(err) console.log(err);
});

const createIndexHtml = async () => {
  let dataTemp = await fs.promises.readFile(pathTempHtml, 'utf8');
  let dataHeader = await fs.promises.readFile(path.join(pathHtml, 'header.html'), 'utf8');
  let dataFooter = await fs.promises.readFile(path.join(pathHtml, 'footer.html'), 'utf8');
  let dataArt = await fs.promises.readFile(path.join(pathHtml, 'articles.html'), 'utf8');
  let array = addArray (dataTemp, 0);
  for(i in array) {
    resArray.push(array[i]);
    if (array[i].trim() === '{{header}}') {
      console.log('Header!');
      resArray.pop(array[i]);
      resArray = resArray.concat(addArray(dataHeader, 4));
    } else if (array[i].trim() === '{{footer}}') {
      console.log('Footer!');
      resArray.pop(array[i]);
      resArray = resArray.concat(addArray(dataFooter, 4));
    } else if (array[i].trim() === '{{articles}}') {
      console.log('Articles!');
      resArray.pop(array[i]);
      resArray = resArray.concat(addArray(dataArt, 6));
    }
  }  
  writeToFile (resArray);
};
  
createIndexHtml().catch(console.error);

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
            fs.appendFile(fileBundCss, data, (err) => {
              if(err) console.log(err); 
            });    
          }  
        });
      }  
    });    
  }
})

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

function copyFilesFromDir (pathSrc, pathDst) {
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
            copyFilesFromDir (path.join(pathSrc, file.name), path.join(pathDst, file.name));
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

function addArray (data, spaceNum) {
  let array = data.toString().split("\n").map(item => item = " ".repeat(spaceNum) + item); 
  return array;
}

function writeToFile (inputArr) {
  let content = inputArr.join("\n");
  fs.writeFile(fileBundHtml, content, (err) => {
    if(err) console.log(err); 
  });    
}