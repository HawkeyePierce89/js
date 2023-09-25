const fs = require('fs');
const readline = require('readline');
const {Transform} = require('stream');

// Функция для очистки слова от нетекстовых символов и приведения к нижнему регистру
function cleanWord(word) {
  return word.trim().replace(/[^a-zA-Zа-яА-Я0-9]/g, '').toLowerCase();
}

// Класс WordIndexer наследуется от Transform потока и предназначен для индексации слов
class WordIndexer extends Transform {
  constructor() {
    super({objectMode: true}); // Инициализация в режиме обработки объектов
    this.wordCount = {}; // Объект для хранения подсчета слов
  }

  // Функция преобразования потока
  _transform(chunk, encoding, done) {
    // Разделение строки на слова, очистка и фильтрация
    const words = chunk.split(/\s+/).map(cleanWord).filter(Boolean);

    // Подсчет слов
    for (const word of words) {
      this.wordCount[word] = (this.wordCount[word] || 0) + 1;
    }

    done(); // Завершение преобразования
  }

  // Функция, вызываемая при завершении входных данных потока
  _flush(done) {
    // Отсортированные ключи объекта wordCount
    const sortedKeys = Object.keys(this.wordCount).sort();
    // Создание результата в виде вектора
    const resultVector = sortedKeys.map(key => this.wordCount[key]);
    this.push(resultVector.join(', ')); // Отправка результата в выходной поток
    done(); // Завершение потока
  }
}

// Функция индексации файла
function indexFile(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    // Создание потоков чтения и записи
    const readStream = fs.createReadStream(inputFile, {encoding: 'utf8'});
    const writeStream = fs.createWriteStream(outputFile, {encoding: 'utf8'});

    // Создание построчного чтения с использованием интерфейса readline
    const lineReader = readline.createInterface({
      input: readStream,
      output: new WordIndexer(),
      terminal: false
    });

    // Обработка каждой строки и отправка ее в поток индексации
    lineReader
      .on('line', function (line) {
        lineReader.output.write(line + ' ');
      })
      .on('close', function () {
        lineReader.output.end(); // Завершение потока при завершении чтения
      });

    lineReader.output
      .pipe(writeStream)
      .on('finish', () => {
        console.log('Indexing complete');
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports = indexFile;
