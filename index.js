import { menuArray } from './data.js'



const menuItems = document.getElementById('menu-items')
const receipt = document.getElementById('receipt')
const addedItems = document.getElementById('added-items')
const calculatedPrice = document.getElementById('calculated-price')
const completeOrderBtn = document.getElementById('complete-order-btn')

document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        handlClickAddButton(e.target.dataset.add)
    }
    
})

let basketArr = []
let basketId = ''

function handlClickAddButton(id) {
    receipt.classList.remove('receipt')

    const targetObj = menuArray.filter(function(item){
                return item.id == id
            })[0]
            
            let targetObjItemDetails = {}
            
            
            
            basketArr.push({
                "name": targetObj.name,
                "price": targetObj.price,
                "id": targetObj.id,
                "basketId": basketId++
            })

            updateOrderDisplay()
            document.querySelector('.submit-btn').style.display = 'none'
}

function updateOrderDisplay() {

    addedItems.innerHTML = ""
    basketArr.forEach(function(item){
        addedItems.innerHTML +=  `
            <div class="added-item">
                <h1 class="added-item-name">${item.name}</h1>
                <button id="remove-btn" class="remove-btn" data-basket-id=${item.basketId}>remove</button>
                <h1 class="added-item-price">$${item.price}</h1>
            </div>
        `
    })

    calculatedPrice.innerHTML = `$${basketArr.reduce(function(firstNumber, currentNumber) {
        return firstNumber + currentNumber.price
    }, 0)}`
}

document.addEventListener('click', function(e) {
    
    if(e.target.classList.contains('remove-btn')) {
        const basketIdToRemove = parseInt(e.target.dataset.basketId);
        removeFromBasket(basketIdToRemove);
    }
  
})

function removeFromBasket(basketIdToRemove) {
    basketArr = basketArr.filter(item => item.basketId !== basketIdToRemove);
    updateOrderDisplay();
}

function renderMenuItems() {
    const listedMenuItems = menuArray.map(function(menuItem){
        return `
            <div class="item-box">  
                <span class="item-photo">${menuItem.emoji}</span>
                <div>
                    <h1>${menuItem.name}<h1>
                    <p>${menuItem.ingredients}</p>
                    <span class="item-price" id="${menuItem.id}">$${menuItem.price}<span>
                </div>
                <button id="add-item" data-add="${menuItem.id}">
                    <i class="fa-solid fa-plus" data-add="${menuItem.id}"></i>
                </button>
            </div>
        `
    }).join('')
    return menuItems.innerHTML = listedMenuItems
}

renderMenuItems()

completeOrderBtn.addEventListener('click', function(){
    const paymentBox = document.createElement('div')
    paymentBox.className = 'payment-box'
    paymentBox.innerHTML = `
        <div class="payment-box-content">
            <h1>Enter card details</h1>
            <form>
                <input type="text"placeholder="Enter your name">
                <input type="number" placeholder="Enter card number">
                <input type="number"placeholder="Enter CVV">
                <button class="submit-btn">Pay</button>
            </form>
        </div>
    `
    
    document.body.appendChild(paymentBox)
    
    document.querySelector('.submit-btn').addEventListener('click', function(e){
        e.preventDefault()
        paymentBox.style.display = 'none'
        receipt.classList.remove('receipt')
        receipt.classList.add('pay')
        receipt.innerHTML = `<h1>Thanks, James! Your order is on its way!</h1>`
})
})

