/*
  Name: Bilal Zahid
  Date: 09.26.2024
  CSC 372-01

  This is the meal plan js file for assignment 3. It handles the dynamic interactions
  on the meal plan page which allows users to add and remove dishes from a simulated
  meal plan. This script manages the state of the meal plan, updates the display,
  and calculates the total price dynamically.
*/

document.addEventListener('DOMContentLoaded', function () {
    const dishList = document.getElementById('dishList');
    const selectedDishes = document.getElementById('selectedDishes');
    let mealPlan = {};
    let total = 0;

    dishList.addEventListener('click', function (event) {
        const target = event.target;
        const dishName = target.textContent.split(" - ")[0];
        const dishPrice = parseFloat(target.dataset.price);
        addToMealPlan(dishName, dishPrice);
    });

    function addToMealPlan(dish, price) {
        if (mealPlan[dish]) {
            mealPlan[dish].quantity++;
        } else {
            mealPlan[dish] = {price: price, quantity: 1};
        }
        updateMealPlanDisplay();
    }

    function removeFromMealPlan(dish) {
        if (mealPlan[dish]) {
            mealPlan[dish].quantity--;
            if (mealPlan[dish].quantity === 0) {
                delete mealPlan[dish];
            }
        }
        updateMealPlanDisplay();
    }

    function updateMealPlanDisplay() {
        selectedDishes.innerHTML = '';
        total = 0;
        for (let dish in mealPlan) {
            const dishElem = document.createElement('div');
            dishElem.textContent = `${dish} - $${mealPlan[dish].price} x ${mealPlan[dish].quantity}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove one';
            removeBtn.addEventListener('click', function () {
                removeFromMealPlan(dish);
            });
            dishElem.appendChild(removeBtn);
            selectedDishes.appendChild(dishElem);
            total += mealPlan[dish].price * mealPlan[dish].quantity;
        }
        document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    }
});
