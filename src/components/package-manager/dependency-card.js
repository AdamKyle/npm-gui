import { Component } from 'react';

export default class DependencyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packageMeta: this.props.packageMeta,
    };
  }

  render() {
    return(
      <div className="col s4" key={this.state.packageMeta.name}>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{this.state.packageMeta.name}</span>
            <hr />
            <p>Version: {this.state.packageMeta.data.version}</p>
            {this.props.versionToUpdateTo}
          </div>
          <div className="card-action">
            {this.props.isUpToDate}
            <a href="#" className="left-align">Remove</a>
          </div>
        </div>
      </div>
    );
  }
}
