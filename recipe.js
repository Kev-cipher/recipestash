const recents = document.getElementById("recents");
const recipeBox = document.createElement("div");
const moon = document.getElementById("dark")
const sun = document.getElementById("light")
const darkMode = document.getElementById("darkmode");
const save = document.getElementById("save")
const exit = document.getElementById("exit")
const addrecipe = document.getElementById("addRecipe")
const popup = document.getElementById("recipeform")
const createBox = document.getElementById("recents-wrapper")
const overlay = document.getElementById("overlay");
const breakfast = document.getElementById("breakfast")
const dessert = document.getElementById("dessert")
const lunch = document.getElementById("lunch")
const dinner = document.getElementById("dinner")
const snack = document.getElementById("snack")
let reader = new FileReader();
let pickedImage = null;
let pickedCategory = "Not Selected"



//Sets automatically check for duplication. Like a HashSet
const currentIDs = new Set();


//Function that makes sure IDs aren't repeated 
function generateID() {
  let ID = crypto.randomUUID();
  //Checks if the ID already exists within the set
  while (currentIDs.has(ID)) {
    ID = crypto.randomUUID();
  }
  currentIDs.add(ID);
  return ID;
}


addrecipe.addEventListener("click", () => {
  popup.style.display = "block"; //Makes the form visible
  overlay.style.display = "block"; //Adds dim to background when form is opened
});

exit.addEventListener("click", () => {
  overlay.style.display = 'none';
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


//Listens for a change in foodImage and renders it
document.getElementById("foodImage").addEventListener("change", (event) => {
    const file = event.target.files[0]

    reader.onload = function () {
      pickedImage = reader.result;
    };

    reader.readAsDataURL(file)
  }
)

//This section handles category selection in the form using switch case
document.querySelectorAll(".foodbutton").forEach((btn) => {
  btn.addEventListener("click", () => {
    switch (btn.id) {
      case "breakfast":
        pickedCategory = "Breakfast";
        break;

      case "lunch":
        pickedCategory = "Lunch";
        break;

      case "dinner":
        pickedCategory = "Dinner";
        break;

      case "dessert":
        pickedCategory = "Dessert";
        break;

      case "snack":
        pickedCategory = "Snack";
        break;

      default:
        pickedCategory = "Not Selected";
    }

    

    document
      .querySelectorAll(".foodbutton")
      .forEach((btn) => btn.classList.remove("selected"));
    btn.classList.add("selected");
    //Makes the selected category stand out in the form
  });
});



save.addEventListener("click", function(event) {
  overlay.style.display = 'none' //Gets rid of the dim effect in the background

  event.preventDefault();


const recipeName = document.getElementById("name").value
const description = document.getElementById("desc").value
const image = pickedImage
const recipe = document.createElement("div")
const visitRecipe = document.createElement("button")
visitRecipe.textContent = "Visit Recipe"


if (!recipeName || !description || pickedCategory === "Not Selected") {
  return;
}

//Switch case that assigns category to recipe based on category selected
// during the form fill (Selects based on id name)


const boxRecipe = document.createElement("h2");
const boxDesc = document.createElement("p");
const boxCategory = document.createElement("span");
const boxImage = document.createElement("img");
const recipeid = generateID();



boxRecipe.textContent = recipeName
boxDesc.textContent = description
boxImage.src = pickedImage
boxCategory.textContent = pickedCategory



recipe.appendChild(boxImage);
recipe.appendChild(boxRecipe);
recipe.appendChild(boxCategory);
recipe.appendChild(visitRecipe)
recipe.id = recipeid //Received from function
//recipe.appendChild(boxDesc); This will go on the back of the recipe card
recipe.classList.add("recipeDesign") //Adds design class to the recipe container
pickedImage = null;
reader.abort();
//Resets the image picked 

createBox.appendChild(recipe)
//Appends the recipe to the recents box


popup.style.display = "none";
document.querySelectorAll('#recipeform input').forEach(input => input.value = '')
//Resets the form to be empty the next time the form is opened
});


updateIcon() //makes sure only one icon shows when site is opened for the first time
