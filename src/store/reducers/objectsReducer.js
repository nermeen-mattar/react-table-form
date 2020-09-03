const initialState = {
  // name: 'Products',
  // heads: ['ID', 'First Name', 'First Name', 'First Name', 'First Name'],
  // rows: [[1, 'John', 'Doe', '123-456-7890', '789 Elm St.'], [1, 'John', 'Doe', '123-456-7890', '789 Elm St.']],
  objects: []
};

const objectsReducer = (state = initialState, action) => {
  const newState = { ...state };
  debugger;
  switch (action.type) {
    case "INIT_OBJECTS":
      newState.objects = action.value;
      break;
    case "CREATE_OBJECT_ASYNC":
      newState.objects.push(action.value);
      break;
    case "EDIT_OBJECT_ASYNC":
      const objectIndex = newState.objects.findIndex(object => object._id === action.value._id);
      newState.objects[objectIndex] = action.value; // add a preventive check if objectIndex -1
      break;
    default: 
      return newState;
  }
  return newState;
};

export default objectsReducer;
