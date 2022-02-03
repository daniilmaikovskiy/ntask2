const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const question = require('./question');
const getRandomInt = require('./getRandomInt');
const makeAllDirs = require('./makeAllDirs');
const { DEFAULT_LOG_NAME, LOGS_DIR } = require('./consts');

const args = yargs(hideBin(process.argv)).argv;

const trueNumber = getRandomInt(2) + 1;
const userFile = makeAllDirs(args);

const file = userFile || `${LOGS_DIR}/${DEFAULT_LOG_NAME}`;

question('Угадайте число от 1 до 2')
  .then((cmd) => {
    const number = +cmd;

    if (number !== number) {
      throw new Error('Это не число!');
    }

    return number;
  })
  .then((number) => {
    const result = number === trueNumber ? 'Верно' : 'Неверно';

    console.log(`${result}. Это ${trueNumber}`);

    return result === 'Верно' ? 1 : 0;
  })
  .then((number) => {
    fs.promises.appendFile(file, `${number} `)
      .catch(console.error)
  })
  .catch((error) => {
    console.log(error.message);
  });