"use strict"
/**
 *  This file is a class representing lands
 */

class Land {
    constructor(_landId, _status, _fruitId, _harvestableAmount) {
        this.id = _landId
        this.status = _status // [0]: Can not harvest, [1]: Harvestable
        this.fruitId = _fruitId
        this.harvestableAmount = _harvestableAmount
    }

    /**
     *  Set amount to = 0 and  change it to unplanted status
     */
    harvest() {
        // Ensure the land is planted
        if (this.status === 1) {
            this.harvestableAmount = 0
            this.status = 0
            this.fruitId = null
        }
    }

    /**
     *  - Update the new fruitId and status. Then start with 0 amount.
     * @param {int} _fruitId 
     */
    plant(_fruitId) {
        // Ensure the land is harvested
        if (this.status === 0) {
            this.fruitId = _fruitId
            this.harvestableAmount = 0
            this.status = 1
        }
    }

    /**
     *  Increase the harvestable amount
     * @param {int} amountToGrow 
     */
    grow(amountToGrow) {
        // Ensure the land is planted
        if (this.status === 1 && this.fruitId) {
            this.harvestableAmount =
                parseInt(amountToGrow) + parseInt(this.harvestableAmount)
        }
    }
}
