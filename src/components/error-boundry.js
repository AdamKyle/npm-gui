import { Component } from 'react';

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.openNewIssue = this.openNewIssue.bind(this);
  }

  componentDidCatch(err) {
    this.setState({
      hasError: true,
      errorMessage: err
    });
  }

  openNewIssue(e) {
    e.preventDefault();
    const shell = window.require('electron').shell;
    shell.openExternal('https://github.com/AdamKyle/npm-gui/issues/new');
  }

  render() {

    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="center-to-the-app-content">
            <h3>Uh Oh! We have an error.</h3>
            <p>You have no package-lock.json or yarn.lock</p>
            <p>
              There may be more information in which you can use to open an <a onClick={this.openNewIssue} href="#">issue</a>
            </p>
            <hr />
            <details>
              {this.state.errorMessage && this.state.errorMessage.toString()}
              <br />
              {this.state.errorMessage.componentStack}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
