function promiseReduce(asyncFunctions, reduce, initialValue) {
  let functionResult = Promise.resolve(initialValue);

  for (let asyncFunction of asyncFunctions) {
    functionResult = functionResult.then(
      promiseResult => asyncFunction().then(
        value => reduce(promiseResult, value)
      )
    );
  }

  return functionResult;
}

module.exports = promiseReduce;
