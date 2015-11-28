import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

const records = [
  /* Red */
  {color: 'red', size: 'S', style: 'thin', quantity: 1},
  {color: 'red', size: 'S', style: 'fat', quantity: 1},
  {color: 'red', size: 'M', style: 'thin', quantity: 1},
  {color: 'red', size: 'L', style: 'thin', quantity: 3},
  {color: 'red', size: 'L', style: 'fat', quantity: 1},
  /* Blue */
  {color: 'blue', size: 'S', style: 'thin', quantity: 8},
  {color: 'blue', size: 'M', style: 'fat', quantity: 2},
  /* Green */
  {color: 'green', size: 'M', style: 'thin', quantity: 11},
  /* Black */
  {color: 'black', size: 'L', style: 'fat', quantity: 7},
]
const fields = ['color', 'size', 'style'];


render(<App fields={fields} records={records} />, document.getElementById('root'));
