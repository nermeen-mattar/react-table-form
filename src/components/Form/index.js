import React, {useState} from 'react';
import 'react-dropdown/style.css';

import "./index.css";
import common from '../../styles/common';
import { useHistory } from 'react-router-dom';

export default function Form(props) {

    const [isSaving, toggleSaving] = useState(false);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }
    const [values, setValues] = useState(props.values || {})


    const renderSections = sections => sections.map((section, index) => <div class="section" key={index}>
    <h3> {section.title} </h3>
    {renderfields(section.fieldNames)}
    </div>);

    const renderfields = fields => fields.map((fieldName, index) => {
        const fieldSpec = props.schema.fieldsInfo[fieldName];
        switch(fieldSpec.type) {            
            case 'dropdown':
                return <div class="field"> <label>{fieldSpec.label}</label>
                         <select name={fieldName} style={common.field} onChange={handleInputChange} value={values[fieldName]} placeholder="Select an option">
                          {fieldSpec.options.map(selectOption => <option value={selectOption}>{selectOption}</option>)}
                        </select>
                    </div>
            case 'checkbox':
                return <div class="field" style={common.flexCenter}>
                <input name={fieldName} type={fieldSpec.type} onChange={handleInputChange} checked={values[fieldName]}/>
                <span>{fieldSpec.label}</span>
                </div>
            case 'radio':
                return <div>
                         {fieldSpec.options.map(radioOption => <div class="field">
                            <input name={fieldName} type={fieldSpec.type} onChange={handleInputChange} value={radioOption} checked={values[fieldName] === radioOption}/>
                            <label>{radioOption}</label>
                        </div>)}
                    </div>
            default:
                return <div class="field">
                    {fieldSpec.label}
                    <input name={fieldName} style={common.field} key={index} type={fieldSpec.type} onChange={handleInputChange} value={values[fieldName]}/>
                </div>
        }
    });

    const goBack = useHistory().goBack;
    const onSaveClicked = () => {
        props.onSaveClicked(values);
        toggleSaving(true);
        setTimeout(goBack, 2000); // to simulate saving to backend
    }

    return (
    
       <div style={common.container}>
           {JSON.stringify(values)}
         <div style={common.flexBetween}>
        <button onClick={goBack} style={{...common.cursorPointer, ...common.button, ...common.secondary}} >
          Cancel
          </button>
          <button onClick={onSaveClicked} class="save-button" style={{...common.cursorPointer, ...common.button}}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          </div>
         {renderSections(props.schema.sectionsInfo)}
       </div>
       );
}
