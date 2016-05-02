import React, { Component } from 'react';
import Colors from 'material-ui/lib/styles/colors';

export default class ResultVal extends Component {
  constructor(props) {
    'use strict';
    super(props);
    this.style = {
      width: '80vw',
      height: '55vh',
      backgroundColor: Colors.grey100,
      borderRadius: '2vh',
    };
  }

  render() {
    return (
      <div>
        <h1 style={{ color: Colors.grey500 }}> Response Field </h1>

        <div style={this.style} id="resultArea">
          {this.props.data}
        </div>

      </div>
    );
  }
}

