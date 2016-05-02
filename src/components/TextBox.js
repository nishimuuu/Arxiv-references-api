import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

// import $ from 'jquery';

export default class TextBox extends React.Component {
  constructor(props) {
    'use strict';
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.style = { margin: 24 };
    this.TextStyle = { width: '50%' };
    this.state = { value: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    const type = this.refs.type.value;
    const value = this.refs.value.getValue();
    this.props.onSubmit({ type: type, value: value });
    return;
  }

  render() {
    'use strict';
    return (
      <div className={this.props.cName}>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="hidden" value={this.props.cName} ref="type" />
          <TextField
            hintText={this.props.hintText}
            floatingLabelText={this.props.floatingLabelText}
            style={this.TextStyle}
            ref="value"
    />
          <RaisedButton label="Send Request" primary style={this.style} type="submit" />
        </ form>
      </div>
    );
  }
}

