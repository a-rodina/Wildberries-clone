'use strict'
const root = document.querySelector('#root');

import {makeHeader, makeSlider, makeSectionProductCards, createCart} from './elements.js';

makeHeader(root);
makeSlider(root);
makeSectionProductCards(root);
createCart(root);

new Swiper('.slider-wrap', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
});

