const sum = require('./sum');

describe('sum', () => {
    it('should return sum of numbers', () => {
        expect(sum(1)(2)(3)()).toEqual(6);
        expect(sum(1)(2)(3)(4)()).toEqual(10);
        expect(sum(1)(2)(3)(4)(5)()).toEqual(15);
    });
});
