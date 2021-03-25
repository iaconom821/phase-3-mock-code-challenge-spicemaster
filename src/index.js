// write your code here
document.addEventListener('DOMContentLoaded', function() {
    const spiceDetails = document.querySelector('#spice-blend-detail');
    const spiceImageTop = document.querySelector('#spice-images')
    const spiceTitle = document.querySelector('.title');
    const spiceImage = document.querySelector('.detail-image');
    const spiceContainer = document.querySelector('.ingredients-container');
    const ingredientsList = document.querySelector('.ingredients-list');
    const ingredientsArrayCont = []

    const updateTitleForm = document.querySelector('#update-form');
    const updateIngredientForm = document.querySelector('#ingredient-form');
    
    fetch('http://localhost:3000/spiceblends/')
        .then(res => res.json())
        .then(function(blendArray) {
            blendArray.forEach(function(blendObj){
                const blendImgSpan = document.createElement('span');
                const blendImgImg = document.createElement('img')
                    blendImgImg.src = blendObj.image
                    blendImgImg.alt = 'image'
                
                blendImgSpan.append(blendImgImg)
                spiceImageTop.append(blendImgSpan)

                blendImgSpan.addEventListener('click', function(evt) {
                    fetch(`http://localhost:3000/spiceblends/${blendObj.id}`)
                    .then(res => res.json())
                    .then(function(obj) {
                        getSpiceInfoOnPage(obj)
                    })
                })
            })
        })
    

    fetch('http://localhost:3000/spiceblends/1')
    .then(res => res.json())
    .then(function(obj) {
        getSpiceInfoOnPage(obj)
    })

    function getSpiceInfoOnPage(spiceObj) {
        const spiceNameP = document.createElement('p');
            spiceNameP.innerText = spiceObj.title;
        
        spiceImage.src = spiceObj.image;
            
        
        const spiceSpan = document.createElement('span');


        spiceTitle.innerText = spiceObj.title;

        ingredientsList.innerText = ''
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
            fetch(`http://localhost:3000/${spiceObj.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: evt.target.name.value,
                    spiceBlendId: spiceObj.id
                })
            })
            .then(res => res.json())
            .then(function(obj){
                fetch(`http://localhost:3000/spiceblends/${spiceObj.id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type':'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        ingredients: [...spiceObj.ingredients, obj]
                    })
                })
                .then(res => res.json())
                .then(function(obj){
                    spiceObj = obj;
                    obj.ingredients.forEach(function (spices) {
                        getIngredientsIntoList(spices)
                    })
                })
            })
        })

        updateTitleForm.addEventListener('submit',function (evt) {
            evt.preventDefault()
            fetch(`http://localhost:3000/spiceblends/${spiceObj.id}`, {
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