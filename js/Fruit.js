"use strict";

class Fruit {
    constructor(_fruitId, _name, _price, _quantity, _imageSrc) {
        this.id = _fruitId
        this.name = _name
        this.price = _price
        this.quantityInStock = _quantity
        this.imageSrc = _imageSrc
    }

    sell() {}

    increaseQuantity() {}

    getImageSrc (_fruitId) {

    }
}