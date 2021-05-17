<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>apka</title>
        <meta name="description" content="second site">
        <link rel="stylesheet" href="apka.css">
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    </head>
    <body>
    <div class="all">
        <div class=languages>
            <img class="polish" src="polish.jpg"/>
            <img class="english" src="english.jpg"/>
        </div>
        <div class="podlogo"><img class="logo" src="logo.png"/></div>
        
        <button class="start"><a href="trending.php">start</a></button>
<!-- nagraj cos /wrzuc cos-->
        <div class="buttons_menu">
            <?php session_start(); if(isset($_SESSION['git'])) echo $_SESSION['git']; unset($_SESSION['git']); ?>
            <button class="login"><a href="login.php">log in</a></button>
            <button class="signup"><a href="signup.php" >sign up</a></button>
        </div>
    </div>
    </body>
</html>