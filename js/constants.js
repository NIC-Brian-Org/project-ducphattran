// Strings
const INVENTORY_TITLE = "Inventory"
const PLAN_SEED_TITLE = "Choose a seed to plant"

// Types to detect which style to display for the #fruitModal
const fruitModalTypes = Object.freeze({
    INVENTORY: "inventory",
    PLANT: "plant",
})

// Seconds to increase harvestable amount of lands
const SECONDS_TO_GROW = 2
// Amount to increase harvestable amount
const GROW_INCREMENT = 1

// List of fruits
let fruits = []
// List of lands
let lands = []
// Set default fruit modal for inventory
let currentFruitModalType = fruitModalTypes.INVENTORY
// Selected fruit box
let selectedFruit = null
// Selected land box
let selectedLand = null
// Interval for automatic growth
let growInterval = null
