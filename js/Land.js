"use strict";

class Land {
    constructor(_landId, _status, _fruitId, _harvestableAmount) {
        this.id = _landId
        this.status = _status
        this.fruitId = _fruitId
        this.harvestableAmount = _harvestableAmount
    }

    harvest () {}

    plant () {}

}