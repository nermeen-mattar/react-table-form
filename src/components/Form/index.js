import React from 'react';
import { connect } from "react-redux";

import "./index.css";
import common from '../../styles/common';
import { useHistory } from 'react-router-dom';

const formInfo = {
  title: "Sign Up"
};

const sectionsInfo = [{
  "title": "Details",
  "fieldNames": ["firstname", "username", "email", "website"]
}, {
  'title': 'Authentication',
  'fieldNames': ['password', 'confirm-password'],
  'validators': [{
      'name': 'equal',
      'customErrMsg': 'Password and Confirm password should be equal.'
  }]
}, 
];

const fieldsInfo = {
  'firstname': {
      'type': 'text',
      'label': 'First Name',
      'validators': [{
          'name': 'required'
      }]
  },
  'username': {
      'type': 'text',
      'label': 'Username',
      'validators': [{
          'name': 'required'
      }, {
          'name': 'username'
      }]
  },
  'email': {
      'type': 'text',
      'label': 'Email',
      'validators': [{
          'name': 'required'
      }, {
          'name': 'email'
      }]
  },
  'website': {
      'type': 'text',
      'label': 'Website',
      'validators': [{
          'name': 'url'
      }]
  },
  'password': {
      'type': 'password',
      'label': 'Password',
      'validators': [{
          'name': 'required'
      }, {
          'name': 'minlength',
          specs: 5
      }, {
          'name': 'maxlength',
          specs: 12
      }]
  },
  'confirm-password': {
      'type': 'password',
      'label': 'Confirm Password',
      'validators': [{
          'name': 'required'
      }]
  },
  'accept-terms': {
      'type': 'checkbox',
      'label': 'Accept the Terms',
      'validators': [{
          'name': 'required',
          'customErrMsg': 'You should accept terms.'
      }, {
          'name': 'isChecked',
          'customErrMsg': 'You should accept terms.'
      }]
  }
};

function Form(props) {

    const renderSections = sections => sections.map((section, index) => <div class="section" key={index}>
    <h3> {section.title} </h3>
    {renderInputs(section.fieldNames)}
    </div>);

    const renderInputs = inputs => inputs.map((input, index) => 
        <div class="field-label">
        {fieldsInfo[input].label}
            <input key={index} type={fieldsInfo[input].type}/>
        </div>
    );
 
    return (
       <div style={common.container}>
         <div style={common.flexBetween}>
        <button onClick={useHistory().goBack} style={{...common.cursorPointer, ...common.button, ...common.secondary}} >
          Cancel
          </button>
          <button class="save-button" style={{...common.cursorPointer, ...common.button}} onClick={props.onSaveClicked}>
            Save
          </button>
          </div>
         {renderSections(sectionsInfo)}
       </div>
        );
}

const mapStateToProps = state => {
    return {
    heads: state.heads,
      objects: state.objects
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
      onSaveClicked: () => dispatch({ type: "CREATE_OBJECT", value: 1 }),
    };
  };
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(Form);
  