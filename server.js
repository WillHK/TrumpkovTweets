const fs = require('fs');
// const markov = require('markov');
// require('dotenv').config();

// let m = markov(1);
// let s = fs.createReadStream(__dirname + '/tweets.txt');
// m.seed(s, function() {
//   var stdin = process.openStdin();
//   console.log('> ');
  
//   stdin.on('data', function (line) {
//       var res = m.respond(line.toString()).join(' ');
//       console.log(res);
//       console.log('> ');
//   });
// });

const MarkovChain = require('markovchain');
let quotes = new MarkovChain(fs.readFileSync('./tweets.txt', 'utf8'));

console.log(quotes.start('The').end(10).process());

