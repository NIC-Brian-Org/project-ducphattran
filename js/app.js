"use strict"

/**
 *  INITIALIZE
 */

// Set data for the first attempt
setFruits(mockupData.fruits)
setLands(mockupData.lands)


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
 *   Initialize lands
 * */
function setLands(_lands) {
    // Create land objects
    _lands.forEach((land) => {
        const { id, status, fruitId, harvestAmount } = land
        const newLand = new Land(id, status, fruitId, harvestAmount)

        // Update to global variable
        lands.push(newLand)
    })
}


