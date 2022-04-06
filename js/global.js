"use strict"
// List of fruits
let fruits = []
// List of lands
let lands = []
// Detect which invokes the Fruit Modal
let fruitModalType = "inventory"
// Selected fruit box
let selectedFruit = null
// Selected land box
let selectedLand = null

/**
 *  Get Fruit By Id
 */
function getFruitById(_fruitId) {
    const fruit = fruits.find((_fruit) => _fruit.id == _fruitId)
    return fruit
}

/**
 *  Handle different FruitModalType
 */
function handleFruitModalType() {
    if (fruitModalType === "inventory") {
        // Add Title
        document.getElementById("fruit-modal-header").textContent = "Inventory"
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
            "Choose a seed to plant"
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

/**
 *  Display error in FruitModal
 */
function displayFruitModalError(errorMsg = null) {
    const errorMsgElement = document.getElementById("seed-modal-error")
    errorMsgElement.textContent = errorMsg || "Please select a seed!"
}

/**
 *
 *  Create A Fruit Box
 */
function createFruitBox(_fruit) {
    // Container
    const col = document.createElement("div")
    // Add Id
    col.id = `fruit-${_fruit.id}`
    // Add Classes
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
    const fruitQuantity = document.createElement("span")
    fruitQuantity.classList.add("p-1", "m-2", "fruit-amount")
    fruitQuantity.textContent = `(${_fruit.quantity})`

    // Add event handler if users select a seed to plant
    col.addEventListener("click", () => {
        if (fruitModalType === "plant") {
            selectedFruit = _fruit
            toggleSelectSeed(col)
        }
    })

    col.appendChild(fruitImage)
    col.appendChild(fruitName)
    col.appendChild(fruitQuantity)

    return col
}

/**
 *  Create a land box
 */
function createLandBox(_land) {
    // Container
    const landContainer = document.createElement("div")
    landContainer.id = `land-${_land.id}`
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

    // Image depends on status:
    // [0] -> "soil_big.png"
    // [1] -> "land_big.png"
    if (_land.status == 1) {
        landImage.src = "./assets/images/lands/land_big.png"
        // Add fruit image
        const fruitImage = document.createElement("img")
        fruitImage.src = getFruitById(_land.fruitId).imageSrc

        // Add harvest amount
        const harvestableAmount = document.createElement("span")
        harvestableAmount.classList.add(
            "harvest_amount",
            "m-1",
            "p-1",
            "d-block"
        )
        harvestableAmount.textContent = _land.harvestableAmount

        // Add to detail container
        landDetailContainer.appendChild(fruitImage)
        landDetailContainer.appendChild(harvestableAmount)

        // Add event handler
        landContainer.addEventListener("click", () => {
            selectedLand = _land
            if (selectedLand.harvestableAmount > 0) {
                harvest(_land, landContainer)
            }
        })
    } else {
        landImage.src = "./assets/images/lands/soil_big.png"
        // Create add plant button
    const addPlantButton = createAddPlantButton(() => prepareFruitModal(_land))

        // Add to detail container
        landDetailContainer.appendChild(addPlantButton)
    }

    landContainer.appendChild(landImage)
    landContainer.appendChild(landDetailContainer)

    return landContainer
}

/**
 * Harvest a land
 */
function harvest(_land, landContainer) {
    // Re-render land with new status
    const fruit = getFruitById(_land.fruitId)
    if (fruit && fruit.quantity > 0) {
        changeToSoilUI(landContainer)
        _land.harvest(fruit)
        displayFruitModalError()
    }
}

/**
 * Plant a seed
 */
function plant() {
    // Re-render land with new status
    if (!selectedFruit) {
        toggleSeedModalError("on")
    } else {
        toggleSeedModalError("off")
        // Plant
        const newLand = selectedLand.plant(selectedFruit.id)
        // Update to array
        lands = lands.map((land) => {
            if (land.id == newLand.id) {
                land.harvestAmount = 0
                land.fruitId = newLand.id
                land.status = newLand.status
            }

            return land
        })
        // Close modal
        $("#fruitModal").modal("hide")
        // Switch to Green land
        changeToLandUI(document.getElementById(`land-${selectedLand.id}`))
    }
}

/**
 *  Switch to Land UI
 */
function changeToLandUI(element) {
    const [landImage, landDetail] = element.childNodes
    // Change to soil background
    landImage.src = "./assets/images/lands/land_big.png"

    // Add fruit image
    const fruitImage = document.createElement("img")
    fruitImage.src = getFruitById(selectedFruit.id).imageSrc

    // Add harvest amount
    const harvestableAmount = document.createElement("span")
    harvestableAmount.classList.add("harvest_amount", "m-1", "p-1", "d-block")
    harvestableAmount.textContent = selectedLand.harvestableAmount

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(fruitImage)
    landDetail.appendChild(harvestableAmount)

    // Add event handler
    // element.addEventListener("click", () => harvest(selectedLand, element))
}

/**
 *  Switch to Soil UI
 */
function changeToSoilUI(element) {
    const [landImage, landDetail] = element.childNodes
    // Change to soil background
    landImage.src = "./assets/images/lands/soil_big.png"
    // Create plant button
    const addPlantButton = createAddPlantButton(() => prepareFruitModal(selectedLand))

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(addPlantButton)

    // Add event handler
    // element.addEventListener("click", () => plant(selectedLand, element))
}

// Clear error on seed modal
function toggleSeedModalError(action = "off") {
    if (action == "on") {
        document.getElementById("seed-modal-error").classList.remove("d-none")
        document.getElementById("seed-modal-error").classList.add("d-block")
    } else {
        document.getElementById("seed-modal-error").classList.remove("d-block")
        document.getElementById("seed-modal-error").classList.add("d-none")
    }
}

/*
 *
 *  Create an add plant button
 */
function createAddPlantButton(eventHandler) {
    // Create add plant button
    const addPlantButton = document.createElement("button")
    addPlantButton.classList.add("btn", "btn-primary")
    addPlantButton.innerHTML = "+"
    addPlantButton.setAttribute("type", "button")
    addPlantButton.setAttribute("data-toggle", "modal")
    addPlantButton.setAttribute("data-target", "#fruitModal")

    addPlantButton.addEventListener("click", eventHandler)

    return addPlantButton
}

//  Prepare before display FruitModal
function prepareFruitModal(_land) {
    selectedLand = _land
    // Change FruitModal UI
    fruitModalType = "plant"
    handleFruitModalType()
}

/**
 *  Toggle style for selecting plant
 */
function toggleSelectSeed(element) {
    // Change background color
    element.classList.toggle("selected")
    // Remove "selected" class from others
    const fruitElements = document.getElementsByClassName("fruit")
    for (let i = 0; i < fruitElements.length; i++) {
        if (fruitElements[i].id != element.id) {
            fruitElements[i].classList.remove("selected")
        }
    }
}
