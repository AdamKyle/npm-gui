import { Component } from 'react';

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidCatch(err) {
    this.setState({
      hasError: true,
      errorMessage: err
    });
  }

  render() {

    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="center-to-the-app-content">
            <h3>Uh Oh! We have an error.</h3>
            <p>You have no package-lock.json or yarn.lock</p>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
