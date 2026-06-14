<?php
//Ensures the connection to database.php is mandatory and prevents the server from accidentally connecting twice
require_once 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST["email"];
    $password = $_POST["password"];

    //Hashing function
    $hashed_pass = password_hash($password, PASSWORD_DEFAULT);
    //Prepare Statment 
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    //Binds the parameters as strings to ensure the database treats user input as data only, not as executable code.
    $stmt->bind_param("ss", $email,$hashed_pass);

    //Run the command
    if ($stmt->execute()){
        //redirect the user to the main website page
        header("Location: recipe_website.php");
    }
    else {
        echo "Error:" . $stmt->error;
    }
}
?>
