"use strict"

const fruits = []
const lands = []

// Initialize data for the first attempt
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

    renderFruitsInInventory()
    renderFruitsInSeedModal()
}

/**
 * 
 *  Render List of Fruits in Inventory
 */
function renderFruitsInInventory() {
    const fruitColumns = []
    for (let i = 0; i < fruits.length; i++) {
        const fruitCol = createFruitInventoryUI(fruits[i])
        fruitColumns.push(fruitCol)
    }

    // Render Fruits for Inventory Modal
    const inventoryContainer = document.getElementById("inventory-container")

    // Create 2 rows
    const row1 = document.createElement("row")
    row1.classList.add("row")
    const row2 = document.createElement("row")
    row2.classList.add("row")

    // Add 5 column to each row
    fruitColumns.forEach((col, index) => {
        if (index < 5) {
            row1.appendChild(col)
        } else {
            row2.appendChild(col)
        }
    })
    
    inventoryContainer.appendChild(row1)
    inventoryContainer.appendChild(row2)
}

/**
 * 
 *  Render List of Fruits in Inventory
 */
function renderFruitsInSeedModal() {
    const fruitColumns = []
    for (let i = 0; i < fruits.length; i++) {
        const fruitCol = createFruitInventoryUI(fruits[i])
        fruitCol.classList.remove("inventory_item")
        fruitCol.classList.add("fruit")
        fruitColumns.push(fruitCol)
    }

    // Render Fruits for Inventory Modal
    const seedContainer = document.getElementById("seed-container")

    // Create 2 rows
    const row1 = document.createElement("row")
    row1.classList.add("row")
    const row2 = document.createElement("row")
    row2.classList.add("row")

    // Add 5 column to each row
    fruitColumns.forEach((col, index) => {
        if (index < 5) {
            row1.appendChild(col)
        } else {
            row2.appendChild(col)
        }
    })
    
    seedContainer.appendChild(row1)
    seedContainer.appendChild(row2)
}

/**
 * 
 *  Create A Fruit UI
 */
function createFruitInventoryUI(_fruit) {
    // Container
    const col = document.createElement("div")
    col.classList.add(
        "col-md",
        "justify-content-center",
        "m-2",
        "p-1",
        "d-flex",
        "flex-column",
        "align-items-center",
        "rounded",
        "inventory-item"
    )
    
    // Image
    const fruitImage = document.createElement("img")
    fruitImage.classList.add("m-1", "p-1")
    fruitImage.src = _fruit.imageSrc

    //  Name
    const fruitName = document.createElement("span")
    fruitName.classList.add("p-1")
    fruitName.textContent = _fruit.name
    
    //  Quantity
    const fruitQuantity= document.createElement("span")
    fruitQuantity.classList.add("p-1", "m-2", "fruit-amount")
    fruitQuantity.textContent = `(${_fruit.quantity})`

    col.appendChild(fruitImage)
    col.appendChild(fruitName)
    col.appendChild(fruitQuantity)

    return col
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

    // Render  UI
    renderLands()
}

/**
 *  Create a row containing 3 lands
 */
function renderLands() {
    const landGroups = document.getElementsByClassName("land-group")
    let currentLandIndex = 0

    for (let k = 0; k < landGroups.length; k++) {
        // Add 3 rows
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("div")
            row.classList.add("row", "mb-3")
            // Add 3 cols to each row
            for (let j = 0; j < 3; j++) {
                const _landUI = createLandSquare(lands[currentLandIndex])
                row.appendChild(_landUI)
                currentLandIndex++
            }
            landGroups[k].appendChild(row)
        }
    }
}

/**
 *  Create a land square
 */
function createLandSquare(_land) {
    // Container
    const landContainer = document.createElement("div")
    landContainer.classList.add(
        "col-lg-4",
        "position-relative",
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "land"
    )

    //  Image
    const landImage = document.createElement("img")
    landImage.width = 100
    landImage.classList.add()

    //  Land detail
    const landDetailContainer = document.createElement("div")
    landDetailContainer.classList.add("land-detail")

    // Display image depends on status: [0] -> "soil_big.png", [1] -> "land_big.png"
    if (_land.status == 1) {
        landImage.src = "./assets/images/lands/land_big.png"
        // Add fruit image
        const fruitImage = document.createElement("img")
        fruitImage.src = getFruitById(_land.fruitId).imageSrc

        // Add harvest amount
        const harvestableAmount = document.createElement("span")
        harvestableAmount.classList.add("harvest_amount", "m-1", "p-1", "d-block")
        harvestableAmount.textContent = _land.harvestableAmount

        // Add to detail container
        landDetailContainer.appendChild(fruitImage)
        landDetailContainer.appendChild(harvestableAmount)

        // Add event handler
        landContainer.addEventListener("click", (e) => harvest(_land, landContainer))
    } else {
        landImage.src = "./assets/images/lands/soil_big.png"
        // Create plant button
        const plantButton = document.createElement("button")
        plantButton.classList.add("btn", "btn-primary")
        plantButton.innerHTML = "+"
        plantButton.setAttribute("type", "button")
        plantButton.setAttribute("data-target", "#seedModal")
        plantButton.setAttribute("data-toggle", "modal")

        // Add to detail container
        landDetailContainer.appendChild(plantButton)

        // Add event handler
        landContainer.addEventListener("click", (e) => plant(_land, landContainer))
    }

    landContainer.appendChild(landImage)
    landContainer.appendChild(landDetailContainer)


    return landContainer
}

/**
 *  Switch to Soil UI
 */
function changeToSoilUI(element) {
    const [landImage, landDetail] = element.childNodes
    // Change to soil background
    landImage.src = "./assets/images/lands/soil_big.png"
    // Create plant button
    const plantButton = document.createElement("button")
    plantButton.classList.add("btn", "btn-primary")
    plantButton.innerHTML = "+"
    plantButton.setAttribute("type", "button")
    plantButton.setAttribute("data-target", "#seedModal")
    plantButton.setAttribute("data-toggle", "modal")

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(plantButton)

    // Add event handler
    element.addEventListener("click", (e) => plant(_land, element))
}

/**
 *  Switch to Land UI
 */
function changeToLandUI(element) {
    const [landImage, landDetail] = element.childNodes
    // Change to soil background
    landImage.src = "./assets/images/lands/soil_big.png"
    // Create plant button
    const plantButton = document.createElement("button")
    plantButton.classList.add("btn", "btn-primary")
    plantButton.innerHTML = "+"
    plantButton.setAttribute("type", "button")
    plantButton.setAttribute("data-target", "#seedModal")
    plantButton.setAttribute("data-toggle", "modal")

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(plantButton)

    // Add event handler
    element.addEventListener("click", (e) => plant(_land, element))
}

/**
 *  
 */
function harvest(_land, landContainer) {
    changeToSoilUI(landContainer)
    // Re-render land with new status
    const fruit = fruits.find(fruit => fruit.id == _land.fruitId)
    _land.harvest(fruit)
}

function plant(_land, landContainer) {
    changeToLandUI(landContainer)
    // Re-render land with new status
    // const fruit = fruits.find(fruit => fruit.id == _land.fruitId)
    // _land.harvest(fruit)
}

/**
 *  Get Fruit By Id
 */
function getFruitById(_fruitId) {
    const fruit = fruits.find((_fruit) => _fruit.id == _fruitId)
    return fruit
}

