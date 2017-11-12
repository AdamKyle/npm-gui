import { findFromLockFile } from '../lib/find-package-information';

/**
 * Create an array of cards that shows the dependencies based on the
 * the type of dependencies given.
 */
export const getDependencies =
  (
    packageJSONDependencies,
    lockFileDependenies
  ) => {
    const foundPackages = findFromLockFile(
      packageJSONDependencies,
      lockFileDependenies
    );

    let packageImformation = [];

    foundPackages.forEach((packageMeta) => {
      packageImformation.push(
        <div className="col s4" key={packageMeta.name}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{packageMeta.name}</span>
              <hr />
              <p>Version: {packageMeta.data.version}</p>
            </div>
            <div className="card-action">
              <a href="#" className="left-align">Update</a>
              <a href="#" className="left-align">Remove</a>
            </div>
          </div>
        </div>
      );
    });

    return packageImformation;
  };
