import { Component } from 'react';
import {
  convertYarnLockToJSON,
  getPackageLockInfo
} from '../lib/convert-lock-file';

import { fetchPackageJSON } from '../lib/fetch-package-json';
import renameKeys from 'rename-keys';


export default class FetchingData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isYarn: false,
      packageJSON: {},
    };
  }

  componentDidMount() {
    try {
      this.fatchYarnData();
    } catch(err) {
      // There was no yarn file. Try the package lock file.
      // Throw if nothing found either way.
      console.warn(err);
      this.fetchPackageLockData();
    }
  }

  componentDidUpdate() {
    this.props.nextPage('package-manager', this.state);
  }

  fatchYarnData() {
    convertYarnLockToJSON(this.props.path).then(function(jsonData) {
      const yarnData = renameKeys(jsonData, (key) => {
        return key.split('@')[0];
      });

      yarnData['dependencies'] = yarnData;

      this.setState({
        data: yarnData,
        isYarn: true,
        packageJSON: this.fetchPackageJsonData(),
      });
    }.bind(this));
  }

  fetchPackageLockData() {
    try {
      this.setState({
        data: getPackageLockInfo(this.props.path),
        packageJSON: this.fetchPackageJsonData(),
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  fetchPackageJsonData() {
    try {
      return fetchPackageJSON(this.props.path);
    } catch (err) {
      throw new Error(err);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='center-to-the-app-content'>
          <i className='move-icon-down tiny material-icons md-spin'>autorenew</i> Fetching data
        </div>
      </div>
    );
  }
}
