<?php
session_start();
//Clear the variables
session_unset();  
//End session
session_destroy(); 
header("Location: recipe_website.php");
exit();
?>
