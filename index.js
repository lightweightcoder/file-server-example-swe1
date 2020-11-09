// import libraries
import { createServer } from 'http';
import { readFile } from 'fs';
import { extname } from 'path';

// global variables ======================================
// set the PORT number
const PORT = process.argv[2];

// object of extension names as keys and their respective content-types as values
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
};

// helper functions ======================================
// set callback for incoming request
const whenIncomingRequest = (request, response) => {
  console.log('request url', request.url);

  // set file path of file we want to read
  const filePath = `.${request.url}`;

  // get the extension name (eg. .js)
  const extensionName = String(extname(filePath)).toLowerCase();

  // set the content-type according to the extension name of the filePath
  const contentType = mimeTypes[extensionName] || 'application/octet-stream';

  // read the file and respond with the contents of the file
  readFile(filePath, (error, content) => {
    if (error) {
      // response: file not found
      readFile('./404.html', (err, errContent) => {
        response.writeHead(404, {
          'Content-Type': 'text/html',
          'awesome-rocket-academy': 'banana',
        });
        response.end(errContent, 'utf-8');
      });
    } else {
      // response: file is found and show contents
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
};

// Program initialisation ===================================
// create the server
createServer(whenIncomingRequest).listen(PORT);
