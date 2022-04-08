/**
 *  Get Fruit By Id
 * @param {int} _fruitId 
 * @returns Fruit
 */
 function getFruitById(_fruitId) {
    const fruit = fruits.find((_fruit) => _fruit.id == _fruitId)
    return fruit
}

/**
 * Get Land By Id
 * @param {int} _landId 
 * @returns Land
 */
function getLandById(_landId) {
    const land = lands.find((_land) => _land.id == _landId)
    return land
}
