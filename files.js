const fs = require('fs');

fs.readFile('./file.txt','utf-8',(error, data) => {
  console.log(data);
});