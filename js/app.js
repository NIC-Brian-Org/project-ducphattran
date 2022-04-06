"use strict"

/**
 *  INITIALIZE
 */
// Set data for the first attempt
setFruits()
setLands()

/**
 *  RENDER
 */

function setFruits() {
    // Create Fruit objects
    mockupFruits.forEach((mockupFruit) => {
        const { id, name, price, quantity, imageSrc } = mockupFruit
        const newFruit = new Fruit(id, name, price, quantity, imageSrc)
        fruits.push(newFruit)
    })
}


/**
 *   Initialize lands
 * */
function setLands() {
    // Create land objects
    mockupLands.forEach((mockupLand) => {
        const { id, status, fruitId, harvestAmount } = mockupLand
        const newLand = new Land(id, status, fruitId, harvestAmount)
        lands.push(newLand)
    })
}
