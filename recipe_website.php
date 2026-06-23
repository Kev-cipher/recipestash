<!-- php section -->
<?php
session_start();
$isLoggedIn = isset($_SESSION["user_id"]);
?>

<!-- html section -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RecipeStash</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div>
      <!--First section-->
      <div class="container1">
        <h1>RecipeStash</h1>
        <div class="header">
            <input type="text" placeholder="Search recipes..." id="headersearch"/>
            <!-- check if you're already logged in -->
            <?php if ($isLoggedIn): ?>
                <span style="color: white; margin-right: 10px;">
                    <?php echo $_SESSION["user_email"]; ?>
                </span>
                <button id="logout" onclick="window.location.href='logout.php'">Logout</button>
            <?php else: ?>
                <!-- if not logged in, there is no log out screen and does not appear name of user(email) -->
                <button id="login" onclick="window.location.href='recipe_login.html'">Login</button>
            <?php endif; ?>
        </div>
        
      <!--Second section-->
       <div class="container2">
                <ul id="headerLinks">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Favorites</a></li>
                    <li><a href="#">Trending</a></li>
                    <li><a href="#">Categories</a></li>
                    <li id="About"><a href="#">About Us</a></li>
                </ul>
                <hr>
            </div>
            <!--Third Section-->
            <div class="container3">
                <div class="slideshows">
                    <div id="slideshow1">
                        <h3>Create Recipe
                            <button id="addRecipe">
                                <span>&#43;</span>
                            </button>
                            <hr>
                        </h3>
                    </div>
                    <div id="slideshow2">
                        <h3>Favorites</h3>
                        <hr>
                    </div>
                    <div id="slideshow3">
                        <h3>Recently Published</h3>
                        <hr>
                    </div>
                </div>
            <!--Side Bar Section-->
                <div class="sidebar">
                    <div id="sidetitle">
                        <h4>Popular</h4>
                        <hr>
                    </div>
                </div>
            </div>
            <!--Recipe Form pop up for adding recipe into the given container-->  
            <div class="recipeform" id="recipeform">
                <form class="form-container">
                    <h1>Recipe</h1>

                    <label for="name"><b>Recipe name</b></label>
                    <input placeholder="Enter recipe name" id="name">

                    <label for="desc"><b>Description</b></label>
                    <textarea placeholder="Give us the rundown..." id="desc" rows="4"></textarea>

                    <label for="foodImage" class="image-upload">
                        <b>Add an Image</b>
                        <span>+</span>
                        <input type="file" id="foodImage" accept="image/*">
                    </label>

                    <label for="type"><b>Category</b></label>
                    <select id="category">
                        <option value="">--Please choose a category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="quicksnack">Quick-Snack</option>
                    </select>   

                    <button id="save">Save</button>
                    <button id="exit">
                        <img src="images/disabled_by_default_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg">
                    </button>
                </form>
            </div>

        </div> 
            <!-- Javascript link-->
        <script src="recipe.js"></script>
    </body>
</html>
