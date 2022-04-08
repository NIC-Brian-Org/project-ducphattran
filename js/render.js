"use strict"

// Render UI
renderFruitModal()
renderMarketModal()
renderLands()
// Start growing
startGrowingAllLand(GROW_INCREMENT, SECONDS_TO_GROW * 1000)

// Open Inventory modal
document.getElementById("inventory").addEventListener("click", () => {
    prepareFruitModal(fruitModalTypes.INVENTORY)
})

// Open add plant modal
document.getElementById("plant-seed-button").addEventListener("click", () => {
    prepareFruitModal(fruitModalTypes.PLANT)
    plantListener() // Trigger "Plant" button event
})

// Sell all  fruits in the market
document
    .getElementById("sell-all-button")
    .addEventListener("click", sellAllFruitsListener)

/**
 *
 *  Render Fruit Modal
 */
function renderFruitModal() {
    const fruitBoxes = []
    for (let i = 0; i < fruits.length; i++) {
        const fruitBox = createFruitBox(fruits[i])
        fruitBoxes.push(fruitBox)
    }

    // Render Fruits for Fruit Modal
    const fruitContainer = document.getElementById("fruit-container")
    // Reset if updated
    fruitContainer.innerHTML = ""

    // Create 2 rows
    const row1 = document.createElement("row")
    row1.classList.add("row")
    const row2 = document.createElement("row")
    row2.classList.add("row")

    // Add 5 column to each row
    fruitBoxes.forEach((col, index) => {
        if (index < 5) {
            row1.appendChild(col)
        } else {
            row2.appendChild(col)
        }
    })

    fruitContainer.appendChild(row1)
    fruitContainer.appendChild(row2)
}

/**
 *
 *  Render Market Modal
 */
function renderMarketModal() {
    // Reset market's total value
    totalMarketValue = 0
    const fruitLines = []

    for (let i = 0; i < fruits.length; i++) {
        const fruitLine = createFruitLine(fruits[i])
        fruitLines.push(fruitLine)
    }

    // Render Fruits for Fruit Modal
    const marketContainer = document.getElementById("market-container")
    // Reset if updated
    marketContainer.innerHTML = ""

    // Add rows to the modal
    fruitLines.forEach((row) => {
        marketContainer.appendChild(row)
    })

    // Update total value
    updateMarketTotalValue(totalMarketValue)

    // Enable button
    if (totalMarketValue > 0) {
        toggleSellAllButton("on")
    } else {
        // Disable button
        toggleSellAllButton("off")
    }
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
            // Add 3 columns to each row
            for (let j = 0; j < 3; j++) {
                const _landUI = createLandBox(lands[currentLandIndex])
                row.appendChild(_landUI)
                currentLandIndex++
            }
            landGroups[k].appendChild(row)
        }
    }
}
