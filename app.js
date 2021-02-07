
// Handle button click
const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', function () {
    const mealItem = document.getElementById('meal').value;
    loadFoodData(mealItem);
})

// Meal data fetch using food name
const loadFoodData = foodName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.meals != null){
                displayMealItem(data.meals);
            }else{
                alert('No data is available');
            }
        })
        .catch(error => alert('Please check your Internet'))
}

// Display meal item name and image

const displayMealItem = mealItems => {
    const foodContainer = document.getElementById('food-container');
    dataClear('food-container');
    dataClear('item-details');
    mealItems.forEach(item => {
        const foodItemName = document.createElement('div');
        foodItemName.className = 'meal-item';
        const foodInfo = `
        <img src ="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>
        `
        foodItemName.innerHTML = foodInfo;
        foodItemName.addEventListener('click', function () {
            loadMealDetailsData(item.idMeal);
        });
        foodContainer.appendChild(foodItemName);
    });
    document.getElementById('meal').value = '';

}

// fetch meal details data using meal item id

const loadMealDetailsData = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('response',data);
            if(data.meals != null){
                displayDetails(data.meals);
            }else{
                alert('No data is available');
            }
        })
        .catch(error => alert('Please check your Internet'))
}

// Display meal details data after clicking on meal item

const displayDetails = mealItemDetails => {
    const itemDetails = document.getElementById('item-details');
    dataClear('item-details');
    mealItemDetails.forEach(item => {
        const itemDetail = document.createElement('div');
        itemDetail.className = 'meal-details';
        console.log(item.strMeal);
        const itemName = document.createElement('h1');
        const ingredients = document.createElement('h4');
        ingredients.innerText = 'Ingredients';
        itemName.innerText = item.strMeal;
        const ul = document.createElement('ul');
        const imgUrl = document.createElement('img');
        imgUrl.src = item.strMealThumb;
        itemDetail.appendChild(imgUrl);

        // create a array using meal object data for ingredients

        const ingredientsItems = [item.strIngredient1,item.strIngredient2,item.strIngredient3,item.strIngredient4,
            item.strIngredient5,item.strIngredient6,item.strIngredient7,item.strIngredient8,item.strIngredient9,item.strIngredient10,
            item.strIngredient11,item.strIngredient12,item.strIngredient13,item.strIngredient14,item.strIngredient15,item.strIngredient16,
            item.strIngredient17,item.strIngredient18,item.strIngredient19,item.strIngredient20];
        ingredientsItems.forEach(item =>{
            const li = document.createElement('li');
            if(item != null && item != ''){
                li.innerText = item;
                ul.appendChild(li);
            } 
        })
        itemDetail.appendChild(itemName);
        itemDetail.appendChild(ingredients);
        itemDetail.appendChild(ul);
        itemDetails.appendChild(itemDetail);

    });

}

// Refresh meal item data after searching food name

const dataClear = id => {
    const itemDetails = document.getElementById(id);
    itemDetails.innerHTML = "";
}