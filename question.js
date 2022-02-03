const rl = require('readline');

const input = rl.createInterface(process.stdin, process.stdout);

const question = (text = '') => {
  return new Promise((resolve) => {
    input.question(`${text}\n`, (cmd) => {
      resolve(cmd);
    });
  })
  .then((cmd) => {
    input.close();
    
    return cmd;
  });
};

module.exports = question;