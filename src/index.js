// write your code here
document.addEventListener('DOMContentLoaded', function() {
    const spiceDetails = document.querySelector('#spice-blend-detail');
    const spiceTitle = document.querySelector('.title');
    const spiceImage = document.querySelector('.detail-image');
    const spiceContainer = document.querySelector('.ingredients-container');
    const ingredientsList = document.querySelector('.ingredients-list');
    const ingredientsArrayCont = []

    const updateTitleForm = document.querySelector('#update-form');
    const updateIngredientForm = document.querySelector('#ingredient-form');


    fetch('http://localhost:3000/spiceblends/1')
    .then(res => res.json())
    .then(function(obj) {
        getSpiceInfoOnPage(obj)
    })

    function getSpiceInfoOnPage(spiceObj) {
        const spiceNameP = document.createElement('p');
            spiceNameP.innerText = spiceObj.title;
        
        const spiceImageImg = document.createElement('img');
            spiceImageImg.src = spiceObj.image;
            spiceImageImg.alt = spiceObj.title;
        
        const spiceSpan = document.createElement('span');

        spiceSpan.append(spiceImageImg);
        spiceTitle.innerText = spiceObj.title;
        spiceImage.replaceWith(spiceSpan);

        spiceObj.ingredients.forEach(function (obj) {
            getIngredientsIntoList(obj)
        })

        function getIngredientsIntoList(ingredientObj){
            const ingredientLi = document.createElement('li');
                ingredientLi.innerText = ingredientObj.name
                ingredientsList.append(ingredientLi)
        }

        updateIngredientForm.addEventListener('submit', function (evt){
            evt.preventDefault();
            fetch('http://localhost:3000/ingredients', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: evt.target.name.value
                    
                })
            })
        })

        updateTitleForm.addEventListener('submit',function (evt) {
            evt.preventDefault()
            fetch('http://localhost:3000/spiceblends/1', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    title: evt.target.title.value
                    }) 
                })
                .then(res => res.json())
                .then(function (obj) {
                    spiceObj = obj;
                    spiceTitle.innerText = obj.title;
                })
        })  
    }  
})