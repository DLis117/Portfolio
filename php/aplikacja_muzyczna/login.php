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
        <h1>log in</h1>
        <form action="logging.php" method="post">
            <input type="text" name="login" placeholder="&nbsp;login" required/>
            <input type="password" name="password" placeholder="&nbsp;password" required/>
            <input type="submit" name="submit" value="log in"/>
            <?php session_start(); if(isset($_SESSION['e_log'])) {echo $_SESSION['e_log']; unset($_SESSION['e_log']);} ?>
        </form>
        <a class="back" href="index.php"><i class="fa fa-reply"></i></a>
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