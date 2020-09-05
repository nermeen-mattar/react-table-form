import React, {useState} from 'react';
import {connect} from 'react-redux';

import Form from '../components/Form';
import common from '../styles/common';
import { priceRange } from './priceRange';

/**
 * The parent component job is to pass the following to the general table:
 * - data (the object)
 * - schema describing fields' behaviors and what fields/sections to show...etc.
 */
function ProductForm(props) {
  const title = 'PRODUCT FORM';

  const sections = [{
    'title': 'Basic',
    'fieldNames': ['product_name', 'weight', 'url', 'availability'],
  }, {
    'title': 'Pricing',
    'fieldNames': ['price_tier', 'price_range', 'is_editable'],
    'validators': [{
      'name': 'equal',
      'customErrMsg': 'Password and Confirm password should be equal.',
    }],
  }];

  const fields = {
    'product_name': {
      'type': 'text',
      'label': 'Name',
      'validators': [{
        'name': 'required',
      }],
    },
    'weight': {
      'type': 'text',
      'label': 'Weight',
      'validators': [{
        'name': 'required',
      }],
    },
    'url': {
      'type': 'text',
      'label': 'Product url',
      'validators': [{
        'name': 'required',
      }, {
        'name': 'url',
      }],
    },
    'availability': {
      'type': 'number',
      'label': 'Availability',
      'validators': [
        {
          'name': 'required',
        },
        {
        'name': 'positive',
      }, {
        'name': 'maxlength',
        'specs': 4,
      }],
    },
    'price_tier': {
      'type': 'radio',
      'label': 'Price Tier',
      'validators': [{
        'name': 'required',
      }],
      'options': [
        'budget',
        'premium',
      ],
    },
    'price_range': {
      'type': 'dropdown',
      'label': 'Price Range',
      'validators': [{
        'name': 'required',
      }],
      'options': [],
    },
    'is_editable': {
      'type': 'checkbox',
        'validators': [{
          'name': 'isChecked',
          'customErrMsg': 'Product should be editable'
      }],
      'label': 'Is Editable',
    },
  };

  const [productFormSchema, setProductFormSchema] = useState({
    sections,
    fields,
    title
  });

  const defaultValue = {
    price_tier: 'budget',
    is_editable: 'true',
    price_range: priceRange.budget[0]
  }

  let values = defaultValue;

  /* defaultValue as a preventive check in case product has been deleted */
  let currProductId = props.location.search.match(/[1-9]+/g); // in case of edit
  if(currProductId) {
    values = props.objects.filter((object) => object._id === Number(currProductId[0]))[0] || defaultValue; 
  }

  fields.price_range.options = priceRange[values.price_tier];
  fields.price_tier.onChange = (fieldEl) => {
    fields.price_range.options = priceRange[fieldEl.value];
    setProductFormSchema({...productFormSchema});
  };

  const onSaveClicked = (data) => {
    currProductId ? props.onEdit(data) : props.onCreate(data);
  };

  return (
    <div style={common.container}>
      <Form values={values} data={props.objects} schema={productFormSchema} onSaveClicked={onSaveClicked} ></Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    objects: state.objects,
  };
};

const mapDispachToProps = (dispatch) => {
  return {
    onCreate: (data) => dispatch({type: 'CREATE_OBJECT', value: data}),
    onEdit: (data) => dispatch({type: 'EDIT_OBJECT', value: data}),
  };
};

export default connect(
    mapStateToProps,
    mapDispachToProps,
)(ProductForm);
