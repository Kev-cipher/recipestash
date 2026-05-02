<?php
session_start();
require_once 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST["email"];
    $password = $_POST["password"];

    //Find user from their email
    $stmt = $conn->prepare("SELECT user_id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    
    //Grabs the whole row from the database
    $result = $stmt->get_result();

    //Turns that row into an associative array
    if ($user = $result->fetch_assoc()){
        
        //Compare the typed password to the scrambled one in the database
        if (password_verify($password, $user['password'])){
            
            //Store the ID and Email in the "Session"
            $_SESSION["user_id"] = $user["user_id"]; 
            $_SESSION["user_email"] = $email;

            header("Location: recipe_website.php");
            exit();
        } else {
            echo "Incorrect Password";
        }
    } else {
        echo "No user found with that email";
    }
    $stmt->close();
}
?>
