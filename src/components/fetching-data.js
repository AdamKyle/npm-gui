import { Component } from 'react';
import {
  convertYarnLockToJSON,
  getPackageLockInfo
} from '../lib/convert-lock-file';


export default class FetchingData extends Component {

  constructor(props) {
    super(props);

    this.state = {};
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

  fatchYarnData() {
    convertYarnLockToJSON(this.props.path).then(function(data) {
      // Go to the next page.
      this.props.nextPage('package-manager', {data: data, isYarn: true});
    }.bind(this));
  }

  fetchPackageLockData() {
    try {
      const JSONData = getPackageLockInfo(this.props.path);
      this.props.nextPage('package-manager', {data: JSONData, isyarn: false});
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
