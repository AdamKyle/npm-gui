import { Component } from 'react';

export default class Navigation extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#" className="waves-effect waves-light btn" onClick={this.props.coreDependencies}>View Dependencies</a></li>
              <li><a href="#" className="waves-effect waves-light btn" onClick={this.props.devDependencies}>View Development Dependencies</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
