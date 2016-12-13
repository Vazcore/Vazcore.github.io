export default class {
  constructor () {
    this.observers = [];
  }
  subscribe(update) {
    this.observers.push(update);
  }
  unsubscribe(update) {
    for (let [index, value] of this.observers.entries()) {
      if (value == update) {
        delete this.observers[index];
        this.observers.splice(index, 1);
      }
    }
  }
  emit(data) {
    for (let update of this.observers) {
      update(data);
    }
  }
}