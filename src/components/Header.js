import React, { Component } from 'react';
import { AppBar } from 'material-ui';

export default class Header extends Component {
  render() {
    'use strict';
    return (
      <header className="header">
        <AppBar title="Arxiv-references sample API" />
      </header>
    );
  }
}
