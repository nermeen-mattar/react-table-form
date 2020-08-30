const initialState = {
  name: 'Products',
  heads: ['ID', 'First Name', 'First Name', 'First Name', 'First Name'],
  rows: [[1, 'John', 'Doe', '123-456-7890', '789 Elm St.'], [1, 'John', 'Doe', '123-456-7890', '789 Elm St.']]
};

const tableReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "INIT_OBJECTS":
      debugger;
      const objects = action.value;
      const propertyNames = Object.keys(objects[0]);
      newState.heads = propertyNames.map(property => property.replace('_', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase()))
      newState.rows = objects.map(obj => propertyNames.map(property => obj[property]));
      break;
    case "CREATE_OBJECT_ASYNC":
      newState.objects = [...initialState.objects, action.value];
      break;
  }
  return newState;
};

export default tableReducer;
