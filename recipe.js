const slideshow3 = document.getElementById("slideshow3");
const recipeBox = document.createElement("div");
const moon = document.getElementById("dark")
const sun = document.getElementById("light")
const darkMode = document.getElementById("darkmode");
const save = document.getElementById("save")
const exit = document.getElementById("exit")
const addrecipe = document.getElementById("addRecipe")
const popup = document.getElementById("recipeform")
const createBox = document.getElementById("slideshow1")
let reader = new FileReader();
let pickedImage = null;

recipeBox.classList.add("recipe1");
recipeBox.innerHTML = `
    <h4>Recipe 1</h4>
    <p>pizza</p>
`;
slideshow3.appendChild(recipeBox);

addrecipe.addEventListener("click", () => {
  console.log("button clicked!");
  popup.style.display = "block";
});

exit.addEventListener("click", () => {
  popup.style.display = "none";
});

// dark mode
let isDarkMode = false

function updateIcon() {
  sun.style.display = (isDarkMode) ? "block" : "none"; //Shows sun if in dark
  moon.style.display = (isDarkMode) ? "none" : "block"; //Shows moon if in day
}

darkMode.addEventListener("click", () => {
  isDarkMode = !isDarkMode; // Changes boolean depending on current mode
  document.body.classList.toggle("dark");
    updateIcon();
});

document.getElementById("foodImage").addEventListener("change", (event) => {
    const file = event.target.files[0]

    reader.onload = function () {
      pickedImage = reader.result;
      console.log(pickedImage);
    };

    reader.readAsDataURL(file)
  }
)



save.addEventListener("click", function(event) {

const recipeName = document.getElementById("name").value
const description = document.getElementById("desc").value
const image = pickedImage
const category = document.getElementById("category").value
const recipe = document.createElement("div")
const goButton = document.createElement("button")
goButton.textContent = "Go to Recipe"

if (!recipeName || !description || !category) {
  return;
}

const boxRecipe = document.createElement("h2")
const boxDesc = document.createElement("p");
const boxCategory = document.createElement("span")
const boxImage = document.createElement("img");

boxRecipe.textContent = recipeName
boxDesc.textContent = description
boxImage.src = pickedImage
boxCategory.textContent = category


recipe.appendChild(boxImage);
recipe.appendChild(boxRecipe);
recipe.appendChild(boxCategory);
//recipe.appendChild(boxDesc); This will go on the back of the recipe card
recipe.appendChild(goButton)
recipe.classList.add("recipeDesign") //Adds design class to the recipe container
pickedImage = null;
reader.abort();

createBox.appendChild(recipe)

popup.style.display = "none";
document.getElementById("form").reset()
event.preventDefault()


});


updateIcon() //makes sure only one icon shows when site is opened for the first time
