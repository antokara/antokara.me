import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

function MyGrid() {
  return (
    <div className="ColumnSection__grid u-clearfix">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  );
}

ReactDOM.render(
  <div>
    <div className="u-clearfix">
      <h1>Hello, world!</h1><a href="/home">home</a>
    </div>
    <MyGrid />
  </div>,
  document.getElementById('root'),
);

