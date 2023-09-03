import execa from 'execa';

test('Should have "files" and "dirs" fields', async () => {
    const { stdout } = await execa('node', ['tree.js', './']);
    const result = JSON.parse(stdout);
    expect(result).toHaveProperty('files');
    expect(result).toHaveProperty('dirs');
});

test('Should contain specific directories', async () => {
    const { stdout } = await execa('node', ['tree.js', './']);
    const result = JSON.parse(stdout);
    const dirs = result.dirs.map(dir => dir.split('/').pop()); // Извлекаем только имена папок
    expect(dirs).toEqual(expect.arrayContaining(['01', '03', '05', '07']));
});

test('Should contain specific files', async () => {
    const { stdout } = await execa('node', ['tree.js', './']);
    const result = JSON.parse(stdout);
    expect(files).toEqual(expect.arrayContaining([
        '01/maxItemAssociation.test.js',
        '03/promiseReduce.test.js',
        '05/getPath.test.js',
        '07/tree.test.js'
    ]));
});