describe("RandomNumberGenerator", function() {
  it("should generate random integer between min and max inclusively", function() {
    var mathRandomFunction = Math.random;
    
    var min = 1;
    var max = 10;
    var result;
    
    Math.random = function() { return 0; };
    result = Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively(min, max);
    expect(result).toEqual(1);
    
    Math.random = function() { return 0.99; };
    result = Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively(min, max);
    expect(result).toEqual(10);
    
    Math.random = mathRandomFunction;
  });
});
