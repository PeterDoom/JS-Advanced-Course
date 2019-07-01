//class for creating a restaurant kitchen, where you can set up the budget, then add products, add items to the menu and you can order from the menu + showing the menu.

class Kitchen {
    constructor(budget) {
        this.budget = budget
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(array) {
        for (let item of array) {
            let [product, quantity, price] = item.split(" ");

            if (this.budget > +price) {

                if (this.productsInStock.hasOwnProperty(product)) {
                    this.productsInStock[product] += +quantity;
                } else {
                    this.productsInStock[product] = +quantity;
                }

                this.actionsHistory.push(`Successfully loaded ${quantity} ${product}`)
                this.budget -= price;

            } else {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${product}`)
            }
        }

        return this.actionsHistory.join("\n");
    }

    addToMenu(meal, ingredientsArray, price) {

        if (this.menu.hasOwnProperty(meal)) {
            return (`The ${meal} is already in our menu, try something different.`);
        } else {
            this.menu[meal] = {
                ingredients: ingredientsArray,
                price: +price,
            }

            let lengthOfMenu = Object.keys(this.menu).length
            return (`Great idea! Now with the ${meal} we have ${lengthOfMenu} meals in the menu, other ideas?`)

        }
    }

    showTheMenu() {

        let result = [];
        if (Object.keys(this.menu).length > 0) {
            for (let meal in this.menu) {
                result.push(`${meal} - $${this.menu[meal]["price"]}`)
            }

            return result.join("\n")
        } else {
            return `Our menu is not ready yet, please come later...`
        }
    }


    makeTheOrder(meal = "meal") {

        if (!this.menu.hasOwnProperty(meal)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }

        let productsArray = this.menu[meal]["ingredients"]

        for (let item of productsArray) {
            let productName = item.split(" ")[0];
            if (!this.productsInStock.hasOwnProperty(productName)) {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
            }
        }

        for (let item of productsArray) {
            let [product, qty] = item.split(" ");
            if (this.productsInStock[product] > 0)
                this.productsInStock[product] -= +qty
            else {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
            }
        }

        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal]["price"]}.`
    }

}


let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder("Pizza"));
console.log(kitchen.makeTheOrder("frozenYogurt"));
console.log(kitchen.makeTheOrder("Pasta"));