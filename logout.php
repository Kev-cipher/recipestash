<?php
session_start();
// clear the variables
session_unset();  
// end session
session_destroy(); 
header("Location: recipe_website.php");
exit();
?>
