/**
 * @author Nermeen Mattar
 * Validator module will contain all the custom validators needed in forms.
 * New validation rule will be added to this file to be available to any field.
 */
export const validators = (function() {
  /* The list of all validator messages */
  const errorMsgs = {
    number: 'should be a valid number',
    positive: 'should be a positive number ',
    required: 'is Required',
    email: 'should be a valid a email address',
    username: 'should only contain letters, digits, hyphens and underscores',
    url: 'should be a valid url',
    minlength: 'should have a minimum of $$ characters ',
    maxlength: 'should have a maximum length of $$',
  };

  /**
     * An object where the key is the validator name and the value is the
     * validator function. A validator function does certain checks on each
     * change in the attached input.
     */
  const validatorsFunctions = {
    required: (value) => {
      return value !== undefined && value !== null && String(value).length > 0;
    },
    isChecked: (value) => {
      return value;
    },
    minlength: (value, minAllowedLength) => {
      return value === '' || String(value).length > minAllowedLength;
    },
    maxlength: (value, maxAllowedLength) => {
      return value === '' || String(value).length < maxAllowedLength;
    },
    number: (value) => {
      return value === '' || !isNaN(Number(value)) ? true : false;
      // true mean there is an error
    },
    positive: (value) => {
      return value === '' || Number(value) >= 0 ? true : false;
      // true mean there is an error
    },
    email: (value) => {
      const emailRegExp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return value === '' || emailRegExp.test(value);
    },
    username: (value) => {
      const usernameRegExp = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
      return value === '' || usernameRegExp.test(value);
    },
    url: (value) => {
      const usernameRegExp = /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
      return value === '' || usernameRegExp.test(value);
    },
    equal: (sectionEl) => { // section validator
      const inputControls = sectionEl.getElementsByTagName('input');
      const value = inputControls[0].value;
      let areEqual = true;
      for (let i = 1; i < inputControls.length; i++) {
        if (inputControls[i].value !== value) {
          areEqual = false;
          break;
        }
      }
      return areEqual;
    },
  };

  function getValidator(validatorName, specifications) {
    return validatorsFunctions[validatorName];
  }


  return {
    getValidator: getValidator,
    errorMsgs: errorMsgs,
  };
})();
