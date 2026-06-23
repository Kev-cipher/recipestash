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
      <div>
             <!--Side bar-->
      <div class="sidebar">
        <div id="sidetitle">
            <h4>Popular</h4>
        </div>
        <hr>
      </div>
      <!--Third section-->
      <div>

      </div>
      </div>
    </div>
  </body>
</html>