const slideshow3 = document.getElementById('slideshow3');
const recipeBox = document.createElement('div');
recipeBox.classList.add('recipe1')
recipeBox.innerHTML = `
    <h4>Recipe 1</h4>
    <p>pizza</p>
`;
slideshow3.appendChild(recipeBox);

// dark mode 

const darkMode= document.getElementbyID('darkMode');

darkMode.addEventlistener('click', () => {
    document.body.classList.toggle('dark')
});
