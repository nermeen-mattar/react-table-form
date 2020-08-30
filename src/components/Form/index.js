import React from 'react';
import { connect } from "react-redux";

import "./index.css";
import common from '../../styles/common';

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
// {
//   'title': '',
//   'fieldNames': ['accept-terms']
// }
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

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            objects: []
        };

        // this.trackAdsViewByIframeClick = this.trackAdsViewByIframeClick.bind(this);
    }


    componentDidMount() {
        console.log('ob', this.props.objects);
    }

    componentWillUnmount() {
    }


sections = sections => sections.map((section, index) => <div key={index}>


  <h1> {section.title} </h1>

  {this.inputs(section.fieldNames)}
</div>);

inputs = inputs => inputs.map((input, index) => 
    <div class="field-label">
      {fieldsInfo[input].label}
          <input key={index} type={fieldsInfo[input].type}/>
    </div>
);

    render() {
        return (
       <div style={common.container}>
         <div style={common.flexBetween}>
         <a href='../'> <button style={{...common.cursorPointer, ...common.button, ...common.secondary}} >
       
          Cancel
    
          </button>
          </a>
          <button style={{...common.cursorPointer, ...common.button, ...common.primary}} onClick={this.onSaveClicked}>
          Save
          </button>
          </div>
         {this.sections(sectionsInfo)}
       </div>
        );
    }
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
  