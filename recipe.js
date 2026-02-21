const slideshow3 = document.getElementById('slideshow3');
const recipeBox = document.createElement('div');
recipeBox.classList.add('recipe1')
recipeBox.innerHTML = `
    <h4>${recipeName}</h4>
    <p>${ingredients}</p>
`;
slideshow3.appendChild('recipeBox');

