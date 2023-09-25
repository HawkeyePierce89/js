const { exec } = require('child_process');
const path = require('path');

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

const absolutePathToTree = path.resolve(__dirname, 'tree.js');

test('Should have "files" and "dirs" fields', async () => {
  const stdout = await runCommand(`node ${absolutePathToTree} ./`);
  const result = JSON.parse(stdout);
  expect(result).toHaveProperty('files');
  expect(result).toHaveProperty('dirs');
});

test('Should contain specific directories', async () => {
  const stdout = await runCommand(`node ${absolutePathToTree} ./`);
  const result = JSON.parse(stdout);
  const dirs = result.dirs.map(dir => dir.split('/').pop());
  expect(dirs).toEqual(expect.arrayContaining(['01', '03', '05', '07']));
});

test('Should contain specific files', async () => {
  const stdout = await runCommand(`node ${absolutePathToTree} ./`);
  const result = JSON.parse(stdout);
  expect(result.files).toEqual(expect.arrayContaining([
    '01/maxItemAssociation.test.js',
    '03/promiseReduce.test.js',
    '05/getPath.test.js',
    '07/tree.test.js'
  ]));
});
