
/**
 * Use package-lock.json to discover all the packages that are installed
 */
export const findFromLockFile =
  (installedPackages, allPackages) => {
    const foundPackages = [];

    for(const props in installedPackages) {
      if (allPackages[props]) {
        foundPackages.push({name: props, data: allPackages[props]});
      }
    }

    return foundPackages;
  };
