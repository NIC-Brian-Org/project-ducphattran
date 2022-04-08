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
// Interval for automatic growth
let growInterval = null
// Seconds to increase harvestable amount of lands
const SECONDS_TO_GROW = 2
// Amount to increase harvestable amount
const GROW_INCREMENT = 1

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
 *
 *  Create A Fruit Rectangle
 */
function createFruitLine(_fruit) {
    // Container
    const row = document.createElement("row")
    row.classList.add(
        "row",
        "m-1",
        "justify-content-center",
        "align-items-center",
        "rounded",
        "sell"
    )
    row.id = `market-fruit-${_fruit.id}`

    // Image and Image
    const nameAndImage = document.createElement("div")
    nameAndImage.classList = "col-md  m-2 p-1"
    // Image
    const fruitImage = document.createElement("img")
    fruitImage.classList.add("m-1", "p-1")
    fruitImage.src = _fruit.imageSrc
    // Name
    const fruitName = document.createElement("span")
    fruitName.classList.add("p-1")
    fruitName.textContent = _fruit.name

    nameAndImage.appendChild(fruitImage)
    nameAndImage.appendChild(fruitName)

    // Price
    const priceWrapper = document.createElement("div")
    priceWrapper.className = "col-md text-center"
    const priceContainer = document.createElement("p")
    priceContainer.className = "text-white  bg-info p-2 rounded d-inline"
    createPriceInfo(_fruit.price, priceContainer)

    priceWrapper.appendChild(priceContainer)

    //  Input group
    const inputContainer = document.createElement("div")
    inputContainer.className = "col-md d-flex flex-row"
    // Input
    const inputElement = document.createElement("input")
    inputElement.className = "text-center"
    inputElement.type = "number"
    inputElement.min  = 0 
    inputElement.value  = 0 
    // Available amount to sell
    const availableAmountElement = document.createElement("p")
    availableAmountElement.className = "p-1 m-1"
    availableAmountElement.innerHTML= `/<span class="mx-1">(${_fruit.quantity})</span>`
    // Sell button
    const sellButtonElement = document.createElement("button")
    sellButtonElement.className = "btn btn-warning"
    sellButtonElement.type = "button"
    sellButtonElement.textContent = "Sell"

    inputContainer.appendChild(inputElement)
    inputContainer.appendChild(availableAmountElement)
    inputContainer.appendChild(sellButtonElement)
    

    row.appendChild(nameAndImage)
    row.appendChild(priceWrapper)
    row.appendChild(inputContainer)

    return row
}
/* <span class="mr-2">6</span><i
                                        class="fa-solid fa-sack-dollar"></i></p>
                                         */
function createPriceInfo(_price, htmlContainer) {
    const price = document.createElement("span")
    price.className="mx-2"
    price.textContent = _price
    const dollarIcon = document.createElement("i")
    dollarIcon.className = "fa-solid fa-sack-dollar"
    htmlContainer.appendChild(price)
    htmlContainer.appendChild(dollarIcon)
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
        // Add class "planted"
        landContainer.classList.add("planted")
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

            if (
                selectedLand.status === 1 &&
                selectedLand.harvestableAmount > 0
            ) {
                harvest(_land, landContainer)
            }
        })
    } else {
        landImage.src = "./assets/images/lands/soil_big.png"
        // Create add plant button
        const addPlantButton = createAddPlantButton()

        // Add event handler for soil box
        landContainer.setAttribute("data-toggle", "modal")
        landContainer.setAttribute("data-target", "#fruitModal")
        landContainer.addEventListener("click", () => {
            selectedLand = _land
            prepareFruitModal()
        })

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
    if (fruit) {
        // Increase quantity
        fruit.quantity += parseInt(_land.harvestableAmount)
        // Update fruits array
        fruits = fruits.map((fr) => {
            if (fr.id === fruit.id) {
                fr.quantity = fruit.quantity
            }

            return fr
        })
        // Re-render fruits
        renderFruitModal()
        // Update land
        _land.harvest(fruit)
        // Update UI
        changeToSoilUI(landContainer)
        // Reset growth
        startGrowingAllLand(GROW_INCREMENT, SECONDS_TO_GROW * 1000)
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
        selectedLand.plant(selectedFruit.id)

        // Update lands array
        lands = lands.map((land) => {
            if (land.id == selectedLand.id) {
                land.harvestableAmount = 0
                land.fruitId = selectedLand.fruitId
                land.status = selectedLand.status
            }

            return land
        })
        // Close modal
        $("#fruitModal").modal("hide")
        // Switch to Green land
        changeToLandUI(document.getElementById(`land-${selectedLand.id}`))
        // Reset growth
        startGrowingAllLand(GROW_INCREMENT, SECONDS_TO_GROW * 1000)
    }
}

/**
 *  Switch to Land UI
 */
function changeToLandUI(element) {
    element.classList.add("planted")
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
    element.addEventListener("click", () => {
        element.removeAttribute("data-toggle")
        element.removeAttribute("data-target")
        if (selectedLand.status === 1 && selectedLand.harvestableAmount > 0) {
            harvest(selectedLand, element)
        }
    })
}

/**
 *  Switch to Soil UI
 */
function changeToSoilUI(element) {
    element.classList.remove("planted")
    const [landImage, landDetail] = element.childNodes
    // Change to soil background
    landImage.src = "./assets/images/lands/soil_big.png"
    // Create plant button
    const addPlantButton = createAddPlantButton()

    // Add event handler for soil box
    element.addEventListener("click", () => {
        element.setAttribute("data-toggle", "modal")
        element.setAttribute("data-target", "#fruitModal")
        prepareFruitModal()
    })

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(addPlantButton)
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
function createAddPlantButton() {
    // Create add plant button
    const addPlantButton = document.createElement("button")
    addPlantButton.classList.add("btn", "btn-primary")
    addPlantButton.innerHTML = "+"
    addPlantButton.setAttribute("type", "button")

    return addPlantButton
}

//  Prepare before display FruitModal
function prepareFruitModal() {
    // Change FruitModal UI
    fruitModalType = "plant"
    handleFruitModalType()
}

/**
 *  Toggle style for selecting plant
 */
function toggleSelectSeed(element) {
    // Check if the box is toggled
    if (element.classList.contains("selected")) {
        selectedFruit = null
    }
    // Change background color
    element.classList.toggle("selected")
    // Remove "selected" class from others
    const fruitElements = document.getElementsByClassName("fruit")
    for (let i = 0; i < fruitElements.length; i++) {
        // Remove class "selected" from the others
        if (fruitElements[i].id != element.id) {
            fruitElements[i].classList.remove("selected")
        }
    }
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
                updateHarvestableAmountUI(landElement, land.harvestableAmount)
            }
        })
    }, delayTime)
}

/**
 *  Update UI of harvestable amount
 */
function updateHarvestableAmountUI(_landElement, _newAmount) {
    let harvestableAmount = document.querySelector(
        `#${_landElement.id} span.harvest_amount`
    )
    harvestableAmount.textContent = _newAmount
}
