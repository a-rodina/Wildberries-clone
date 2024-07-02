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

    const basket = createElements('a', 'header-basket', null, null);
    basket.setAttribute('href', '#')
    headerWrap.append(basket);

    const icon = createElements('i', 'fa-solid', null, null);
    icon.classList.add('fa-cart-shopping');
    basket.append(icon);
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

export function makeSectionProductCards(root) {
    
    const sectionProductCards = createElements('section', 'product-cards', null, null);
    root.append(sectionProductCards);

    const container = createElements('div', 'container', null, null);
    sectionProductCards.append(container);

    const title = createElements('h1', 'product-cards-title', 'Хиты продаж', null);
    container.append(title);

    const cardsWrap = createElements('div', 'cards-wrap', null, null);
    container.append(cardsWrap);
    getContentCards().then(response => arrayTransform(response, cardsWrap));
}

async function getContentCards() {
    let response = await fetch('https://6683ed6956e7503d1adeb3f7.mockapi.io/Wildberries');
    return response.json();
}

function arrayTransform(array, cardsWrap) {
    cardsWrap.append(...createProductCards(array))
}

function createProductCards(objects) {
    let result = [];
    for (let i = 0; i < objects.length; i++) {
        let card = createElements('div', 'card', null, null);

        let firstCardBlock = createElements('div', 'first-card-bock', null, null);
        card.append(firstCardBlock);

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        let randomNumber = getRandomInt(1, 200) 
        let randomImage = `${objects[i].pictures}?random=${randomNumber}`

        let image = document.createElement('img');
        image.setAttribute('src', randomImage);
        image.setAttribute('alt', 'image');
        image.setAttribute('id', 'card-image');
        firstCardBlock.append(image);

        let secondCardBlock = createElements('div', 'second-card-bock', null, null);
        card.append(secondCardBlock);

        let priceCardBlock = createElements('div', 'price-card-bock', null, null);
        secondCardBlock.append(priceCardBlock);

        let price = createElements('p', 'price-card', objects[i].price, null);

        priceCardBlock.append(price);
        
        let oldPrice = createElements('p', 'old-price-card', '1000 р', null);
        priceCardBlock.append(oldPrice);

        let productName = createElements('h2', 'product-name', objects[i].title, null);
        secondCardBlock.append(productName);

        let buttonBasket = createElements('button', 'basket-button', 'В корзину', 'button');
        card.append(buttonBasket);

        result.push(card);
    }
    return result;
}