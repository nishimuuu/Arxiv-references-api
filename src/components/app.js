import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Body from './Body';
import MyLink from './MyLink';
ReactDOM.render(
  <div>
    <Header />
    <MyLink gh="https://github.com/nishimuuu/Arxiv-references" gem="https://rubygems.org/gems/arxiv-references" />
    <Body url="http://localhost:4567/arxiv-references/api/v0.1.4/fetch" pollInterval={2000} />
  </div>,
document.getElementById('app')
);

