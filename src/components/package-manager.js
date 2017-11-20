import { Component } from 'react';
import Navigation from './navigation';
import Dependency from './package-manager/dependency';
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
      showing: 'dependencies',
      dependencyUpdateCount: 0,
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
    let dependencyCount = this.props.dependencyUpdateCount;

    for(const prop in dependencies) {
      const packageMeta = findFromLockFile(prop, this.state.data.dependencies);
      packageDetailComponents.push(
        <Dependency
          packageMeta={packageMeta}
          key={packageMeta.name}
        />
      );
    }

    if (showing !== undefined && showing === 'development dependencies') {
      console.log('here'); //eslint-disable-line
    }

    this.setState({
      packageDetailComponents: packageDetailComponents,
      showAlert: showAlert ? showAlert : false,
      showing: showing ? showing : 'dependencies',
      dependencyUpdateCount: dependencyCount,
    });
  }

  componentDidMount() {
    this.buildPackageMetaComponents(this.state.packageJSON.dependencies);
  }

  render() {

    return (
      <div>
        <Navigation
          coreDependencies={this.coreDependencies}
          devDependencies={this.devDependencies}
          name={this.state.packageJSON.name}
          version={this.state.packageJSON.version}
          showing={this.state.showing}
        />
        <div className='container'>
          <span className="right">Updates: {this.state.dependencyUpdateCount}</span>
          <div className='row'>
            {this.state.packageDetailComponents}
          </div>
          <div className='notify peek'>{ this.state.usingMessage }</div>
        </div>
      </div>
    );
  }
}
