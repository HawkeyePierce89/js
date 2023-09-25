const maxItemAssociation = require('./maxItemAssociation');

describe('maxItemAssociation', () => {
  it('should return max item association', () => {
    expect(maxItemAssociation([["a", "b"], ["c", "a"], ["d", "e"]])).toEqual(["a", "b", "c"]);
    expect(maxItemAssociation([
      ["q", "w", 'a'],
      ["a", "b"],
      ["a", "c"],
      ["q", "e"],
      ["q", "r"],
    ])).toEqual(["a", "b", "c", "e", "q", "r", "w"]);
    expect(maxItemAssociation([
      ["q", "w"],
      ["z", "w"],
      ["a", "b"],
      ["a", "c"],
    ])).toEqual(["a", "b", "c"]);
    expect(maxItemAssociation([
      ["a", "b"],
      ["a", "c"],
      ["q", "w"],
      ["z", "w"],
    ])).toEqual(["a", "b", "c"]);
  });
});
