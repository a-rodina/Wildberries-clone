export function addItem(object) {
    if (localStorage.getItem('cartElements')) {
        let arrayCartElements = JSON.parse(localStorage.getItem('cartElements'));
        arrayCartElements.push(object);
        localStorage.setItem('cartElements', JSON.stringify(arrayCartElements));
    } else {
        localStorage.setItem('cartElements', JSON.stringify([object]));
    }
}

export function deleteAll() {
    localStorage.clear();
}

export function getItem() {
    if (localStorage.getItem('cartElements')) {
        console.log(JSON.parse(localStorage.getItem('cartElements')))
        return JSON.parse(localStorage.getItem('cartElements'));
    }
    return [];
}