const recipeBox = document.createElement("div");
const moon = document.getElementById("dark")
const sun = document.getElementById("light")
const darkMode = document.getElementById("darkmode");
const save = document.getElementById("save")
const exit = document.getElementById("exit")
const addrecipe = document.getElementById("addRecipe")
const popup = document.getElementById("recipeform")
const recents = document.getElementById("recently-created")
const favorites = document.getElementById("favorites")
const overlay = document.getElementById("overlay");
const breakfast = document.getElementById("breakfast")
const dessert = document.getElementById("dessert")
const lunch = document.getElementById("lunch")
const dinner = document.getElementById("dinner")
const snack = document.getElementById("snack")
const stepBox = document.getElementById('stepBox')
const stepLabel = document.getElementById('stepNumbers')
const backArrow = document.getElementById('back')
const forwardArrow = document.getElementById('forward')
const addStep = document.getElementById('add');
const ArrayString = document.getElementById("ArrayString")
//Used to store the steps 
const cook = document.getElementById('cookTime')
const prep = document.getElementById('prepTime')
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
})

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

//--------------------------------------Form Handling--------------------------------------//

// UPDATED SAVE LISTENER: Sends data to PHP database before rendering
save.addEventListener("click", async function(event) {

  event.preventDefault();

  const recipeName = document.getElementById("name").value;
  const description = document.getElementById("desc").value;
  const image = pickedImage;

  if (
      !recipeName ||
      !description ||
      pickedCategory === "Not Selected" ||
      cook.value.trim() === "" ||
      prep.value.trim() === ""
    ) {
      alert("Make sure all info is filled out!")
      return ;
    } else {

      overlay.style.display = 'none' //Gets rid of the dim effect in the background

  // 1. Package the data to send to the server
  const recipeData = {
    name: recipeName,
    description: description,
    category: pickedCategory,
    image: image // This is your base64 image string
    //Steps: steps
    //cookTime: cookTime
    //prepTime: prepTime
  };

  // 2. Send the data to your PHP backend
  try {
    // Change 'save_recipe.php' to the file that handles your SQL INSERT
    const response = await fetch('save_recipe.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Successfully saved to database:", result);
    
  } catch (error) {
    console.error("Failed to save to database:", error);
    alert("There was an error saving your recipe to the database.");
    return; // Stops the function so the recipe doesn't show up locally if the database save failed
  }

  // 3. Create the DOM elements if the database save was successful
  const boxRecipe = document.createElement("h2");
      //Header for the recipe created during runtime
      const boxCategory = document.createElement("span");
      //Span for the recipe created during runtime
      const boxImage = document.createElement("img");
      //Image for the recipe created during runtime
      const recipeid = generateID();
      //Recipe ID generated once recipe is saved -->Stored in set to prevent repetition
      const cookTime = cook.value;
      const prepTime = prep.value;

  boxRecipe.textContent = recipeName
  boxDesc.textContent = description
  boxImage.src = pickedImage
  boxCategory.textContent = pickedCategory

  recipe.appendChild(boxImage);
  recipe.appendChild(boxRecipe);
  recipe.appendChild(boxCategory);
  recipe.appendChild(visitRecipe)
  recipe.id = recipeid //Received from function
  recipe.classList.add("recipeDesign") //Adds design class to the recipe container
  
  recents.appendChild(recipe)
  //Appends the recipe to the recents box

  //Resets the form and variables
  pickedImage = null;
  reader.abort();
  popup.style.display = "none";
  document.querySelectorAll('#recipeform input').forEach(input => input.value = '');
  document.getElementById("desc").value = ''; // Clears the description textarea
  saveStep(); //Saves the most recently typed step
});

//-------------------------Step Handling-----------------------------
let steps = [""];
//Empty array that will hold the steps
let currentStep = 0

function updateStepInfo() {
  stepBox.value = steps[currentStep]
  stepLabel.textContent = `Step ${currentStep + 1} / ${steps.length}`;
}

function saveStep() {
  steps[currentStep] = stepBox.value;
}

forwardArrow.addEventListener("click", () => {
    saveStep();
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      updateStepInfo();
    }
});

  backArrow.addEventListener("click", () => {
    saveStep();
    if (currentStep > 0) {
      currentStep -= 1;
      updateStepInfo();
    }
  });

  addStep.addEventListener("click", () => {
    saveStep();
    steps.push(""); //Adds an element to end of array
    currentStep = steps.length - 1;
    updateStepInfo();
  });

  

  updateStepInfo();



//--------------------------------------------------------------------------------------------------------


updateIcon() //makes sure only one icon for dark mode shows when site is opened for the first time

// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes();
});

//Fetches the recipe array from the PHP backend
async function fetchRecipes() {
    const container = document.getElementById('recently-created');
    
    try {
        // Change 'create_recipe.php' to the actual path of your PHP file if it's different
        const response = await fetch('create_recipe.php');
        
        // Check if the server responded with a 200-299 status code
        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        // Parse the JSON data sent by PHP
        const recipes = await response.json();
        
        // Send the data to your display function
        displayRecipes(recipes, container);
        
    } catch (error) {
        console.error('Fetch operation failed:', error);
        if (container) {
            container.innerHTML = `<p class="error">Oops! Could not load recipes right now.</p>`;
        }
    }
}

//Loops through the data and renders it onto the page
function displayRecipes(recipes, container) {
    if (!container) return;

    // Clear out any placeholder text or old content
    container.innerHTML = '';

    // Incase the database is empty
    if (recipes.length === 0) {
        container.innerHTML = '<p>No recipes available yet. Be the first to add one!</p>';
        return;
    }

    // Build the layout for each recipe
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Helper function to escape HTML to protect against XSS injection attacks
        recipeCard.innerHTML = `
            <img src="${recipe.image ? recipe.image : 'default-placeholder.jpg'}" alt="Recipe Image">
            <h2>${escapeHTML(recipe.name)}</h2>
            <span class="category-tag">${escapeHTML(recipe.category)}</span>
            <div class="instructions">
                <h3>Instructions:</h3>
                <p>${escapeHTML(recipe.instructions).replace(/\n/g, '<br>')}</p>
            </div>
        `;

        container.appendChild(recipeCard);
    });
}

// Escapes text to prevent scripts from executing in your HTML
function escapeHTML(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
}

