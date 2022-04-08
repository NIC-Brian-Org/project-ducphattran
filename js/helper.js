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

/**
 *  Handle different FruitModalType
 */
/**
 *
 */
function handleFruitModalType() {
    if (fruitModalType === fruitModalTypes.INVENTORY) {
        // Add Title
        document.getElementById("fruit-modal-header").textContent =
            INVENTORY_TITLE
        // Hide "Plant" button
        document.getElementById("plant-seed-button").classList.add("d-none")
        // Show "Close" button
        document
            .getElementById("fruit-modal-close-button")
            .classList.remove("d-none")
        // remove class "fruit" to list of fruits
        removeClassToAllElements("inventory-item", "fruit")
    } else {
        // Add Title
        document.getElementById("fruit-modal-header").textContent =
            PLAN_SEED_TITLE
        // Show "Plant" button
        document.getElementById("plant-seed-button").classList.remove("d-none")
        // Remove "Close" button
        document
            .getElementById("fruit-modal-close-button")
            .classList.add("d-none")
        // add class "fruit" to list of fruits
        addClassToAllElements("inventory-item", "fruit")
    }
}

// Toggle class to all fruit boxes
function addClassToAllElements(_baseClassName, _className) {
    const elements = document.getElementsByClassName(_baseClassName)
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(_className)
    }
}

// Toggle class to all fruit boxes
function removeClassToAllElements(_baseClassName, _className) {
    const elements = document.getElementsByClassName(_baseClassName)
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(_className)
    }
}
