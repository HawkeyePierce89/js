const listFilesAndDirs = require('./tree');

test('Should have "files" and "dirs" fields', async () => {
    const result = await listFilesAndDirs('./');
    expect(result).toHaveProperty('files');
    expect(result).toHaveProperty('dirs');
});

test('Should contain specific directories', async () => {
    const result = await listFilesAndDirs('./');
    const dirs = result.dirs.map(dir => dir.split('/').pop()); // Извлекаем только имена папок
    expect(dirs).toEqual(expect.arrayContaining(['01', '03', '05', '07']));
});

test('Should contain specific files', async () => {
    const { files } = await listFilesAndDirs('./');
    expect(files).toEqual(expect.arrayContaining([
        '01/maxItemAssociation.test.js',
        '03/promiseReduce.test.js',
        '05/getPath.test.js',
        '07/tree.test.js'
    ]));
});
