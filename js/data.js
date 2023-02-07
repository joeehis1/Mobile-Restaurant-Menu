export const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: crypto.randomUUID(),
        price: 14,
        image: "/graphics/pizza.jpg"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        image: "/graphics/burger.jpg",
        id: crypto.randomUUID()
    },
    {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        image: "/graphics/beer.jpg",
        id: crypto.randomUUID()
    }
]