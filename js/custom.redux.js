let reducers;

class Store {
  constructor(state) {
    this.observers = [];
    this.state = state;
  }
  getState() {
    let state = {};
    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        state[key] = this.state[key].value;
      }
    }
    return state;
  }
  subscribe(handler) {
    this.observers.push(handler);
    handler(this.getState());
  }
  dispatch(action) {
    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        let itemState = this.state[key];
        let changeItemState = itemState.reducer(itemState.value, action);
        this.state[key].value = changeItemState;
        let state = {};
        state[key] = changeItemState;
        this.emit(state);
      }
    }
  }
  emit(state) {
    for (let observer of this.observers) {
      if (!state) observer(this.getState());
      else observer(state);
    }
  }
}

export function combineReducers (reducersObject) {
 reducers = reducersObject;
 return reducers;
}

export function createStore(reducers) {
  let state = {};
  for (let key in reducers) {
    if (reducers.hasOwnProperty(key)) {
      state[key] = {};
      state[key].reducer = reducers[key];
      state[key].value = reducers[key]();      
    }
  }
  return new Store(state);
}