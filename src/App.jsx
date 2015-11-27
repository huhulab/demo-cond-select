import React from 'react';
import { Radio } from 'antd';

const RadioButton = React.createFactory(Radio.Button);
const RadioItem = React.createFactory(Radio);
const RadioGroup = React.createFactory(Radio.Group);
const div = React.createFactory('div');
const a = React.createFactory('a');

export const App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      color: undefined,
      size: undefined,
      style: undefined,
      colors: {},
      sizes: {},
      styles: {}
    };
  },

  reset() {
    this.setState({
      color: undefined,
      size: undefined,
      style: undefined,
    });
  },

  refreshChoices(shouldReset) {
    if (shouldReset) {
      this.setState({
        colors: {},
        sizes: {},
        styles: {}
      });
    }
    const self = this;
    let records = this.props.records;
    ['color', 'size', 'style'].forEach(function(name) {
      const value = self.state[name]
      if (value !== undefined) {
        records = records.filter(function(record) {
          return record[name] === value
        });
      }
    });
    records.forEach(function(record) {
      self.state.colors[record.color] = false;
      self.state.sizes[record.size] = false;
      self.state.styles[record.style] = false;
    });
    console.log(this.state);
  },

  renderGroup(flags, value, onChange) {
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
    this.refreshChoices(false);

    return div(
      {style: wrapperStyle},
      div({style: groupStyle}, this.renderGroup(
        self.state.colors, self.state.color, function(e) {
          self.setState({ color: e.target.value });
          self.refreshChoices(true);
          console.log(self.state);
        })),
      div({style: groupStyle}, this.renderGroup(
        self.state.sizes, self.state.size, function(e) {
          self.setState({ size: e.target.value });
          self.refreshChoices(true);
          console.log(self.state);
        })),
      div({style: groupStyle}, this.renderGroup(
        self.state.styles, self.state.style, function(e) {
          self.setState({ style: e.target.value });
          self.refreshChoices(true);
          console.log(self.state);
        })),
      a({onClick: function(e) {
        self.reset();
      }},'重置')
    );
  }
})
