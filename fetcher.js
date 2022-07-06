const info = process.argv.slice(2);
const hostTemp = info[0].replace("http://", "");
let host;
if (info[0].includes("http://")) {
   host = info[0].slice(7);
   if (host.endsWith("/")) {
     host = host.slice(0, -1)
   }
} else if (info[0].includes("https://")) {
  host = info[0].slice(8);
  if (host.endsWith("/")) {
    host = host.slice(0, -1)
  }
} 


const location = info[1]
const fs = require('fs');
const net = require('net');
const port = 80;


const conn = net.createConnection({ 
  host: host,
  port: 80,
});
conn.setEncoding('UTF8');



conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: example.edu\r\n`);
  conn.write(`\r\n`);
});



conn.on('data', (data) => {
  const content = data;


fs.exists(location, function (isExist) {
  if (isExist) {
    console.log("File Already Exists")
  } else {
    fs.writeFile(`${location}`, content, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    setTimeout(() => {
      fs.stat(location, (err, stats) => {
        if (err) {
            console.log(`File doesn't exist.`);
        } else {
            console.log(`Downloaded and saved ${stats.size} bytes to ${location}`)
        }
    }, 100);

  });






  }
});



  conn.end();
});