import { Component } from 'react';
import { FetchingData, Startup } from './components/index';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'startup',
    };

    this.nextPage = this.nextPage.bind(this);
  }

  nextPage(page) {
    // Move through each of the pages one after the other.
    // We can only go forward not back.
    switch(page) {
      case 'fetching-data':
        this.setState({ page: 'fetching-data' });
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
        return <FetchingData nextPage={this.nextPage} />;
      default:
        // By default just return the startup page.
        // TODO: Maybe an error?
        return <Startup nextPage={this.nextPage} />;
    }
  }
}
