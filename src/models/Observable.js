Lines.Observable = function() {
  this.observers = [];
  this.handledEvents = [];
};

Lines.Observable.prototype.registerObserver = function(observer, event) {
  var unhandledEvent = this.handledEvents.indexOf(event) == -1;
  if (unhandledEvent) {
    throw new Error('unhandled event');
  }
  
  if (this.observers[event] == undefined) {
    this.observers[event] = [];
  }
  this.observers[event].push(observer);
};

Lines.Observable.prototype.notifyObservers = function(event) {
  if (this.observers[event] == undefined) {
    return;
  }
  
  var eventObservers = this.observers[event];
  eventObservers.forEach(function(observer) {
    observer.notify(event);
  });
};
