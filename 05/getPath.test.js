const getPath = require('./getPath');

describe('getPath', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('Путь для элемента с ID', () => {
        container.innerHTML = '<div id="test"></div>';
        const element = document.querySelector('#test');
        expect(getPath(element)).toBe('div#test');
    });

    test('Путь для элемента с классом', () => {
        container.innerHTML = '<div class="test"></div>';
        const element = document.querySelector('.test');
        expect(getPath(element)).toBe('body > div > div.test');
    });

    test('Путь для единственного потомка', () => {
        container.innerHTML = '<div><span class="test"></span></div>';
        const element = document.querySelector('.test');
        expect(getPath(element)).toBe('body > div > div > span.test');
    });

    test('Путь для не единственного потомка', () => {
        container.innerHTML = '<div><span></span><span class="test"></span></div>';
        const element = document.querySelector('.test');
        expect(getPath(element)).toBe('body > div > div > span:nth-child(2)');
    });

    test('Путь для элемента без класса и ID', () => {
        container.innerHTML = '<div><p>Test</p></div>';
        const element = document.querySelector('p');
        expect(getPath(element)).toBe('body > div > div > p');
    });

    test('Путь для глубоко вложенного элемента', () => {
        container.innerHTML = '<div><div><div><span class="test"></span></div></div></div>';
        const element = document.querySelector('.test');
        expect(getPath(element)).toBe('body > div > div > div > div > span.test');
    });
});
