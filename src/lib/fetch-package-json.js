import fs from 'fs';
import JSONFile from 'jsonfile';

/**
 * Fetch the package.json file.
 *
 * Return the json contents or throw an error.
 */
export const fetchPackageJSON = (pathToProject) => {
  const file = pathToProject + '/package.json';
  const exists = fs.existsSync(file);

  if (!exists) {
    throw new Error('No package.json file found.');
  }
  
  return JSONFile.readFileSync(file);
};
