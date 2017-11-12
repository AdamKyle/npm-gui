import { Component } from 'react';
import Navigation from './navigation';
import { getDependencies } from './package-manager-dependencies';


export default class PackageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usingMessage: this.props.isYarn ? 'We see you are using yarn. We will stick to that :)' : 'We see you are using npm. We will stick to that :)',
      data: this.props.json,
      packageJSON: this.props.packageJSON,
      packageInformation: [],
    };

    this.coreDependencies = this.coreDependencies.bind(this);
    this.devDependencies = this.devDependencies.bind(this);

    console.log(this.state); //eslint-disable-line
  }

  componentDidMount() {
    this.coreDependencies();
  }

  coreDependencies(e) {
    if (e) {
      e.preventDefault();
    }

    const dependencies = getDependencies(
      this.state.packageJSON.dependencies,
      this.state.data.dependencies
    );

    this.setState({
      packageInformation: dependencies,
    });
  }

  devDependencies(e) {
    if (e) {
      e.preventDefault();
    }

    const dependencies = getDependencies(
      this.state.packageJSON.devDependencies,
      this.state.data.dependencies
    );

    this.setState({
      packageInformation: dependencies,
    });
  }

  render() {
    return (
      <div>
        <Navigation
          coreDependencies={this.coreDependencies}
          devDependencies={this.devDependencies}
        />
        <div className='container'>
          <div className='row'>
            {this.state.packageInformation}
          </div>
          <div className='notify peek'>{ this.state.usingMessage }</div>
        </div>
      </div>
    );
  }
}
