"use strict"
/**
 *  This file is a class representing fruits
 */

class Fruit {
    constructor(_fruitId, _name, _price, _quantity, _imageSrc) {
        this.id = _fruitId
        this.name = _name
        this.price = _price
        this.quantity = _quantity
        this.imageSrc = _imageSrc
    }

    increaseQuantity(_increment) {
        this.quantity += _increment
    }

    decreaseQuantity(_decrement) {
        this.quantity -= _decrement
    }
}
