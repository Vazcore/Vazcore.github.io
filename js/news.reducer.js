let defaultState = new Map();
export default (state = defaultState, action = {type:null,payload: {}} ) => {
  let newState = new Map();
  switch (action.type) {
    case 'INSERT':
      state.forEach((el, key) => {
        newState.set(key, el);
      });      
      action.payload.forEach((el, key) => {
        newState.set(key, el);
      });
      break;
    case 'ADD':
      state.forEach((el, key) => {
        newState.set(key, el);
      });
      newState.set(action.payload.key, action.payload.value);
      break;

    case 'REMOVE':
      state.forEach((el, key) => {        
        if (key !== action.payload.key) {
          newState.set(key, el);
        }
      });
      break;

    default:
      break;
  }
  return newState;
}