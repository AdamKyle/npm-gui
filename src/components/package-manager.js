import { Component } from 'react';

export default class PackageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usingMessage: this.props.isYarn ? 'We see you are using yarn. We will stick to that :)' : 'We see you are using npm. We will stick to that :)',
      data: JSON.parse(this.props.json),
    };
  }

  allPackages() {
    const packageCards = [];

    for (const prop in this.state.data) {
      packageCards.push(
        <div className='col s4' key={prop}>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <span className='card-title'>{prop.split('@')[0]}</span>
              <p>
                <strong>version</strong>: {this.state.data[prop].version}
              </p>
            </div>
            <div className='card-action'>
              <a href='#'>Update</a>
              <a href='#'>Remove</a>
            </div>
          </div>
        </div>
      );
    }

    return packageCards;
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.allPackages()}
        </div>
        <div className='notify peek'>{ this.state.usingMessage }</div>
      </div>
    );
  }
}
