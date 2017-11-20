import request from 'request';
import promisify from 'util.promisify';
import { findFromLockFile } from './find-package-information';

const prequest = promisify(request);

async function checkIfHasUpdate(prop, packageInfo) {

  const resp = await prequest('https://registry.npmjs.org/' + prop);
  const json = JSON.parse(resp.body);
  if (packageInfo.name === prop && json['dist-tags'].latest !== packageInfo.data.version) {
    return true;
  }

  return false;
}

export const findAllYarnUpdates = (packageInfo, yarnLockFile) => {
  const updates = [];

  for (const prop in packageInfo) {
    packageInfo = findFromLockFile(prop, yarnLockFile);
    updates.push(checkIfHasUpdate(prop, packageInfo));
  }

  return Promise.all(updates);
};
