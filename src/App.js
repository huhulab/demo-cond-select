import React from 'react';
import { Radio } from 'antd';

const RadioButton = React.createFactory(Radio.Button);
const RadioItem = React.createFactory(Radio);
const RadioGroup = React.createFactory(Radio.Group);
const div = React.createFactory('div');
const span = React.createFactory('span');
const a = React.createFactory('a');

export const App = React.createClass({
  displayName: 'App',

  getInitialState() {
    let state = {
      color: undefined,
      size: undefined,
      style: undefined,
      record: undefined,
      colors: {},
      sizes: {},
      styles: {},
    };
    this.props.records.forEach(function(record) {
      state.colors[record.color] = false;
      state.sizes[record.size] = false;
      state.styles[record.style] = false;
    });
    return state;
  },

  refreshChoices(shouldReset, newState) {
    const self = this;
    let records = this.props.records;
    let localState = {
      color: this.state.color,
      size: this.state.size,
      style: this.state.style,
      record: undefined,
      colors: {},
      sizes: {},
      styles: {}
    };

    if (shouldReset) {
      Object.keys(newState).forEach(function(name) {
        localState[name] = newState[name];
      });
    }

    ['color', 'size', 'style'].forEach(function(name) {
      const value = localState[name]
      if (value !== undefined) {
        records = records.filter(function(record) {
          return record[name] === value;
        });
      }
    });

    localState.record = records.length == 1 ? records[0] : undefined;
    records.forEach(function(record) {
      localState.colors[record.color] = false;
      localState.sizes[record.size] = false;
      localState.styles[record.style] = false;
    });

    if (shouldReset) {
      this.setState(localState);
    }
    console.log('refreshChoices:', shouldReset, newState, this.state, records);
  },

  renderGroup(flags, value, onChange) {
    /* DOM */
    return RadioGroup(
      {value: value, onChange: onChange},
      ...Object.keys(flags).map(function(flag) {
        return RadioButton({value: flag, disabled: true}, flag);
      })
    );
  },

  render() {
    const self = this;
    const groupStyle = {margin: '10px'};
    const wrapperStyle = {
      margin: '60px auto',
      padding: '10px',
      width: '480px',
      background: '#F0F0F0',
      borderRadius: '5px'
    };

    /* DOM */
    let children = [
      div({style: groupStyle}, this.renderGroup(
        self.state.colors, self.state.color, function(e) {
          self.refreshChoices(true, {
            color: e.target.value === self.state.color ? undefined : e.target.value
          });
          console.log('click color:', e.target.value, self.state);
        })),
      div({style: groupStyle}, this.renderGroup(
        self.state.sizes, self.state.size, function(e) {
          self.refreshChoices(true, {
            size: e.target.value === self.state.size ? undefined : e.target.value
          });
          console.log('click size:', e.target.value, self.state);
        })),
      div({style: groupStyle}, this.renderGroup(
        self.state.styles, self.state.style, function(e) {
          self.refreshChoices(true, {
            style: e.target.value === self.state.style ? undefined : e.target.value
          });
          console.log('click style:', e.target.value,  self.state);
        })),
      a({onClick: function(e) {
        self.refreshChoices(true, {
          color: undefined,
          size: undefined,
          style: undefined
        });
      }},'重置')
    ];
    if (this.state.record !== undefined) {
      /* DOM */
      children.push(div({}, "剩余数量 : ", span({}, this.state.record.quantity)));
    }

    /* DOM */
    return div({style: wrapperStyle}, ...children);
  }
})
