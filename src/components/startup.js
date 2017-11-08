import { Component } from 'react';
import path from 'path';
import fs from 'fs';
import process from 'process';

import {DebounceInput} from 'react-debounce-input';

export default class Startup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInvalidPath: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit(e) {
    if (!this.state.isInvalidPath) {
      console.log('pathIsCorect'); // eslint-disable-line
    }

    e.preventDefault();
  }

  handleOnChange(e) {
    e.preventDefault();

    const exists = fs.existsSync(
      path.join(
        process.env.HOME,
        e.target.value + '/package.json'
      )
    );

    if (!exists) {
      // Path doesn't exist, clear out the project path.
      this.setState({
        isInvalidPath: true,
      });
    } else {
      // Could have tried again or maybe we were right the first time.
      if (this.state.isInvalidPath) {
        this.setState({
          isInvalidPath: false
        });
      }

      // Move to fetching data
      this.props.nextPage(
        'fetching-data',
        path.join(process.env.HOME, e.target.value)
      );
    }
  }

  render() {
    return (
      <div className='row center-to-the-app-form'>
        <form onSubmit={this.handleOnSubmit}>
          <div className='input-field col s12'>
            <i className='material-icons prefix'>account_circle</i>
            <DebounceInput
              id='projectFolder'
              type='text'
              minLength={2}
              debounceTimeout={500}
              className={this.state.isInvalidPath ? 'validate invalid' : 'validate'}
              placeholder='eg: /Documents/project-name'
              onChange={this.handleOnChange} />
            <label className='active' data-error='Path does not contain a package.json. Please try again.' htmlFor='projectFolder'>Project Folder Path</label>
          </div>
        </form>
      </div>
    );
  }
}
