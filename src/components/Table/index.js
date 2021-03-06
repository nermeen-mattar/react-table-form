import React from 'react';

import "./index.css";
import common from '../../styles/common';
import { useHistory } from 'react-router-dom';

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

    const history = useHistory();
    const onCreateClicked = () => {
      history.push(`/create`);
    }

    return (
      <div>
        <h2>{props.schema.title}</h2>
        <div style={common.flexBetween}>
        {/* Search functionality (To be finalized)
        <div> 
            <label for="search"><i class="icon-search"></i></label>
            <input style={common.field} type="search" data-table="simple-table" placeholder="Search..."/>
          </div> 
        */}
          <button onClick={onCreateClicked} class="save-button" style={{...common.cursorPointer, ...common.button}}>
            Create
            </button>
        </div>
        <table class="simple-table">
          <thead>        
              {renderHeads(heads)}
                <th></th>
              </thead>
              <tbody>
              {renderRows(rows)}
              </tbody>
            </table>
      </div>
    );
}