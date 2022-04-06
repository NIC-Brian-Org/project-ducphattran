"use strict";

class Land {
    constructor(_landId, _status, _fruitId, _harvestableAmount) {
        this.id = _landId
        this.status = _status // [0]: Can not harvest, [1]: Harvestable
        this.fruitId = _fruitId
        this.harvestableAmount = _harvestableAmount
    }

    harvest (fruit) {
        // Ensure the land is harvestable
        if (this.status = 1) {
            fruit.quantity = parseInt(fruit.quantity) + parseInt(this.harvestableAmount)
            this.harvestableAmount = 0
            this.status = 0
            this.fruitId = null
        }
    }

    plant (fruitId) {
        // Ensure the land is harvested
        if (this.status = 0) {
            this.fruitId = fruitId
            this.harvestableAmount = 0
        }

        return this
    }

    grow(amountToGrow) {
        // Ensure the land is not harvestable
        if (this.status = 0 && this.fruitId) {
            this.harvestableAmount = parseInt(amountToGrow) + parseInt(this.harvestableAmount)
        }
    }

}