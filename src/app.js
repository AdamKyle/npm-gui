import { Component } from 'react';
import {
  FetchingData,
  Startup,
  PackageManager,
  ErrorBoundry
} from './components/index';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'startup',
      nextPageData: null,
      isYarn: false,
    };

    this.nextPage = this.nextPage.bind(this);
  }

  nextPage(page, dataForComponent) {
    // Move through each of the pages one after the other.
    // We can only go forward not back.
    switch(page) {
      case 'fetching-data':
        this.setState({ page: 'fetching-data', nextPageData: dataForComponent });
        break;
      case 'package-manager':
        this.setState({
          page: 'package-manager',
          nextPageData: dataForComponent.data,
          isYarn: dataForComponent.isYarn,
          packageJSON: dataForComponent.packageJSON,
          dependencyUpdateCount: dataForComponent.dependencyUpdateCount,
          devDependencyUpdateCount: dataForComponent.devDependencyUpdateCount,
        });
        break;
      default:
        console.log('failed'); // eslint-disable-line
        break;
    }
  }

  render() {
    switch(this.state.page) {
      case 'startup':
        return <Startup nextPage={this.nextPage} />;
      case 'fetching-data':
        return (
          <ErrorBoundry>
            <FetchingData
              nextPage={this.nextPage}
              path={this.state.nextPageData}
            />
          </ErrorBoundry>
        );
      case 'package-manager':
        return <PackageManager
          json={this.state.nextPageData}
          isYarn={this.state.isYarn}
          packageJSON={this.state.packageJSON}
          devDependencyUpdateCount={this.state.devDependencyUpdateCount}
          dependencyUpdateCount={this.state.dependencyUpdateCount}
        />;
      default:
        // By default just return the startup page.
        // TODO: Maybe an error?
        return <Startup nextPage={this.nextPage} />;
    }
  }
}
