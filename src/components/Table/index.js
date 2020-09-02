import React from 'react';

import "./index.css";

export default function Table (props) {

    const heads = props.schema.show.map(property => property.replace('_', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase()));
    const rows = props.data.map(obj => props.schema.show.map(property => obj[property]));

    const renderHeads = objects => objects.map((headTitle, index) =>
            <th key={index}>{headTitle}</th>
    )

    const renderRows = (objects) => objects.map((currObject, index) =>
            <tr key={index}>{renderCols(currObject, index)}</tr>
    );

    const renderCols = (properties, rowIndex) => [...properties.map((property, index) =>
          <td key={index}>{property}</td>
    ),       
    props.schema.actions.showEdit(props.data[rowIndex])?
    <td class="edit-row"  onClick={() => props.schema.actions.onEdit(props.data[rowIndex])} key={properties.length}>
        Edit
    </td> : <td></td>
    ];

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
              {renderHeads(heads)}
              <th></th>
            </thead>
            <tbody>
            {renderRows(rows)}
            </tbody>
          </table>
        </div>
    </div>
    );
}