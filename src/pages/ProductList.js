import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import productData from "../constants/productData.json";
import Table from '../components/Table';
import common from '../styles/common';

/**
 * The parent component job is to pass the following to the general table:
 * 1- The data (list of objects)
 * 2- The schema, describing specifications for any customization needed such as what columns
 * to hide and the title for the head...etc.
 */
function ProductList(props) {
  props.onInit(productData);
  const history = useHistory();
  const ProductsTableSchema = {
      //   id: {
      //     hide: true, 
      //     isUniqueIdentifier: true,
      //   },
      //   url: {
      //     hide: true
      //   },
      //   peice_tier: {
      //     hide: true
      //   },
      //   unit_cost: {
      //     hide:true
      //   },
      //   is_editable: {
      //     hide: true,
      //   },
  
      // },
        // hide: ['id', 'url', 'peice_tier', 'unit_cost', 'is_editable'],
        show: ['product_name', 'weight', 'availability'],
        actions: {
          showEdit: (obj) => obj.isEditable,
          onEdit: (obj) => 
          {
            debugger;
              history.push(`/edit?id=${obj._id}`);
          },
        }
  }
        return (
      <div style={common.container}>
        {/* {JSON.stringify(props)} */}
        {props.objects.length && <Table data={props.objects} schema={ProductsTableSchema} ></Table>} 
      </div>
        );
}



const mapStateToProps = state => {
    return {
      objects: state.objects,
      rows: state.rows
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
      onAgeUp: () => dispatch({ type: "CREATE_OBJECT", value: 1 }),
      onInit: () => dispatch({ type: "INIT_OBJECTS", value: productData }),
    };
  };

  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(ProductList);
  