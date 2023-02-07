export class RestaurantMenu {
    constructor(menu, data, breakdownSection, paymentSection) {
        this.menu = menu
        this.data = data
        this.paymentSection = paymentSection
        this.orders = []
        this.breakdownSection = breakdownSection
        this.menu.addEventListener('click', (e) => {
            if (e.target.dataset.addItem) {
                this.menuId = e.target.dataset.addItem
                this.createOrder()
            }
        })

    }



    renderBreakdown = () => {
        this.breakdown = new Breakdown(this.breakdownSection, this.orders)
        this.breakdown.displayBreakdown()
        this.breakdown.breakdownDisplay.addEventListener('click', (e) => {

            if (e.target.dataset.remove) {

                this.orderId = e.target.dataset.remove
                this.updateBreakdown()
            } else if (e.target.id === 'show-form') {
                this.payment = new Payment(this.paymentSection)
                this.payment.init()
                this.payment.paymentSectionForm.addEventListener('submit', this.completeOrder)
            }
        })
    }

    completeOrder = (e) => {
        e.preventDefault()
        this.payment.paymentSection.classList.remove('show')
        this.orders = []
        this.breakdown.breakdownDisplay.innerHTML = `
            <p class="completed-message">
                Thanks ${this.payment.customerData.name}, Your Order is on its way
            </p>
        `
        setTimeout(() => {
            this.breakdown.breakdownDisplay.innerHTML = ''
        }, 3000)
    }

    updateBreakdown = () => {

        this.updatedOrder = this.orders.filter((order) => {
            return order.id !== this.orderId
        })
        this.orders = this.updatedOrder
        this.renderBreakdown()

    }

    createOrder = () => {

        this.menuItem = this.data.find((item) => {
            return item.id === this.menuId
        })

        const existingItem = this.orders.find((item) => {
            return item.id === this.menuItem.id
        })

        if (existingItem) {
            existingItem.quantity++
        } else {
            this.orders.push({ ...this.menuItem, quantity: 1 })
        }

        this.renderBreakdown()

    }



    returnRendereditems = () => {
        this.renderedMenuItems = this.data.map((item) => {

            const ingredients = item.ingredients.map((ingredient) => {
                return `
                    <li>${ingredient}</li>
                `
            }).join('')

            return `
                <div class="order">
                    <img
                        class="icon-img"
                        src="${item.image}"
                        alt=""
                    />
                    <h2>${item.name}</h2>
                    <ul class="ingredients">
                        ${ingredients}
                    </ul>
                    <p class="price">$${item.price}</p>
                    <div class="icon" >
                        <img data-add-item = "${item.id}" src="./icon/plus-circle.svg" alt="">
                    </div>
                </div>
            `
        }).join('')
    }

    init() {
        this.returnRendereditems()
        this.menu.innerHTML = this.renderedMenuItems
    }
}


class Breakdown {
    constructor(breakdownDisplay, data) {
        this.breakdownDisplay = breakdownDisplay
        this.data = data
    }

    returnRenderedSelectedMenuItems = () => {

        if (this.data.length === 0) {
            this.renderedMenuItems = ''
            return
        }

        this.total = this.data.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)

        this.renderedMenuItems = this.data.map((item) => {
            return `
                <div class="order-row">
                    <span class="descriptor">${item.name}</span>
                    <button data-remove="${item.id}" class="btn btn-remove">remove</button>
                    <span class="price">${item.quantity} X ${item.price}</span>
                </div>
            `
        }).join('')

        return `
            <h2>Your Order</h2>
            ${this.renderedMenuItems}
            <div class="order-row total-row">
                <span class="descriptor">Total Price:</span>
                <span class="price">$${this.total}</span>
            </div>
            <button id="show-form" class="btn btn-lrg" type="submit">
                Complete order
            </button>
        `
    }

    displayBreakdown = () => {

        this.breakdownDisplay.innerHTML = this.returnRenderedSelectedMenuItems() ?? ''
    }
}



class Payment {
    constructor(paymentSection) {
        this.paymentSection = paymentSection


    }
    init = () => {
        this.paymentSection.innerHTML = this.renderForm()
        this.paymentSection.classList.add('show')
        this.paymentSectionForm = this.paymentSection.querySelector('.payment-details')

    }

    get customerData() {
        this.formData = new FormData(this.paymentSectionForm)
        let obj = {}
        for (let [k, v] of this.formData) {
            obj[k] = v
        }
        return obj
    }

    renderForm = () => {
        return `
            <div class="modal">
                        <h2>Enter Card details</h2>
                        <form class="payment-details" action="">
                            <input
                                type="text"
                                aria-label="Enter your name"
                                placeholder="Enter your name"
                                required
                                name="name"
                                id="name"
                            />
                            <input
                                type="text"
                                aria-label="Enter card number"
                                placeholder="Enter card number"
                                required
                                name="card-number"
                                id="card-number"
                            />
                            <input
                                type="text"
                                aria-label="Enter CVV"
                                placeholder="Enter CVV"
                                required
                                name="cvv"
                                id="cvv"
                            />
                            <button class="btn btn-lrg" type="submit">
                                Pay
                            </button>
                        </form>
                    </div>
        `
    }



}