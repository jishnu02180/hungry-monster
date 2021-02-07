const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', function () {
    const mealItem = document.getElementById('meal').value;
    loadFoodData(mealItem);
})


const loadFoodData = foodName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealItem(data.meals))
    //     .catch(error => console.log(error))
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('response',data);
            if(data.meals != null){
                displayMealItem(data.meals);
            }else{
                alert('No data is available');
            }
        })
        .catch(error => alert('Please check your Internet'))
}

const displayMealItem = mealItems => {

    //console.log(mealItems);
    const foodContainer = document.getElementById('food-container');
    dataClear('food-container');
    dataClear('item-details');
    mealItems.forEach(item => {
        const foodItemName = document.createElement('div');
        foodItemName.className = 'meal-item';
        itemPosition = item.idMeal;
        const foodInfo = `
        <img src ="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>
        `
        foodItemName.innerHTML = foodInfo;
        foodItemName.addEventListener('click', function () {
            mealDetails(item.idMeal);
        });
        foodContainer.appendChild(foodItemName);
    });
    document.getElementById('meal').value = '';

}

const mealDetails = id => {
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
        const li = `
         <li>${item.strIngredient1}</li>
         <li>${item.strIngredient2}</li>
         <li>${item.strIngredient3}</li>
         <li>${item.strIngredient4}</li>
         <li>${item.strIngredient5}</li>
         <li>${item.strIngredient6}</li>
        `
        ul.innerHTML = li;
        itemDetail.appendChild(itemName);
        itemDetail.appendChild(ingredients);
        itemDetail.appendChild(ul);
        itemDetails.appendChild(itemDetail);

    });

}

const dataClear = id => {
    const itemDetails = document.getElementById(id);
    itemDetails.innerHTML = "";
}