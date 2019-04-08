import {spawn, spawnSync} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface ShortcutOptions {
  /** the absolute path including the name of which file should the module make a shortcut (required). */
  filepath: string;
  /** create the shortcut even if the original file cannot be found. */
  force?: boolean;
  /** the arguments passed to the original file when the new shortcut is executed. */
  lnkArgs?: string;
  /** the absolute path in which folder the original file should start executing. */
  lnkCwd?: string;
  /** the description message shown when the cursor stands over the new shortcut without clicking it. */
  lnkDes?: string;
  /** the key combination that is going to trigger the new shortcut execution. (e.g. `'ALT+CTRL+F'`) */
  lnkHtk?: string;
  /** the absolute path to an `.ico` extension image used as the icon for the new shortcut. */
  lnkIco?: string;
  /** the name given for the new shortcut file which obeys the same name rules as a regular file does. */
  lnkName?: string;
  /** the initial window mode adopted by the original file when executed. (e.g. `3` is maximized, `4` is normal and `7` is minimized) */
  lnkWin?: number;
}

const checkOptions = (options: ShortcutOptions): Required<ShortcutOptions> => {
  const rawName = path.basename(options.filepath);
  const defaultOptions = {
    filepath: options.filepath,
    force: false,
    lnkArgs: '',
    lnkCwd: '',
    lnkDes: rawName,
    lnkHtk: '',
    lnkIco: options.filepath,
    lnkName: rawName,
    lnkWin: 4,
  };
  return {
    ...defaultOptions,
    ...options,
  };
};

function prepare(options: ShortcutOptions | string): Required<ShortcutOptions> {
  if (typeof options === 'string') {
    options = {filepath: options};
  }
  const checkedOptions = checkOptions(options);

  if (checkedOptions.force || fs.existsSync(checkedOptions.filepath) === false) {
    throw new Error(`File ${options.filepath}" does not exist`);
  }

  return checkedOptions;
}

function buildArgs(options: Required<ShortcutOptions>): ReadonlyArray<string> {
  return [
    path.join(__dirname, '../scripts/lnk.vbs'),
    options.filepath,
    options.lnkName,
    options.lnkArgs,
    options.lnkDes,
    options.lnkCwd,
    options.lnkIco,
    options.lnkWin.toString(),
    options.lnkHtk,
  ];
}

function makeSync(options: ShortcutOptions | string): void {
  const checkedOptions = prepare(options);
  spawnSync('wscript', buildArgs(checkedOptions));
}

function make(options: ShortcutOptions | string): Promise<void> {
  const checkedOptions = prepare(options);
  return new Promise((resolve, reject) => {
    spawn('wscript', buildArgs(checkedOptions))
      .on('error', reject)
      .on('exit', () => resolve());
  });
}

export {make, makeSync, ShortcutOptions};
