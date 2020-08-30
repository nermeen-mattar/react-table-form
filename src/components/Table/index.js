import React from 'react';
import { connect } from "react-redux";

import "./index.css";
import common from '../../styles/common';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        };
    }

    componentWillUnmount() {
    }

    heads = objects => objects.map((headTitle, index) =>
            <th key={index}>{headTitle}</th>
    )

    rows = (objects) => objects.map((currObject, index,) =>
            <tr key={index}>{this.cols(currObject, index)}</tr>
    );

    cols = (properties, rowIndex) => [...properties.map((property, index) =>
          <td key={index}>{property}</td>
    ),       <td key={properties.length}>
        <a class="edit-row" href={`/edit?id=${rowIndex}`}>Edit</a>
    </td>
    ];

    render() {
        return (
      <div style={common.container}>
        {/* <h1>{table.title}</h1> */}
        <div class="form-control">
          <label for="search"><i class="icon-search"></i></label>
          <input class="table-filter" type="search" data-table="simple-table" placeholder="Search..."/>
        </div>
        <div class="table-responsive">
          <table id="ordering-table" class="simple-table">
            <thead>        
              {this.heads(this.props.heads)}
              <th></th>
            </thead>
            <tbody>
            {this.rows(this.props.rows, this.cols)}
            </tbody>
          </table>
        </div>
    </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    heads: state.heads,
      rows: state.rows
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
      onAgeUp: () => dispatch({ type: "CREATE_OBJECT", value: 1 }),
    };
  };
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(Table);
  