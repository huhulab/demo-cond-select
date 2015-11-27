import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

const records = [
  {color: 'red', size: 'S', style: 'thin', quantity: 1},
  {color: 'blue', size: 'S', style: 'thin', quantity: 8},
  {color: 'red', size: 'M', style: 'thin', quantity: 1},
  {color: 'green', size: 'M', style: 'thin', quantity: 11},
  {color: 'red', size: 'L', style: 'thin', quantity: 3},
  {color: 'red', size: 'S', style: 'fat', quantity: 1},
  {color: 'blue', size: 'M', style: 'fat', quantity: 2},
  {color: 'red', size: 'L', style: 'fat', quantity: 1},
  {color: 'black', size: 'L', style: 'fat', quantity: 7},
]

render(<App records={records} />, document.getElementById('root'));
