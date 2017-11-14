
/**
 * Use package-lock.json to discover all the packages that are installed
 */
export const findFromLockFile = (packageName, allPackages) => {
  if (allPackages[packageName]) {
    return {name: packageName, data: allPackages[packageName]};
  }
};
