const path  = require('path'); // to make sure we alaways usr or generate a valid path ..
const fs  = require('fs');
const solc = require('solc'); //require the compiler 

// dirname is a constant that is defined by a node . it alaways get a set of current working directory 
const indexPath = path.resolve(__dirname  , 'contracts' , 'index.sol' );
const source  = fs.readFileSync(indexPath , 'utf8');// going to read the content of the file  
// to compile you have to provide the source code .. and the number of contract to be compiled 
module.exports = solc.compile(source , 1).contracts[':Inbox'];

