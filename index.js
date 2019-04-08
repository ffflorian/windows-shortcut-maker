const child_process = require('child_process'),
  fs = require('fs');

const isString = variable => {
  return typeof variable === 'string' || Object.prototype.toString.call(variable) === '[object String]';
};

// Used extract the file name from a given file path
const getName = path => {
  return path
    .split('\\')
    .pop()
    .split('/')
    .pop();
};

const makeSync = options => {
  if (options.force || fs.existsSync(options.filepath) === false) {
    return new Error('File "' + options.filepath + '" does not exist');
  }

  const rawName = getName(options.filepath).split('.')[0];
  options.lnkName = isString(options.lnkName) ? options.lnkName : rawName;
  options.lnkArgs = isString(options.lnkArgs) ? options.lnkArgs : '';
  options.lnkDes = isString(options.lnkDes) ? options.lnkDes : rawName;
  options.lnkCwd = isString(options.lnkCwd) ? options.lnkCwd : '';
  options.lnkIco = isString(options.lnkIco) ? options.lnkIco : options.filepath;
  options.lnkWin = isString(options.lnkWin) ? options.lnkWin : 4;
  options.lnkHtk = isString(options.lnkHtk) ? options.lnkHtk : '';

  child_process.spawnSync('wscript', [
    __dirname + '\\scripts\\lnk.vbs',
    options.filepath,
    options.lnkName,
    options.lnkArgs,
    options.lnkDes,
    options.lnkCwd,
    options.lnkIco,
    options.lnkWin,
    options.lnkHtk,
  ]);
};

const make = options => {
  return new Promise((resolve, reject) => {
    return fs.exists(options.filepath, exists => {
      return exists || options.force ? resolve() : reject(new Error('File "' + options.filepath + '" does not exist'));
    });
  }).then(() => {
    const rawName = getName(options.filepath).split('.')[0];
    options.lnkName = !isString(options.lnkName) ? rawName : options.lnkName;
    options.lnkArgs = !isString(options.lnkArgs) ? '' : options.lnkArgs;
    options.lnkDes = !isString(options.lnkDes) ? rawName : options.lnkDes;
    options.lnkCwd = !isString(options.lnkCwd) ? '' : options.lnkCwd;
    options.lnkIco = !isString(options.lnkIco) ? options.filepath : options.lnkIco;
    options.lnkWin = !isString(options.lnkWin) ? 4 : options.lnkWin;
    options.lnkHtk = !isString(options.lnkHtk) ? '' : options.lnkHtk;

    return new Promise((resolve, reject) => {
      child_process
        .spawn('wscript', [
          __dirname + '\\scripts\\lnk.vbs',
          options.filepath,
          options.lnkName,
          options.lnkArgs,
          options.lnkDes,
          options.lnkCwd,
          options.lnkIco,
          options.lnkWin,
          options.lnkHtk,
        ])
        .on('error', error => reject(error))
        .on('exit', () => resolve());
    });
  });
};

module.exports = {
  make,
  makeSync,
};
