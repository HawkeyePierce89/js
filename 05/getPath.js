function getPath(el) {
  // Если у элемента есть id, сразу возвращаем его
  if (el.id !== '') {
    return `${el.nodeName.toLowerCase()}#${el.id}`;
  }

  // Инициализируем массив для хранения пути
  const path = [];

  // Проходим по дереву элементов вверх, пока не достигнем body
  while (el.nodeType === Node.ELEMENT_NODE && el.nodeName.toLowerCase() !== 'body') {
    // Создаем строку селектора с названием элемента
    let selector = el.nodeName.toLowerCase();

    // Проверяем, есть ли у элемента братья и сестры с тем же тегом
    const sameTagSiblingsArray = Array.from(el.parentNode.children)
      .filter(child => child.tagName === el.tagName);

    // Если такие элементы есть, добавляем к селектору номер элемента
    if (sameTagSiblingsArray.length > 1) {
      const index = sameTagSiblingsArray.indexOf(el) + 1;
      selector += `:nth-child(${index})`;
    }

    // Если у элемента есть id, добавляем его к селектору
    else if (el.id) {
      selector += '#' + el.id;
    }

    // Если у элемента есть один класс, добавляем его к селектору
    else if (el.className && el.className.split(' ').length === 1) {
      selector += '.' + el.className.split(' ').join('.');
    }

    // Добавляем полученный селектор в начало пути
    path.unshift(selector);

    // Переходим к родительскому элементу
    el = el.parentNode;
  }

  // Объединяем все элементы пути в одну строку, разделяя их ">", и начиная путь с "body"
  return 'body > ' + path.join(' > ');
}

module.exports = getPath;
