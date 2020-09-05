import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import "./index.css";
import common from '../../styles/common';
import { validators } from '../../services/validators'

export default function Form(props) {
    const [isSaving, toggleSaving] = useState(false);
    const [errors, updateErrors] = useState([]);
    const [values, setValues] = useState(props.values || {})

    const handleFieldChange = (event) => {
        const fieldEl = event.target;
        const fieldName = fieldEl.name;
        const fieldSpec = props.schema.fields[fieldName];
        fieldSpec.onChange && fieldSpec.onChange(fieldEl);
        const fieldValue = fieldEl.type === "checkbox" ? fieldEl.checked : fieldEl.value;
        const fieldContainerEL = fieldEl.parentElement;
        const errorIndex = errors.indexOf(fieldName);
        const invalidInfo = fieldSpec.validators && getInvalidInfo(fieldValue, fieldSpec.validators);
        if (invalidInfo) {
            fieldSpec.errorText = invalidInfo.customErrMsg ? invalidInfo.customErrMsg : fieldSpec.label + ' ' + validators.errorMsgs[invalidInfo.name].replace('$$', invalidInfo.specs);
            fieldContainerEL.classList.add("error");
            errorIndex === -1 && errors.push(fieldName);
            updateErrors(errors);
        } else {
            fieldSpec.errorText = ''; // clear error div from previous errors.
            fieldContainerEL.classList.remove("error");
            errorIndex !== -1 && errors.splice(errorIndex, 1);
            updateErrors(errors);
        }
        fieldContainerEL.classList.remove("clean");
        setValues({...values, [fieldName]: fieldValue});
    }

    const checkIfHasErrors = () => {
        // if(props.values._id) return; /* uncomment this line if you gurantee that on edit all values will be valid*/
        props.schema.sections.forEach(section => {      
            section.fieldNames.forEach(fieldName=> {
                const fieldSpec =  props.schema.fields[fieldName];
                const invalid = fieldSpec.validators && getInvalidInfo(values[fieldName], fieldSpec.validators);
                invalid && errors.push(fieldName) && updateErrors([...errors]);
            });
        });
    }

    useEffect(checkIfHasErrors, []); // empty array to run an effect and clean it up only once

    const renderSections = sections => 
        sections.map((section, index) => <div class="section" key={index}>
            <h3> {section.title} </h3>
            {renderfields(section.fieldNames)}
        </div>);

    const renderfields = fields => fields.map((fieldName, index) => {
        const fieldSpec = props.schema.fields[fieldName];
        let fieldElement;
        switch(fieldSpec.type) {            
            case 'dropdown':
                fieldElement = 
                <React.Fragment> 
                    <label>{fieldSpec.label}</label>
                         <select name={fieldName} style={common.field} onChange={handleFieldChange} value={values[fieldName]} placeholder="Select an option">
                          {fieldSpec.options.map(selectOption => <option value={selectOption}>{selectOption}</option>)}
                        </select>
                    </React.Fragment>
                break;
            case 'checkbox':
                fieldElement = 
                <React.Fragment>
                    <input name={fieldName} type={fieldSpec.type} onChange={handleFieldChange} checked={values[fieldName]} />
                    <label> {fieldSpec.label} </label>
                </React.Fragment>
                break;

            case 'radio':
                fieldElement = <React.Fragment>
                         {fieldSpec.options.map(radioOption => <div>
                            <input id={radioOption} name={fieldName} type={fieldSpec.type} onChange={handleFieldChange} value={radioOption} checked={values[fieldName] === radioOption}/>
                            <label for={radioOption}>{radioOption}</label>
                        </div>)}
                    </React.Fragment>
                 break;
            default:
                fieldElement = 
                <React.Fragment>
                    <label> {fieldSpec.label} </label>
                    <input name={fieldName} clean style={common.field} key={index} type={fieldSpec.type} onChange={handleFieldChange} value={values[fieldName] || ""}/>
                </React.Fragment>
        }
        return <div class="field" >
            {fieldElement}
            {fieldSpec.validators && <div class="error-msg"> { fieldSpec.errorText } </div> }
        </div>
    });

    const goBack = useHistory().goBack;
    const onSaveClicked = () => {
        props.onSaveClicked(values);
        toggleSaving(true);
        setTimeout(goBack, 2000); // to simulate request to API
    }

    const getInvalidInfo = (value, fieldValidationRules) => {
        let invalidInfo;
        const invalid = fieldValidationRules.some(validatorInfo => {
            invalidInfo = validatorInfo;
            return !validators.getValidator(validatorInfo.name)(value, validatorInfo.specs);
        });
        return invalid && invalidInfo;
    }

    /* Currently not used, uncomment it when you need it
    const isRequiredField = (fieldSpec) => {
        return fieldSpec.validators && fieldSpec.validators.some(fieldValidator =>  fieldValidator.name === 'required');
    }*/

    return (
       <div style={common.container}>
        <h2>{props.schema.title}</h2>
         <div style={common.flexBetween}>
        <button onClick={goBack} style={{...common.cursorPointer, ...common.button, ...common.secondary}} >
          Cancel
          </button>
          <button disabled= {errors.length} onClick={onSaveClicked} class="save-button" style={{...common.cursorPointer, ...common.button}}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          </div>
         {renderSections(props.schema.sections)}
       </div>
       );
}
