import {sliderObject} from './objects.js';

export function makeHeader(root) {
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

function createItemsForSlider() {
    let result = [];
    for (let i = 1; i <= 5; i++) {
        let item = document.createElement('div');
        item.classList.add('swiper-slide');
        let image = document.createElement('img');
        image.setAttribute('src', sliderObject[i]);
        image.setAttribute('alt', 'image');
        image.setAttribute('id', 'slider-image');
        item.append(image);
        result.push(item);
    }
    return result;
}

export function makeSlider(root) {
    const sectionSlider = createElements('section', 'section-slider', null, null);
    root.append(sectionSlider);

    const container = createElements('div', 'container', null, null);
    sectionSlider.append(container);

    const swiper = createElements('div', 'swiper', null, null);
    swiper.classList.add('slider-wrap');
    container.append(swiper);

    const swiperWrap = createElements('div', 'swiper-wrapper', null, null);
    swiper.append(swiperWrap);
    
    swiperWrap.append(...createItemsForSlider());

    const pagination = createElements('div', 'swiper-pagination', null, null);
    swiper.append(pagination);

    const buttonPrev = createElements('div', 'swiper-button-prev', null, null);
    swiper.append(buttonPrev);

    const buttonNext = createElements('div', 'swiper-button-next', null, null);
    swiper.append(buttonNext);
}

