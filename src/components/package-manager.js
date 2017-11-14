import { Component } from 'react';
import Navigation from './navigation';
import Dependencies from './package-manager/dependencies';
import { findFromLockFile } from '../lib/find-package-information';

export default class PackageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usingMessage: this.props.isYarn ? 'We see you are using yarn. We will stick to that :)' : 'We see you are using npm. We will stick to that :)',
      data: this.props.json,
      packageJSON: this.props.packageJSON,
      packageInformation: [],
      showAlert: false,
      showing: 'dependencies'
    };

    this.coreDependencies = this.coreDependencies.bind(this);
    this.devDependencies = this.devDependencies.bind(this);
    this.buildPackageMetaComponents = this.buildPackageMetaComponents.bind(this);
  }

  coreDependencies(e) {
    e.preventDefault();

    this.buildPackageMetaComponents(this.state.packageJSON.dependencies, true, 'dependencies');
  }

  devDependencies(e) {
    e.preventDefault();

    this.buildPackageMetaComponents(this.state.packageJSON.devDependencies, true, 'development dependencies');
  }

  buildPackageMetaComponents(dependencies, showAlert, showing) {
    let packageDetailComponents = [];

    for(const prop in dependencies) {
      const packageMeta = findFromLockFile(prop, this.state.data.dependencies);

      packageDetailComponents.push(
        <Dependencies packageMeta={packageMeta} key={packageMeta.name} />
      );
    }

    this.setState({
      packageDetailComponents: packageDetailComponents,
      showAlert: showAlert ? showAlert : false,
      showing: showing ? showing : 'dependencies',
    });
  }

  componentDidMount() {
    this.buildPackageMetaComponents(this.state.packageJSON.dependencies);
  }

  render() {
    let showAlert = '';

    if (this.state.showAlert) {
      showAlert = <div className="notify peek">Showing {this.state.showing}</div>;
    }

    return (
      <div>
        <Navigation
          coreDependencies={this.coreDependencies}
          devDependencies={this.devDependencies}
        />
        <div className='container'>
          <div className='row'>
            {this.state.packageDetailComponents}
          </div>
          <div className='notify peek'>{ this.state.usingMessage }</div>
          {showAlert}
        </div>
      </div>
    );
  }
}
