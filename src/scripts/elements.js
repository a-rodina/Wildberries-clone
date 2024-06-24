export function createHeader(root) {
    const header = createElements('header', 'header', null, null);
    root.append(header);

    const container = createElements('div', 'container', null, null);
    header.append(container);

    const headerWrap = createElements('div', 'header-wrap', null, null);
    container.append(headerWrap);

    const logo = createElements('span', 'header-logo', 'wildberries', null);
    headerWrap.append(logo);
    
    const search = createElements('input', 'header-search', null, 'text');
    search.setAttribute('placeholder', 'Найти на Wildberries');
    headerWrap.append(search);

    const basket = createElements('button', 'header-basket', 'Корзина', 'button');
    headerWrap.append(basket);
}

function createElements(tagName, className, text, type) {
    const element = document.createElement(tagName);
    element.innerHTML = text;
    element.classList.add(className);
    if (type !== null) {
        element.setAttribute('type', type)
    }
    return element;
}

