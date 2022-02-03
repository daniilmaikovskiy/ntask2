const fs = require('fs');
const { LOGS_DIR } = require('./consts');

const makeAllDirs = (args = {}) => {
  const userFile = args.f || args.file;

  if (!userFile) {
    return '';
  }

  const userFilePathArray = userFile.split('/');
  
  userFilePathArray.reduce((acc, dir, index) => {
    const currentPath = `${acc}/${dir}`;
  
    if (index + 1 !== userFilePathArray.length) {
      try {
        fs.mkdirSync(currentPath);
      }
      catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
    }
  
    return currentPath;
  }, LOGS_DIR);

  return `${LOGS_DIR}/${userFile}`;
};

module.exports = makeAllDirs;