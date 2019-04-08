const child_process = require('child_process'),
    fs = require('fs')

const isString = (variable) => {
    return (typeof variable === 'string' || Object.prototype.toString.call(variable) === '[object String]')
}

// Used extract the file name from a given file path
const getName = (path) => {
    return path.split('\\').pop().split('/').pop()
}

const makeSync = (options) => {
    if (options.force || fs.existsSync(options.filepath) === false) return new Error('File "'+ options.filepath +'" does not exist')
    const rawName = getName(options.filepath).split('.')[0]
    if (isString(options.lnkName) === false) options.lnkName = rawName
    if (isString(options.lnkArgs) === false) options.lnkArgs = ''
    if (isString(options.lnkDes) === false) options.lnkDes = rawName
    if (isString(options.lnkCwd) === false) options.lnkCwd = ''
    if (isString(options.lnkIco) === false) options.lnkIco = options.filepath
    if (isString(options.lnkWin) === false) options.lnkWin = 4
    if (isString(options.lnkHtk) === false) options.lnkHtk = ''
    child_process.spawnSync(
        'wscript',
        [__dirname + '\\scripts\\lnk.vbs',
        options.filepath,
        options.lnkName,
        options.lnkArgs,
        options.lnkDes,
        options.lnkCwd,
        options.lnkIco,
        options.lnkWin,
        options.lnkHtk
        ]
    )
}

const make = (options) => {
    return new Promise((resolve, reject) => {
        return fs.exists(options.filepath, exists => {
            return exists || options.force ? resolve() : reject(new Error('File "'+ options.filepath +'" does not exist'));
        });
    }).then(() => {
        const rawName = getName(options.filepath).split('.')[0]
        if (isString(options.lnkName) === false) options.lnkName = rawName
        if (isString(options.lnkArgs) === false) options.lnkArgs = ''
        if (isString(options.lnkDes) === false) options.lnkDes = rawName
        if (isString(options.lnkCwd) === false) options.lnkCwd = ''
        if (isString(options.lnkIco) === false) options.lnkIco = options.filepath
        if (isString(options.lnkWin) === false) options.lnkWin = 4
        if (isString(options.lnkHtk) === false) options.lnkHtk = ''

        return new Promise((resolve, reject) => {
            child_process.spawn(
                'wscript',
                [__dirname + '\\scripts\\lnk.vbs',
                options.filepath,
                options.lnkName,
                options.lnkArgs,
                options.lnkDes,
                options.lnkCwd,
                options.lnkIco,
                options.lnkWin,
                options.lnkHtk
                ],
            )
            .on('error', error => reject(error))
            .on('exit', () => resolve())
        });
    });
}

module.exports = {
    make: make,
    makeSync: makeSync
}
