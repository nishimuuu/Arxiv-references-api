import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

export default class MyLink extends Component {
  constructor(props) {
    'use strict';
    super(props);
    this.styles = {
      button: {
        margin: 12,
      },
      exampleImageInput: {
        cursor : 'pointer',
        position: 'absolute',
        top : 0,
        bottom : 0,
        right : 0,
        left : 0,
        width : '100%',
        opacity : 0,
      },
    };
  }

  render() {
    'use strict';
    return (
      <div>
        <RaisedButton
          label="Github Link"
          linkButton={true}
          href={this.props.gh}
          secondary={true}
          style={this.styles.button}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
        <RaisedButton
          label="Rubygems Link"
          linkButton={true}
          href={this.props.gem}
          secondary={true}
          primary={true}
          style={this.styles.button}
          icon={<FontIcon className="muidocs-icon-custom-diamond" />}
          />
      </div>
    );
  }

}
