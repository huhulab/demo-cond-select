import React from 'react';
import { Radio, Button } from 'antd';

const RadioItem = React.createFactory(Radio);
const RadioButton = React.createFactory(Radio.Button);
const RadioGroup = React.createFactory(Radio.Group);
const ButtonItem = React.createFactory(Button);
const div = React.createFactory('div');
const span = React.createFactory('span');
const strong = React.createFactory('strong');
const a = React.createFactory('a');
const hr = React.createFactory('hr');

export const App = React.createClass({
  displayName: 'App',

  getInitialState() {
    let state = {
      color: undefined,
      size: undefined,
      style: undefined,
      record: undefined,
      color_list: {},
      size_list: {},
      style_list: {},
      total: 0,
    };
    this.props.records.forEach(function(record) {
      state.color_list[record.color] = true;
      state.size_list[record.size] = true;
      state.style_list[record.style] = true;
      state.total += record.quantity;
    });
    return state;
  },

  updateState(newState) {
    const self = this;
    let records = this.props.records;
    let localState = {
      color: this.state.color,
      size: this.state.size,
      style: this.state.style,
      record: undefined,
      color_list: {},
      size_list: {},
      style_list: {},
      total: 0,
    };

    records.forEach(function(record) {
      localState.color_list[record.color] = false;
      localState.size_list[record.size] = false;
      localState.style_list[record.style] = false;
    });

    Object.keys(newState).forEach(function(name) {
      localState[name] = newState[name];
    });

    this.props.fields.forEach(function(name) {
      const value = localState[name]
      if (value !== undefined) {
        records = records.filter(function(record) {
          return record[name] === value;
        });
      }
    });

    localState.record = records.length == 1 ? records[0] : undefined;
    records.forEach(function(record) {
      localState.color_list[record.color] = true;
      localState.size_list[record.size] = true;
      localState.style_list[record.style] = true;
      localState.total += record.quantity;
    });
    console.log('records:', records);

    this.setState(localState);
    console.log('updateState:', newState, this.state, records);
  },

  renderGroup(flags, value, onChange) {
    /* DOM */
    return RadioGroup(
      {value: value, onChange: onChange},
      ...Object.keys(flags).map(function(name) {
        return RadioButton({value: name, disabled: !flags[name]}, name);
      })
    );
  },

  render() {
    const self = this;
    const groupStyle = {margin: '10px 2px'};
    const wrapperStyle = {
      margin: '60px auto',
      padding: '20px',
      width: '480px',
      background: '#F0F0F0',
      borderRadius: '5px'
    };

    /* DOM */
    let children = [
      div({style: groupStyle}, this.renderGroup(
        self.state.color_list, self.state.color, function(e) {
          self.updateState({
            color: e.target.value === self.state.color ? undefined : e.target.value
          });
          console.log('click color:', e.target.value, self.state);
        })),
      div({style: groupStyle}, this.renderGroup(
        self.state.size_list, self.state.size, function(e) {
          self.updateState({
            size: e.target.value === self.state.size ? undefined : e.target.value
          });
          console.log('click size:', e.target.value, self.state);
        })),
      div({style: groupStyle}, this.renderGroup(
        self.state.style_list, self.state.style, function(e) {
          self.updateState({
            style: e.target.value === self.state.style ? undefined : e.target.value
          });
          console.log('click style:', e.target.value,  self.state);
        })),
      ButtonItem({type: 'primary', onClick: function(e) {
        self.updateState({
          color: undefined,
          size: undefined,
          style: undefined
        });
      }},'Reset'),
      div({}, "Quantity : ", strong({}, this.state.total))
    ];

    return div({style: wrapperStyle}, ...children)
  }
})
