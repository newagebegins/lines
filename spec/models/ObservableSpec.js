describe("Observable", function() {
  it("should notify observers", function() {
    var observerOne = {notify: function() {}};
    var observerTwo = {notify: function() {}};
    
    spyOn(observerOne, 'notify');
    spyOn(observerTwo, 'notify');
    
    var observable = new Lines.Observable();
    observable.handledEvents = ['eventOne', 'eventTwo'];
    
    observable.registerObserver(observerOne, 'eventOne');
    observable.registerObserver(observerOne, 'eventTwo');
    observable.registerObserver(observerTwo, 'eventTwo');
    
    observable.notifyObservers('eventOne');
    
    expect(observerOne.notify).toHaveBeenCalledWith('eventOne');
    expect(observerTwo.notify).not.toHaveBeenCalled();
    
    observable.notifyObservers('eventTwo');
    
    expect(observerOne.notify).toHaveBeenCalledWith('eventTwo');
    expect(observerTwo.notify).toHaveBeenCalledWith('eventTwo');
  });
});
