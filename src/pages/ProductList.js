import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Table from '../components/Table';
import common from '../styles/common';

/**
 * The parent component job is to pass the following to the general table:
 * 1- The data (list of objects)
 * 2- The schema, describing specifications for any customization needed such as what columns
 * to hide and the title for the head...etc.
 */
function ProductList(props) {
  const history = useHistory();
  const ProductsTableSchema = {
    title: 'PRODUCTS',
    show: ['product_name', 'weight', 'availability'],
    actions: {
      showEdit: (obj) => obj.is_editable,
      onEdit: (obj) => {
        history.push(`/edit?id=${obj._id}`);
      },
    },
  };
  return (
    <div style={common.container}>
      <Table data={props.products} schema={ProductsTableSchema} ></Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.objects,
  };
};

export default connect(
    mapStateToProps,
    null,
)(ProductList);
