const fs = require('fs');
const indexFile = require('./indexFile.js');
const path = require('path');

const outputPath = path.join(__dirname, 'temp-output.txt');
const inputPath = path.join(__dirname, 'temp-input.txt');

const createTempInputFile = content => {
    fs.writeFileSync(inputPath, content);
};

const readFileContent = path => fs.readFileSync(path, 'utf8');

describe('Word Indexer Tests', () => {
    afterEach(() => {
        // Удаление временных файлов после каждого теста
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    });

    const testCases = [
        { input: 'a c b b', expected: '1, 2, 1' },
        { input: 'ab cb bss b', expected: '1, 1, 1, 1' },
        { input: 'ab, cb, bss, cb, b, cb', expected: '1, 1, 1, 3' },
        { input: 'alex, alex, juan, dima', expected: '2, 1, 1' }
    ];

    testCases.forEach(({ input, expected }) => {
        test(`${input} → ${expected}`, async () => {
            createTempInputFile(input);
            await indexFile(inputPath, outputPath);
            const output = readFileContent(outputPath);
            expect(output).toBe(expected);
        });
    });
});