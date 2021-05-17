<?php 
 session_start();
if((isset($_SESSION['logged']))==false||($_SESSION['logged'])==false)
{
    header('Location: login.php');
    exit();
}
?>
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
    <div class="all">
        <div class="settings"><i class="fa fa-cog" aria-hidden="true"></i></div>
        <div class="ramka">
            <ul>
            <li><a href="profile.php">profile</a></li>
            <li><a href="#">language</a></li>
            <li><a href="#">theme</a></li>
            <li><a href="#">about</a></li>
            <li><a href="logout.php">logout</a></li>
            </ul>
        </div>
        <h1>your songs</h1>
<?php
// Include the database configuration file
 require_once "baza.php";
$db = @new mysqli($host,$db_user,$db_password,$db_name);
if($result=$db->query(sprintf("SELECT * FROM utwory WHERE uzytkownik='%s'",mysqli_real_escape_string($db,$_SESSION['username']))))
{
    while($row = $result->fetch_assoc())
    {
        echo "<div class='aud'>";
        echo "<audio controls controlsList='nodownload'><source src='uploads/" .$row['nazwa']. "' type='audio/mpeg'/></audio>";
        echo "<form action='comments.php' method='post'>";
        $x=$row['id'];
        echo "<input type='hidden' value='$x' name='hiddenid'/>";
        echo "<input type='submit' id='gotocomments' value='->'/>";
        echo "</form>";
        echo "</div>";
    }
    $db->close();
}
?>
        <a class="back" href="profile.php"><i class="fa fa-reply"></i></a>
    </div>
        
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script>
             var pierwszy=true;
            if(pierwszy==true)
                {
                    pierwszy=false;
                    $(".ramka").css('left',0);
                    $(".ramka").css('left',-300);
                }
            var wlacz=0;
            $(".settings").on("click",function()
            {
                if(wlacz==1)
                {
                    $(".ramka").css('left',-300);
                    $(".settings i").toggleClass("rotate");
                    wlacz=0;
                }
                else
                {
                    $(".ramka").css('left',0);
                    $(".settings i").toggleClass("rotate");
                    wlacz=1;
                }
            })
        </script>
    </body>
</html>