const fs = require('fs').promises;
const path = require('path');

// функция для получения списка всех файлов и папок
async function listFilesAndDirs(rootPath) {
  const result = {
    files: [],
    dirs: []
  };

  // функция для обхода директории и всех её поддиректорий
  async function traverse(dir) {
    // Добавляем текущую директорию в список
    result.dirs.push(dir);

    // Чтение содержимого директории
    const entries = await fs.readdir(dir, {withFileTypes: true});

    // Обход всех файлов и папок в текущей директории
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // Если это директория, обходим её рекурсивно
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else {
        // Если это файл, добавляем его в список
        result.files.push(fullPath);
      }
    }
  }

  await traverse(rootPath);

  return result;
}

if (process.argv[2]) {
  listFilesAndDirs(process.argv[2])
    .then(result => console.log(result))
    .catch(err => console.error(err));
} else {
  module.exports = listFilesAndDirs;
}
