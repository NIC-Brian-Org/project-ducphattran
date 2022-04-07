"use strict"

class Land {
    constructor(_landId, _status, _fruitId, _harvestableAmount) {
        this.id = _landId
        this.status = _status // [0]: Can not harvest, [1]: Harvestable
        this.fruitId = _fruitId
        this.harvestableAmount = _harvestableAmount
    }

    harvest() {
        // Ensure the land is planted
        if (this.status === 1) {
            this.harvestableAmount = 0
            this.status = 0
            this.fruitId = null
        }
    }

    plant(_fruitId) {
        // Ensure the land is harvested
        if (this.status === 0) {
            this.fruitId = _fruitId
            this.harvestableAmount = 0
            this.status = 1
        }
        return this
    }

    grow(amountToGrow) {
        // Ensure the land is planted
        if (this.status === 1 && this.fruitId) {
            this.harvestableAmount =
                parseInt(amountToGrow) + parseInt(this.harvestableAmount)
        }
    }
}
