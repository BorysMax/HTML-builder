const fs = require('fs');
const path = require('path');
const pathSrc = path.join(__dirname, 'styles');
const fileBundle = path.join(__dirname, 'project-dist', 'bundle.css');

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
        console.log(`${file.name} append to bundle.css`);
        fs.readFile(fileSrc, "utf8", (err, data) => {
          if(err) {
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