const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { DEFAULT_LOG_NAME, LOGS_DIR } = require('./consts');

const args = yargs(hideBin(process.argv)).argv;

const userFile = args.f || args.file;

if (userFile) {
  
}

const file = `${LOGS_DIR}/${userFile || DEFAULT_LOG_NAME}`;

const readerStream = fs.createReadStream(file, { highWaterMark: 32768 });

let data = '';

readerStream.on('data', (chunk) => {
  data += chunk;
});

readerStream.on('end', () => {
  const dataArray = data.split(' ').filter((value) => value);
  
  const amount = dataArray.length;
  const wins = dataArray.reduce((acc, value) => acc + +value, 0);
  const fails = amount - wins;

  const winsPercent = wins / amount * 100;

  console.log(`Общее количество партий: \n${amount}`);
  console.log(`Количество выигранных / проигранных партий: \n${wins} / ${fails}`);
  console.log(`Процентное соотношение выигранных партий: \n${winsPercent} процентов`);
});