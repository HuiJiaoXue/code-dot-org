/**
 * @overview Component for adding a new column to the specified table.
 */

import Radium from 'radium';
import React from 'react';

import * as dataStyles from './dataStyles';
import { connect } from 'react-redux';

const AddColumnButton = React.createClass({
  propTypes: {
    columns: React.PropTypes.array.isRequired,
    addColumn: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isEditing: false,
      isValid: true,
      newColumn: ''
    };
  },

  handleAdd() {
    this.setState({
      isEditing: true,
      newColumn: ''
    });
  },

  handleCancel() {
    this.setState(this.getInitialState());
  },

  handleChange(event) {
    const value = event.target.value;
    const isValid = !this.props.columns.includes(value);
    if (isValid) {
      this.setState({
        isValid: true,
        newColumn: value
      });
    } else {
      this.setState({
        isValid: false
      });
    }
  },

  handleSave() {
    this.props.addColumn(this.state.newColumn);
    this.setState(this.getInitialState());
  },

  render() {
    const inputStyle = [dataStyles.input, {
      backgroundColor: this.state.isValid ? null : "#ffcccc"
    }];
    return (
      this.state.isEditing ?
        <span>
          <input
              onChange={this.handleChange}
              style={inputStyle}
              value={this.state.value}/>
          <button
              className="btn"
              onClick={this.handleSave}
              style={dataStyles.editButton}
          >
            Save
          </button>
          <button
              className="btn"
              onClick={this.handleCancel}
              style={dataStyles.button}
          >
            Cancel
          </button>
        </span> :
        <button className="btn" onClick={this.handleAdd} style={dataStyles.button}>
          Add column
        </button>
    );
  }
});
export default Radium(AddColumnButton);
