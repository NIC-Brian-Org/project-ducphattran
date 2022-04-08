"use strict"

/**
 *  INITIALIZE
 */

// Set data for the first attempt
setFruits(mockupData.fruits)
setLands(mockupData.lands)
setMoney(mockupData.money)

/**
 * Initialize fruits
 * @param {array} _fruits 
 */
function setFruits(_fruits) {
    // Create Fruit objects
    _fruits.forEach((fruit) => {
        const { id, name, price, quantity, imageSrc } = fruit
        const newFruit = new Fruit(id, name, price, quantity, imageSrc)

        // Update to global variable
        fruits.push(newFruit)
    })
}

/**
 * Initialize lands
 * @param {array} _lands 
 */
function setLands(_lands) {
    // Create land objects
    _lands.forEach((land) => {
        const { id, status, fruitId, harvestAmount } = land
        const newLand = new Land(id, status, fruitId, harvestAmount)

        // Update to global variable
        lands.push(newLand)
    })
}

/**
 * 
 * @param {int} _totalMoney 
 */
function setMoney(_totalMoney) {
    document.getElementById("total-money").textContent = _totalMoney
}

/**
 *  Automatically grow
 */
 function startGrowingAllLand(increment, delayTime) {
    // Reset interval
    clearInterval(growInterval)
    // Create new interval
    growInterval = setInterval(() => {
        // Update lands
        lands.forEach((land) => {
            // Ensure the land is planted
            if (land.status === 1) {
                land.grow(increment)
                const landElement = document.getElementById(`land-${land.id}`)
                updateHarvestableAmount(landElement, land.harvestableAmount)
            }
        })
    }, delayTime)
}