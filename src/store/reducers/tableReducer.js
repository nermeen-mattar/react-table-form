const initialState = {
  // name: 'Products',
  // heads: ['ID', 'First Name', 'First Name', 'First Name', 'First Name'],
  // rows: [[1, 'John', 'Doe', '123-456-7890', '789 Elm St.'], [1, 'John', 'Doe', '123-456-7890', '789 Elm St.']],
  objects: []
};

const tableReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "INIT_OBJECTS":
      debugger;
      newState.objects = action.value;
      break;
    case "CREATE_OBJECT_ASYNC":
      newState.objects = [...initialState.objects, action.value];
      break;
  }
  return newState;
};

export default tableReducer;
