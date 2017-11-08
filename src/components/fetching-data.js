import { Component } from 'react';
import convertYarnLockToJSON from '../lib/convert-lock-file';


export default class FetchingData extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    convertYarnLockToJSON(this.props.path).then(function(data, err) {
      if (err) {
        // attempt to do the packag-lock file.
      }

      // Go to the next page.
      this.props.nextPage('package-manager', data);
    }.bind(this));
  }

  render() {
    return (
      <div className='container'>
        <div className='center-to-the-app'>
          <i className='move-icon-down tiny material-icons md-spin'>autorenew</i> Fetching data
        </div>
      </div>
    );
  }
}
