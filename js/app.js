"use strict"

const fruits = []
const lands = []

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
    // for (let i=0; i < lands.length; i++){
    mockupLands.forEach((mockupLand) => {
        const { id, status, fruitId, harvestAmount } = mockupLand
        const newLand = new Land(id, status, fruitId, harvestAmount)
        lands.push(newLand)
    })

    // Render  UI
    renderLands(mockupLands)
}

/**
 *  Create a row containing 3 lands
 */
function renderLands(_lands) {
    const landGroups = document.getElementsByClassName("land-group")
    let currentLandIndex = 0

    for (let k = 0; k < landGroups.length; k++) {
        // Add 3 rows
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("div")
            row.classList.add("row", "mb-3")
            // Add 3 cols to each row
            for (let j = 0; j < 3; j++) {
                const _landUI = createLandSquare(_lands[currentLandIndex])
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
        const harvestAmount = document.createElement("span")
        harvestAmount.classList.add("harvest_amount", "m-1", "p-1", "d-block")
        harvestAmount.textContent = _land.harvestAmount

        // Add to detail container
        landDetailContainer.appendChild(fruitImage)
        landDetailContainer.appendChild(harvestAmount)
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
    }

    landContainer.appendChild(landImage)
    landContainer.appendChild(landDetailContainer)
    return landContainer
}

/**
 *  Render Fruit Image
 */
function getFruitById(_fruitId) {
    const fruit = fruits.find((_fruit) => _fruit.id == _fruitId)
    return fruit
}

// Initialize data for the first attempt
setFruits()
setLands()
