"use strict"

// Render UI
renderFruitModal()
renderLands()
// Start growing
startGrowingAllLand(GROW_INCREMENT, SECONDS_TO_GROW)

// Switch FruitModalType to "inventory"
document.getElementById("inventory").addEventListener("click", () => {
    fruitModalType = "inventory"
    handleFruitModalType()
})

// Plant event handler
document.getElementById("plant-seed-button").addEventListener("click", () => {
    plant()
})

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
                const _landUI = createLandBox(lands[currentLandIndex])
                row.appendChild(_landUI)
                currentLandIndex++
            }
            landGroups[k].appendChild(row)
        }
    }
}
