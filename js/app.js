"use strict"

/**
 *  This file initializes the data before rendering
 */

// Set data for the first attempt
setFruits()
setLands()
setMoney()

/**
 * Initialize fruits
 * @param {array} _fruits 
 */
function setFruits() {
    const data = getDataFromLocalStorage(storageName.FRUIT)
    if (!data) {
        // Store to local storage if not existed
        storeToLocalStorage(storageName.FRUIT, mockupData.fruits)
    }

    // Render fruit boxes from local storage
    const _fruits = getDataFromLocalStorage(storageName.FRUIT)
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
function setLands() {
    const data = getDataFromLocalStorage(storageName.LAND)
    if (!data) {
        // Store to local storage if not existed
        storeToLocalStorage(storageName.LAND, mockupData.lands)
    }

    // Render land boxes from local storage
    const _lands = getDataFromLocalStorage(storageName.LAND)
    _lands.forEach((land) => {
        const { id, status, fruitId, harvestableAmount } = land
        const newLand = new Land(id, status, fruitId, harvestableAmount)

        // Update to global variable
        lands.push(newLand)
    })
}

/**
 *  Initialize total money
 * @param {int} _money 
 */
function setMoney() {
    const data = getDataFromLocalStorage(storageName.MONEY)
    if (!data) {
        // Store to local storage if not existed
        storeToLocalStorage(storageName.MONEY, mockupData.money)
    }

    totalMoney = getDataFromLocalStorage(storageName.MONEY)

    document.getElementById("money").textContent = totalMoney
}

/**
 * Automatically grow with a fixed time
 * @param {int} increment 
 * @param {int} delayTime 
 */
 function startGrowingAllLand(increment, delayTime) {
    // Reset interval
    clearInterval(growInterval)
    // Create new interval
    growInterval = setInterval(() => {
        // Update lands
        lands = lands.map((land) => {
            // Ensure the land is planted
            if (land.status === 1) {
                land.grow(increment)
                updateHarvestableAmount(land)
            }

            return land
        })
        
        // Update to local storage
        storeToLocalStorage(storageName.LAND, lands)
    }, delayTime)
}

/**
 *  Save to local storage
 * @param {string} _storageName 
 * @param {array | string} data 
 */
function storeToLocalStorage(_storageName, data) {
    localStorage.setItem(_storageName, JSON.stringify(data))
}

/**
 * Get data from local storage by name
 * @param {string} _storageName 
 * @returns Array | String
 */
function getDataFromLocalStorage(_storageName) {
    const data = localStorage.getItem(_storageName)
    
    return JSON.parse(data)
}