import React, {useState} from 'react';
import { connect } from "react-redux";

import Form from '../components/Form';
import common from '../styles/common';

/**
 * The parent component job is to pass the following to the general table:
 * 1- The data (the object)
 * 2- The schema, describing any customization needed such as what fields to show and sections...etc.
 */
function ProductForm(props) {
  const currProductId = props.location.search.match(/[1-9]+/g);

  const getProductById = () => {
    return props.objects.filter(object => object._id === Number(currProductId[0]))[0];
  }

  const values = currProductId && getProductById();

  const sectionsInfo = [{
    "title": "Basic",
    "fieldNames": ["product_name", "weight", "url", "availability"]
  }, {
    'title': 'Pricing',
    'fieldNames': ['price_tier', 'price_range', "is_editable"],
    'validators': [{
        'name': 'equal',
        'customErrMsg': 'Password and Confirm password should be equal.'
    }]
  }]

  const  fieldsInfo = {
    'product_name': {
        'type': 'text',
        'label': 'Name',
        'validators': [{
            'name': 'required'
        }]
    },
    'weight': {
        'type': 'text',
        'label': 'Weight',
        'validators': [{
            'name': 'required'
        }]
    },
    'url': {
        'type': 'text',
        'label': 'product Url',
        'validators': [{
            'name': 'required'
        }, {
            'name': 'url'
        }]
    },
    'availability': {
        'type': 'number',
        'label': 'Availability',
        'validators': [{
            'name': 'positive'
        }, {
          'name': 'maxlength',
          'specs': 5
      }]
    },
    'price_tier': {
        'type': 'radio',
        'label': 'Price Tier',
        'validators': [{
            'name': 'required'
        }],
        'options': [
          'budget',
          'premium'
        ]
    },
    'price_range': {
        'type': 'dropdown',
        'label': 'Price Range',
        'validators': [{
            'name': 'required'
        }],
        'options': [
          '$1-10',
          '$11-20',
          '$20-50'
        ]
    },
    'is_editable': {
        'type': 'checkbox',
        'label': 'Is Editable'
    }
   }

  const [productFormSchema, setProductFormSchema] = useState({
    sectionsInfo,
    fieldsInfo
  });

  fieldsInfo.price_tier.onChange = () =>  {
    fieldsInfo.price_range.options = [
    '$50-99',
    '$100-199',
    '$200+'
  ];
  setProductFormSchema({...productFormSchema});
};

const onSaveClicked = (data) => {
  currProductId ? props.onEdit(data) : props.onCreate(data);
}

  return (
    <div style={common.container}>
      <Form values={values} data={props.objects} schema={productFormSchema} onSaveClicked={onSaveClicked} ></Form>
    </div>
    );
}

const mapStateToProps = state => {
    return {
      objects: state.objects
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
      onCreate: (data) => dispatch({ type: "CREATE_OBJECT", value: data }),
      onEdit: (data) => dispatch({ type: "EDIT_OBJECT", value: data }),
    };
  };

  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(ProductForm);
  