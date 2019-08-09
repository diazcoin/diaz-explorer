import React, { Component } from 'react';
import Select from 'react-opium-select';
import 'react-opium-select/style.css';

class App extends Component {
  render() {
    return (
      <div className="select">
        <Select
          { ...this.props } />
      </div>
    );
  }
}

export default App;
