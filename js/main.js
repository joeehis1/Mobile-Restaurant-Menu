import { menuArray } from "./data.js";

import { RestaurantMenu } from "./config.js";


const menu = document.querySelector('.menu')

const breakdown = document.querySelector('.order-fulfillment')

const paymentArea = document.querySelector('.payment-area')

const restaurantMenu = new RestaurantMenu(menu, menuArray, breakdown, paymentArea)
restaurantMenu.init()
