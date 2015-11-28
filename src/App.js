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
    const fields = this.props.fields;
    const records = this.props.records;
    let state = {
      fields: {},
      flags: {},
      records: [...records],
      total: 0,
    };
    fields.forEach(function(name) {
      state.fields[name] = undefined;
      state.flags[name] = {};
      records.forEach(function(record) {
        state.flags[name][record[name]] = true;
      });
    });
    records.forEach(function(record) {
      state.total += record.quantity;
    });
    return state;
  },

  reset() {
    let newSelecteds = {}
    this.props.fields.forEach(function(name) {
      newSelecteds[name] = undefined;
    });
    this.updateState(newSelecteds);
  },

  getEnabled(records, selectedFields, targetFields, state) {
    selectedFields.forEach(function(name) {
      records = records.filter(function(record) {
        return state[name] === record[name];
      });
    });
    let targetValues = {};
    targetFields.forEach(function(name) {
      targetValues[name] = {};
    });
    records.map(function(record) {
      targetFields.forEach(function(name) {
        targetValues[name][record[name]] = true;
      });
    });
    /* console.log('targetValues:', targetValues); */
    targetFields.forEach(function(name) {
      /* console.log(targetValues[name], Object.keys(targetValues[name])); */
      targetValues[name] = Object.keys(targetValues[name]);
    });
    console.log('getEnabled::', selectedFields, targetFields, { records: records, values: targetValues});
    return { records: records, values: targetValues};
  },

  updateState(newSelecteds) {
    const self = this;
    const fields = this.props.fields;
    const records = this.props.records;
    let localState = {
      fields: {},
      flags: {},
      records: undefined,
      total: 0,
    };
    fields.forEach(function(name) {
      localState.fields[name] = self.state.fields[name];
      localState.flags[name] = self.state.flags[name];
    });

    Object.keys(newSelecteds).forEach(function(name) {
      localState.fields[name] = newSelecteds[name];
    });

    records.forEach(function(record) {
      fields.forEach(function(name) {
        localState.flags[name][record[name]] = false;
      });
    });

    const selectedFields = fields.filter(function(name) {
      return localState.fields[name] !== undefined;
    });
    const unSelectedFields = fields.filter(function(name) {
      return localState.fields[name] === undefined;
    });
    let targetValuesDict = {};
    let result = this.getEnabled([...records], selectedFields, unSelectedFields, localState.fields);
    localState.records = result.records;
    localState.records.forEach(function(record) {
      localState.total += record.quantity;
    });
    unSelectedFields.forEach(function(name) {
      targetValuesDict[name] = result.values[name];
    });

    selectedFields.forEach(function(name) {
      let tmpSelectedFields = selectedFields.filter(function(tmpName) {
        return tmpName !== name;
      });
      let result = self.getEnabled([...records], tmpSelectedFields, [name], localState.fields);
      targetValuesDict[name] = result.values[name];
    });
    /* console.log('targetValuesDict:', targetValuesDict); */
    fields.forEach(function(name) {
      targetValuesDict[name].forEach(function(value) {
        localState.flags[name][value] = true;
      });
    });
    console.log('records:', records);

    this.setState(localState);
    console.log('updateState:', newSelecteds, this.state);
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
    let children = this.props.fields.map(function(name) {
      return div({style: groupStyle}, self.renderGroup(
        self.state.flags[name], self.state.fields[name], function(e) {
          let newSelecteds = {};
          newSelecteds[name] = e.target.value === self.state.fields[name] ? undefined : e.target.value
          self.updateState(newSelecteds);
          console.log('click ' + name + ':', e.target.value, self.state);
        }));
    });
    children = children.concat([
      ButtonItem({type: 'primary', onClick: function(e) {
        self.reset();
      }},'Reset'),
      div({}, "Quantity : ", strong({}, this.state.total)),
    ]);

    return div({style: wrapperStyle}, ...children);
  }
})
