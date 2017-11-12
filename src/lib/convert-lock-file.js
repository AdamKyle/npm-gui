import fs from 'fs';
import path from 'path';
import process from 'process';
import JSONFile from 'jsonfile';


function toObject(dir, pathToWrapper) {
  const wrapper = window.require(pathToWrapper);

  if (!dir) {
    dir = process.cwd();
    process.stdio;
  }

  return wrapper.default.fromDirectory(dir).then((lockfile) => {
    return Promise.resolve(lockfile.cache);
  }).catch((err) => {
    throw err;
  });
}

function toJson (dir, pathToWrapper) {
  return toObject(dir, pathToWrapper).then((answer) => {
    return answer;
  });
}

/**
 * Convert a yarn File to JSON.
 *
 * Returns a promise for later consumption.
 *
 * Throw an error if the file doesnt exist.
 */
export const convertYarnLockToJSON = (pathToProject) => {
  const file = pathToProject + '/yarn.lock';
  const exists = fs.existsSync(file);

  const pathToWrapper = path.join(
    pathToProject,
    '/node_modules/yarn/lib/lockfile/wrapper'
  );

  if (!exists) {
    throw new Error('No yarn.lock file found.');
  }

  return toJson(pathToProject, pathToWrapper);
};

/**
 * Get the package-lock.json info.
 *
 * If  the file is not found or cannot be read, throw an error.
 *
 * Return the JSON of the file.
 */
export const getPackageLockInfo = (pathToProject) => {
  const file = pathToProject + '/package-lock.json';
  const exists = fs.existsSync(file);

  if (!exists) {
    throw new Error('No package-lock.json file found.');
  }

  return JSONFile.readFileSync(file);
};
