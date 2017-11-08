import fs from 'fs';
import path from 'path';
import process from 'process';


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
    const json = JSON.stringify(answer);

    return json;
  });
}

/**
 * Convert a yarn File to JSON.
 *
 * Returns a promise for later consumption.
 *
 * If the file in question (the yarn.lock) doesn't exist
 * we return false instead of throwing an error.
 */
const convertYarnLockToJSON = (pathToProject) => {
  const file = pathToProject + '/yarn.lock';
  const exists = fs.existsSync(file);

  const pathToWrapper = path.join(
    pathToProject,
    '/node_modules/yarn/lib/lockfile/wrapper'
  );

  if (!exists) {
    // figure this out later.
  }

  return toJson(pathToProject, pathToWrapper);
};

export default convertYarnLockToJSON;
