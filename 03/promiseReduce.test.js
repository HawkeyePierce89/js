const promiseReduce = require('./promiseReduce');

const asyncFunctions = [
  () => {
    console.log('fn1');
    return Promise.resolve(1);
  },
  () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
  }),
];

const reduce = (memo, value) => {
  console.log('reduce');
  return memo * value;
};

describe('promiseReduce', () => {
  test('should resolve with the correct value', async () => {
    const result = await promiseReduce(asyncFunctions, reduce, 1);
    expect(result).toBe(2);
  });

  test('should reject if any of the promises is rejected', async () => {
    const failingAsyncFunctions = [
      ...asyncFunctions,
      () => Promise.reject(new Error('test error')),
    ];

    await expect(promiseReduce(failingAsyncFunctions, reduce, 1)).rejects.toThrow('test error');
  });
})
