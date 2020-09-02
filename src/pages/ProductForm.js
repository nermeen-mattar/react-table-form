import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import productData from "../constants/productData.json";
import Form from '../components/Form';
import common from '../styles/common';

/**
 * The parent component job is to pass the following to the general table:
 * 1- The data (list of objects)
 * 2- The schema, describing specifications for any customization needed such as what columns
 * to hide and the title for the head...etc.
 */
function ProductForm(props) {
  props.onInit(productData);
  const history = useHistory();
  const ProductsTableSchema = {
    show: ['product_name', 'weight', 'availability'],
    actions: {
        showEdit: (obj) => obj.isEditable,
        onEdit: (obj) => {
            history.push(`/edit?id=${obj._id}`);
        },
    }
  };
      return (
        <div style={common.container}>
          <Form data={props.objects} schema={ProductFormSchema} ></Form>
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
    };
  };

  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(ProductForm);
  