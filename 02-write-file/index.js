const fs = require('fs');
const path = require('path');
const fullpath = __dirname;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function goodBy() {
  console.log('\n' + 'Goood By!');
  rl.close(); 
}

function writeToFile (inputText) {
    rl.prompt();
    fs.appendFile(path.join(fullpath, 'text.txt'), inputText.trim() + '\n', (error) => {
      if(error) throw error; 
    });
}

fs.open(path.join(fullpath, 'text.txt'), 'w', (error) => {
  if(error) throw error;
});
  
console.log ('Enter the text:');

rl.input.on("keypress", function(chunk, key) {
  if(key && key.name === "c" && key.ctrl) {
    goodBy();
  }
});

rl.setPrompt(`> `);

rl.question(`> `,
(userInput) => {
  if(userInput.trim() === "exit"){
    goodBy();
  } else {
    writeToFile (userInput);
  }

  rl.on('line', (userInput) => {
    if(userInput.trim() === "exit"){
      goodBy();
    } else {
      writeToFile (userInput);
    }
  })
});