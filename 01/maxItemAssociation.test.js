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
    });
});
