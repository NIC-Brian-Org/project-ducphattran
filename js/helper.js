"use strict"
/**
 *  This file contains functions for rendering and handling logic
 */

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
 * Toggle class to all fruit boxes
 * @param {string} _baseClassName
 * @param {string} _className
 */
function addClassToAllElements(_baseClassName, _className) {
    const elements = document.getElementsByClassName(_baseClassName)
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(_className)
    }
}

/**
 * Toggle class to all fruit boxes
 * @param {string} _baseClassName
 * @param {string} _className
 */
function removeClassToAllElements(_baseClassName, _className) {
    const elements = document.getElementsByClassName(_baseClassName)
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(_className)
    }
}

/**
 *  Handle different FruitModalType
 */
function handleFruitModalType() {
    if (currentFruitModalType === fruitModalTypes.INVENTORY) {
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

/**
 *  Toggle style for selecting plant
 */
/**
 *
 * @param {HTMLElement} fruitBox
 */
function toggleSelectSeed(fruitBox) {
    // Check if the box is toggled
    if (fruitBox.classList.contains("selected")) {
        selectedFruit = null
    }
    // Change background color
    fruitBox.classList.toggle("selected")
    // Remove "selected" class from others
    const fruitElements = document.getElementsByClassName("fruit")
    for (let i = 0; i < fruitElements.length; i++) {
        // Remove class "selected" from the others
        if (fruitElements[i].id != fruitBox.id) {
            fruitElements[i].classList.remove("selected")
        }
    }
}

/**
 * Prepare before display FruitModal
 * @param {string} _fruitModalType
 */
function prepareFruitModal(_fruitModalType) {
    if (_fruitModalType === fruitModalTypes.INVENTORY) {
        // Change to Inventory
        currentFruitModalType = fruitModalTypes.INVENTORY
    } else if (_fruitModalType === fruitModalTypes.PLANT) {
        // Change to Plant
        currentFruitModalType = fruitModalTypes.PLANT
    }

    handleFruitModalType()
}

/**
 * Create a fruit image
 * @param {string} _altName
 * @param {string} _imageSrc
 * @returns HTMLElement
 */
function createFruitImage(_altName, _imageSrc) {
    const fruitImage = document.createElement("img")
    fruitImage.classList.className = "m- 1p-1"
    fruitImage.src = _imageSrc
    fruitImage.alt = _altName

    return fruitImage
}

/**
 * Create a fruit name
 * @param {string} _name
 * @returns HTMLElement
 */
function createFruitName(_name) {
    const fruitName = document.createElement("span")
    fruitName.classList.add("p-1")
    fruitName.textContent = _name

    return fruitName
}

/**
 * Create a fruit quantity
 * @param {int} _quantity
 * @returns HTMLElement
 */
function createFruitQuantity(_quantity) {
    const fruitQuantity = document.createElement("span")
    fruitQuantity.className = "p-1 m-2 fruit-amount"
    fruitQuantity.textContent = `(${_quantity})`

    return fruitQuantity
}

/**
 * Create A Fruit Box
 * @param {Fruit} _fruit
 * @returns HTMLElement
 */
function createFruitBox(_fruit) {
    // Container
    const fruitColumn = document.createElement("div")
    // Add Id
    fruitColumn.id = `fruit-${_fruit.id}`
    // Add Classes
    fruitColumn.classList.add(
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
    const fruitImage = createFruitImage(_fruit.name, _fruit.imageSrc)
    //  Name
    const fruitName = createFruitName(_fruit.name)
    //  Quantity
    const fruitQuantity = createFruitQuantity(_fruit.quantity)

    // Add event handler if users select a seed to plant
    fruitColumn.addEventListener("click", () => {
        if (currentFruitModalType === fruitModalTypes.PLANT) {
            selectedFruit = _fruit
            toggleSelectSeed(fruitColumn)
        }
    })

    fruitColumn.appendChild(fruitImage)
    fruitColumn.appendChild(fruitName)
    fruitColumn.appendChild(fruitQuantity)

    return fruitColumn
}

/**
 * Create a landImage
 * @param {string} _src
 * @returns HTMLElement
 */
function createLandImage(_src) {
    const landImage = document.createElement("img")
    landImage.width = 100
    landImage.src = _src

    return landImage
}

/**
 *
 * Create a harvestable amount
 * @param {int} _harvestableAmount
 * @returns HTMLElement
 */
function createHarvestableAmount(_harvestableAmount) {
    const harvestableAmount = document.createElement("span")
    harvestableAmount.className = "harvest_amount m-1 p-1 d-block"
    harvestableAmount.textContent = _harvestableAmount

    return harvestableAmount
}

/**
 *  Create an add plant button
 *  @returns HTMLElement
 */
function createAddPlantButton() {
    // Create add plant button
    const addPlantButton = document.createElement("button")
    addPlantButton.className = "btn btn-primary"
    addPlantButton.innerHTML = "+"
    addPlantButton.setAttribute("type", "button")

    return addPlantButton
}

/**
 * Create a land box
 * @param {Land} _land
 * @returns HTMLElement
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
    let landImage = createLandImage("")

    //  Land detail
    const detailContainer = document.createElement("div")
    detailContainer.classList.add("land-detail")

    // Image depends on status:
    // [0] -> "soil_big.png"
    // [1] -> "land_big.png"
    if (_land.status == 1) {
        // Add class "planted"
        landContainer.classList.add("planted")
        landImage = createLandImage("./assets/images/lands/land_big.png")
        // Add fruit image
        const fruitImage = document.createElement("img")
        fruitImage.src = getFruitById(_land.fruitId).imageSrc

        // Add harvest amount
        const harvestableAmount = createHarvestableAmount(
            _land.harvestableAmount
        )

        // Add to detail container
        detailContainer.appendChild(fruitImage)
        detailContainer.appendChild(harvestableAmount)

        // Add event handler
        landContainer.addEventListener("click", () => {
            selectedLand = _land

            if (
                selectedLand.status === 1 &&
                selectedLand.harvestableAmount > 0
            ) {
                harvestListener(_land, landContainer)
            }
        })
    } else {
        landImage = createLandImage("./assets/images/lands/soil_big.png")
        // Create add plant button
        const addPlantButton = createAddPlantButton()

        // Add event handler for soil box
        landContainer.setAttribute("data-toggle", "modal")
        landContainer.setAttribute("data-target", "#fruitModal")
        landContainer.addEventListener("click", () => {
            selectedLand = _land
            prepareFruitModal(fruitModalTypes.PLANT)
        })

        // Add to detail container
        detailContainer.appendChild(addPlantButton)
    }

    landContainer.appendChild(landImage)
    landContainer.appendChild(detailContainer)

    return landContainer
}

/**
 * Change to Land Box
 * @param {HTMLElement} element
 */
function changeToLandBox(element) {
    element.classList.add("planted")
    const [landImage, landDetail] = element.childNodes

    // Change to soil background
    landImage.src = "./assets/images/lands/land_big.png"

    // Add fruit image
    const fruitImage = createFruitImage(
        selectedFruit.name,
        selectedFruit.imageSrc
    )
    // Add harvest amount
    const harvestableAmount = createHarvestableAmount(
        selectedLand.harvestableAmount
    )

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(fruitImage)
    landDetail.appendChild(harvestableAmount)

    // Add event handler
    element.addEventListener("click", () => {
        element.removeAttribute("data-toggle")
        element.removeAttribute("data-target")
        if (selectedLand.status === 1 && selectedLand.harvestableAmount > 0) {
            harvestListener(selectedLand, element)
        }
    })
}

/**
 * Change to Fruit Box
 * @param {HTMLElement} element
 */
function changeToSoilBox(element) {
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
        prepareFruitModal(fruitModalTypes.PLANT)
    })

    // Add to detail container
    landDetail.innerHTML = ""
    landDetail.appendChild(addPlantButton)
}

/**
 * Update quantity in Inventory and change to a Soil box
 * @param {Land} _land
 * @param {HTMLElement} landContainer
 */
function harvestListener(_land, landContainer) {
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
        // Update land
        _land.harvest(fruit)
        // Update to local storage
        storeToLocalStorage(storageName.FRUIT, fruits)
        storeToLocalStorage(storageName.LAND, lands)

        // Re-render modals that use fruit boxes
        renderFruitModal()
        renderMarketModal()
        // Update UI
        changeToSoilBox(landContainer)
        // Reset growth
        startGrowingAllLand(GROW_INCREMENT, SECONDS_TO_GROW * 1000)
    }
}

/**
 * Change to LandBox and start growing
 */
function plantListener() {
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

        // Update to local storage
        storeToLocalStorage(storageName.LAND, lands)

        // Close modal
        $("#fruitModal").modal("hide")
        // Switch to Green land
        changeToLandBox(document.getElementById(`land-${selectedLand.id}`))
        // Reset growth
        startGrowingAllLand(GROW_INCREMENT, SECONDS_TO_GROW * 1000)
    }
}

/**
 * Update UI of harvestable amount
 * @param {Land} _land
 */
function updateHarvestableAmount(_land) {
    let harvestableAmount = document.querySelector(
        `#land-${_land.id} span.harvest_amount`
    )
    harvestableAmount.textContent = _land.harvestableAmount
}

/**
 *
 * @param {int} _price
 * @param {HTMLElement} htmlContainer
 */
function attachPriceAndDollarIcon(_price, htmlContainer) {
    // Price text
    const price = document.createElement("span")
    price.className = "mx-2"
    price.textContent = _price
    // Dollar icon
    const dollarIcon = document.createElement("i")
    dollarIcon.className = "fa-solid fa-sack-dollar"
    htmlContainer.appendChild(price)
    htmlContainer.appendChild(dollarIcon)
}

/**
 * Update UI for the Market's total value
 * @param {int} _totalValue
 */
function updateMarketTotalValue(_totalValue) {
    document.getElementById("total-value").textContent = _totalValue
}

/**
 * Create A Fruit Rectangle
 * @param {Fruit} _fruit
 * @returns HTMLElement
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

    // Update market total value
    totalMarketValue += _fruit.price * _fruit.quantity

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
    attachPriceAndDollarIcon(_fruit.price, priceContainer)

    priceWrapper.appendChild(priceContainer)

    //  Input group
    const inputContainer = document.createElement("div")
    inputContainer.className = "col-md d-flex flex-row"
    // Input
    const inputElement = document.createElement("input")
    inputElement.id = `market-fruit-${_fruit.id}-input`
    inputElement.className = "text-center"
    inputElement.type = "number"
    inputElement.min = 0
    inputElement.value = 0

    // Available amount to sell
    const availableAmountElement = document.createElement("p")
    availableAmountElement.className = "p-1 m-1"
    availableAmountElement.innerHTML = `/<span class="mx-1">(${_fruit.quantity})</span>`
    // Sell button
    const sellButtonElement = document.createElement("button")
    sellButtonElement.id = `market-fruit-${_fruit.id}-sell-btn`
    sellButtonElement.className = "btn btn-warning"
    sellButtonElement.type = "button"
    sellButtonElement.textContent = "Sell"
    sellButtonElement.addEventListener("click", () => {
        sellFruit(_fruit)
    })

    inputContainer.appendChild(inputElement)
    inputContainer.appendChild(availableAmountElement)
    inputContainer.appendChild(sellButtonElement)

    row.appendChild(nameAndImage)
    row.appendChild(priceWrapper)
    row.appendChild(inputContainer)

    return row
}

/**
 * Update totalMoney and UI
 * @param {int} _money
 */
function updateTotalMoney(_money) {
    // Update global variable
    totalMoney = _money
    // Update local storage
    storeToLocalStorage(storageName.MONEY, totalMoney)
    // Update HTMLElement
    document.getElementById("money").textContent = _money
}

/**
 *  Toggle success prompt when users sell fruits
 */
function showSellPrompt(promptType, message) {
    const promptElement = document.getElementById("sell-success")
    promptElement.textContent = message
    promptElement.classList.toggle("d-none")
    if (promptType === "success") {
        promptElement.classList.remove("alert-danger")
        promptElement.classList.add("alert-success")
        // Fade
        setTimeout(() => {
            promptElement.classList.toggle("d-none")
        }, 700)
    } else if (promptType === "error") {
        document
            .getElementById("sell-success")
            .classList.remove("alert-success")
        promptElement.classList.add("alert-danger")
        // Fade
        setTimeout(() => {
            promptElement.classList.toggle("d-none")
        }, 700)
    }
}

/**
 *
 * Sell a fruit
 * @param {Fruit} _fruit
 */
function sellFruit(_fruit) {
    const sellAmount = parseInt(
        document.getElementById(`market-fruit-${_fruit.id}-input`).value
    )
    if (sellAmount > 0 && sellAmount <= _fruit.quantity) {
        // Update fruit's quantity
        fruits.map((fruit) => {
            if (fruit.id === _fruit.id) {
                fruit.quantity -= sellAmount
            }

            return fruit
        })

        // Update to local storage
        storeToLocalStorage(storageName.FRUIT, fruits)

        // Re-render modals that use fruit boxes
        renderMarketModal()
        renderFruitModal()

        // Update money
        updateTotalMoney(totalMoney + _fruit.price * sellAmount)

        // Show prompt
        showSellPrompt("success", "Success!")
    } else {
        // Display error
        showSellPrompt("error", "No quantity!")
    }
}

/**
 * Disable/Enable sell all button
 * @param {string} status
 */
function toggleSellAllButton(status) {
    const sellAllButton = document.getElementById("sell-all-button")
    if (status === "on") {
        sellAllButton.classList.add("btn-primary")
        sellAllButton.classList.remove("btn-secondary")
        sellAllButton.disable = false
    } else {
        sellAllButton.classList.remove("btn-primary")
        sellAllButton.classList.add("btn-secondary")
        sellAllButton.disable = true
    }
}

/**
 *  Sell all the fruits in the inventory
 */
function sellAllFruitsListener() {
    if (totalMarketValue > 0) {
        fruits = fruits.map((fruit) => {
            fruit.quantity = 0
            return fruit
        })

        // Update money
        updateTotalMoney(totalMoney + totalMarketValue)

        // Update to local storage
        storeToLocalStorage(storageName.FRUIT, fruits)

        // Re-render modals that use fruit boxes
        renderMarketModal()
        renderFruitModal()
        
        // Disable button
        toggleSellAllButton("off")

        // Show prompt
        showSellPrompt("success", "Success!")
    }
}

/**
 * Toggle error message on seed modal
 * @param {string} action
 */
function toggleSeedModalError(action = "off") {
    if (action == "on") {
        document.getElementById("seed-modal-error").classList.remove("d-none")
        document.getElementById("seed-modal-error").classList.add("d-block")
    } else {
        document.getElementById("seed-modal-error").classList.remove("d-block")
        document.getElementById("seed-modal-error").classList.add("d-none")
    }
}
