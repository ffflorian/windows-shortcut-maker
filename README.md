# windows-shortcut-maker

Native and lightweight module to make file shortcuts on Windows using Node.js.

Based on https://github.com/phtdacosta/windows-shortcut-maker.

[![npm version](https://img.shields.io/npm/v/@ffflorian/windows-shortcut-maker.svg)](https://www.npmjs.com/package/@ffflorian/windows-shortcut-maker) [![NpmLicense](https://img.shields.io/npm/l/@ffflorian/windows-shortcut-maker.svg)](https://www.npmjs.com/package/@ffflorian/windows-shortcut-maker)

This module uses a Windows VBScript file to get native access to the operational system API responsible for making file shortcuts.

## Why this module is great?

- Although it is native, there is no need to compile anything.
- It is totally open source and uses no binary files, no external dependencies and no bizarre workarounds.
- Supports all Windows NT 4.0 (and beyond) systems.
- The module is extremely small and provides access to the entire API.

### Installation:

```
$ npm install @ffflorian/windows-shortcut-maker --save
```

## Basic usage:

```js
// Requires the Windows Shortcut Maker module
const sm = require('windows-shortcut-maker');

// Creates an object to store any and all parameters to be passed to the Windows API
const options = {
  filepath: 'C:\\Program Files\\GIMP 2\\bin\\gimp-2.8.exe',
};

// Creates a "GIMP" shortcut file in the desktop
try {
  sm.makeSync(options);
} catch (error) {
  console.log(error);
}

// Asynchronously creates a "GIMP" shortcut file in the desktop
sm
  .make(options)
  .catch(error => {
    console.log(error)
  }
```

# Documentation

## `makeSync(options)`

> Returns `void` after synchronously executing the wrapped script which makes the Windows API calls or throws an `Error` if no valid `filepath` parameter property was previously specified.

**`options`** is an `Object` that organizedly stores the properties used by the function. Each one is covered below.

**`options.filepath`** is the absolute path including the name of which file should the module make a shortcut. **It is required** for the function to work.

**Optional:** **`options.lnkName`** is the name given for the new shortcut file which obeys the same name rules as a regular file does.

**Optional:** **`options.force`** create the shortcut even if the original file cannot be found.

**Optional:** **`options.lnkArgs`** are the arguments passed to the original file when the new shortcut is executed.

**Optional:** **`options.lnkDes`** is the description message shown when the cursor stands over the new shortcut without clicking it.

**Optional:** **`options.lnkCwd`** is the absolute path in which folder the original file should start executing.

**Optional:** **`options.lnkIco`** is the absolute path to an `.ico` extension image used as the icon for the new shortcut.

**Optional:** **`options.lnkWin`** is the initial window mode adopted by the original file when executed. (e.g. `3` is maximized, `4` is normal and `7` is minimized)

**Optional:** **`options.lnkHtk`** is the key combination that is going to trigger the new shortcut execution. (e.g. `'ALT+CTRL+F'`)

## `make(options)`

> Returns `void` after asynchronously executing the wrapped script which makes the Windows API calls or throws an `Error` if no valid `filepath` parameter property was previously specified.
> The API is the same as `makeSync()`

# License

This project exists under the [GPL-3.0 license](LICENSE).

# Development

1. Let developers to make shortcuts anywhere.
2. Add support for making internet shortcuts.
