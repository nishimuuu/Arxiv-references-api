import React, { Component } from 'react';
import TextBox from './TextBox';
import $ from 'jquery';
import ResultVal from './ResultVal';
import LinearProgress from 'material-ui/lib/linear-progress';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export default class Body extends Component {
  constructor(props) {
    'use strict';
    super(props);
    this.state = { data: {}, open: false };
    this.customContentStyle = {
      width : '100%',
      maxWidth : 'none',
    };
  }

  handleSubmit(value) {
    'use strict';
    this.setState({ open: true });
    $.ajax({
      url: this.props.url,
      type : 'GET',
      data : `type=${value.type}&value=${value.value}`,
      cache : false,
      success : (data) => {
        this.setState({ open: false, data: JSON.parse(data) });
      },
      error: (xhr, status, err) => {
        this.setState({ open: false, data: xhr.responseText});
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  render() {
    'use strict';
    const actions = [
      <FlatButton
        label="OK"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
    />,
    ];
    return (
      <div>
        <Dialog
          title="Now parsing"
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={this.customContentStyle}>
          <LinearProgress mode="indeterminate" />
        </Dialog>
        <TextBox cName="id" hintText="Arxiv ID" floatingLabelText="Put Arxiv ID in here"
          onSubmit={this.handleSubmit.bind(this)}
    />
        <TextBox cName="url" hintText="Arxiv URL(like: http://arxiv.org/abs/{arxivID})"
          floatingLabelText="Put Arxiv URL in here" onSubmit={this.handleSubmit.bind(this)}
    />
        <TextBox cName="pdfurl" hintText="Arxiv PDF URL(like: http://arxiv.org/pdf/{arxivID}v1)"
          floatingLabelText="Put Arxiv PDF URL in here" onSubmit={this.handleSubmit.bind(this)}
    />
        <ResultVal data={this.state.data} />
      </div>
    );
  }
}

