import React from 'react';

import "./index.css";

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heads: this.props.schema.show.map(property => property.replace('_', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())),
            rows: this.props.data.map(obj => this.props.schema.show.map(property => obj[property]))
        };
    }

    heads = objects => objects.map((headTitle, index) =>
            <th key={index}>{headTitle}</th>
    )

    rows = (objects) => objects.map((currObject, index,) =>
            <tr key={index}>{this.cols(currObject, index)}</tr>
    );

    cols = (properties, rowIndex) => [...properties.map((property, index) =>
          <td key={index}>{property}</td>
    ),       
    this.props.schema.actions.showEdit(this.props.data[rowIndex])?
    <td class="edit-row"  onClick={() => this.props.schema.actions.onEdit(this.props.data[rowIndex])} key={properties.length}>
        Edit
    </td> : <td></td>
    ];

    render() {
        return (
      <div>
        {/* <h1>{table.title}</h1> */}
        <div class="form-control">
          <label for="search"><i class="icon-search"></i></label>
          <input class="table-filter" type="search" data-table="simple-table" placeholder="Search..."/>
        </div>
        <div class="table-responsive">
          <table id="ordering-table" class="simple-table">
            <thead>        
              {this.heads(this.state.heads)}
              <th></th>
            </thead>
            <tbody>
            {this.rows(this.state.rows, this.cols)}
            </tbody>
          </table>
        </div>
    </div>
        );
    }
}