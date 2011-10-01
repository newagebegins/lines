describe("Ball", function() {
  it("should raise an exception if color is not correct", function() {
    var correctColor = 'red';
    expect(function() {Lines.Ball.create(correctColor);}).not.toThrow('Incorrect color.');
    
    var incorrectColor = 'white';
    expect(function() {Lines.Ball.create(incorrectColor);}).toThrow('Incorrect color.');
  });
});