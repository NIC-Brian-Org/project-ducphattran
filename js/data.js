"use strict";
const mockupLands = [
    // Group 1
    {id: "1", status:  0, fruitId: "1", harvestAmount: 0},
    {id: "2", status:  1, fruitId: "2", harvestAmount: 6},
    {id: "3", status:  0, fruitId: "3", harvestAmount: 0},
    {id: "4", status:  1, fruitId: "4", harvestAmount: 21},
    {id: "5", status:  1, fruitId: "5", harvestAmount: 15},
    {id: "6", status:  0, fruitId: "6", harvestAmount: 0},
    {id: "7", status:  1, fruitId: "7", harvestAmount: 22},
    {id: "8", status:  0, fruitId: "8", harvestAmount: 0},
    {id: "9", status:  1, fruitId: "9", harvestAmount: 41},
    // Group 2
    {id: "10", status:  0, fruitId: "1", harvestAmount: 0},
    {id: "11", status:  0, fruitId: "1", harvestAmount: 0},
    {id: "12", status:  1, fruitId: "2", harvestAmount: 31},
    {id: "13", status:  0, fruitId: "3", harvestAmount: 0},
    {id: "14", status:  1, fruitId: "4", harvestAmount: 30},
    {id: "15", status:  1, fruitId: "5", harvestAmount: 22},
    {id: "16", status:  0, fruitId: "6", harvestAmount: 0},
    {id: "17", status:  1, fruitId: "7", harvestAmount: 16},
    {id: "18", status:  0, fruitId: "8", harvestAmount: 0},
    // Group 3
    {id: "19", status:  1, fruitId: "9", harvestAmount: 37},
    {id: "20", status:  0, fruitId: "1", harvestAmount: 0},
    {id: "21", status:  1, fruitId: "2", harvestAmount: 41},
    {id: "22", status:  0, fruitId: "3", harvestAmount: 0},
    {id: "23", status:  1, fruitId: "4", harvestAmount: 27},
    {id: "24", status:  1, fruitId: "5", harvestAmount: 48},
    {id: "25", status:  0, fruitId: "6", harvestAmount: 0},
    {id: "26", status:  1, fruitId: "7", harvestAmount: 28},
    {id: "27", status:  0, fruitId: "8", harvestAmount: 0},
]

const mockupFruits = [
    {id: "1", name:  "Apple", price: "6", quantity: 28, imageSrc: "./assets/images/fruits-hl/Apple_HL.png"},
    {id: "2", name:  "Cherry", price: "6", quantity: 32, imageSrc: "./assets/images/fruits-hl/Cherry_HL.png"},
    {id: "3", name:  "Coconut", price: "6", quantity: 13, imageSrc: "./assets/images/fruits-hl/Coconut_HL.png"},
    {id: "4", name:  "Green Grape", price: "6", quantity: 40, imageSrc: "./assets/images/fruits-hl/Green_grape_HL.png"},
    {id: "5", name:  "Lemon", price: "6", quantity: 55, imageSrc: "./assets/images/fruits-hl/Lemon_HL.png"},
    {id: "6", name:  "Mango", price: "6", quantity: 13, imageSrc: "./assets/images/fruits-hl/Mango_HL.png"},
    {id: "7", name:  "Orange", price: "6", quantity: 24, imageSrc: "./assets/images/fruits-hl/Orange_HL.png"},
    {id: "8", name:  "Purple Grape", price: "6", quantity: 36, imageSrc: "./assets/images/fruits-hl/Purple_grape_HL.png"},
    {id: "9", name:  "Red Grape", price: "6", quantity: 66, imageSrc: "./assets/images/fruits-hl/Red_grape_HL.png"},
    {id: "10", name:  "Strawberry", price: "6", quantity: 17, imageSrc: "./assets/images/fruits-hl/Strawberry_HL.png"},
]
