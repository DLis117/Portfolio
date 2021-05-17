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
        
<?php
        session_start();
 require_once "baza.php";
$db = @new mysqli($host,$db_user,$db_password,$db_name);
if(isset($_POST['hiddenid']))
{
    $idd=$_POST['hiddenid'];
}
else
{
    $idd=$_SESSION['songid'];
}
if($result=$db->query(sprintf("SELECT * FROM utwory WHERE id='%s'",mysqli_real_escape_string($db,$idd))))

    {
        $row = $result->fetch_assoc();
            echo "<div id='abovesong'></div>";
            echo "<div class='aud2'>";
            echo "<audio controls controlsList='nodownload'><source src='uploads/" .$row['nazwa']. "' type='audio/mpeg'/></audio>";
            echo "</div>";
        $db->close();
    }
?>        
        
<?php                               
            function getComments($conn)
            {
                if(isset($_POST['hiddenid']))
                {
                    $songid=$_POST['hiddenid'];
                }
                else
                {
                    $songid=$_SESSION['songid'];
                }
                $sql= "SELECT * FROM komentarz WHERE id_utworu='$songid' order by data desc";
                $result=$conn->query($sql); 
                while($row=$result->fetch_assoc())
                {
                    if((isset($_SESSION['username']))&&($row['uzytkownik']==$_SESSION['username']))
                    {
                        echo "<div id='komentarz_uzytkownika'>";
                        echo $row['uzytkownik'].'&nbsp;'.$row['data'].'<br><br>'.$row['tresc'].'<br><br>';
                        echo "</div>";
                    }
                    else
                    {
                        echo "<div id='komentarz'>";
                        echo $row['uzytkownik'].'&nbsp;'.$row['data'].'<br><br>'.$row['tresc'].'<br><br>';
                        echo "</div>";
                    }
                } 
            }
        $polaczenie=@new mysqli($host,$db_user,$db_password,$db_name);
        getComments($polaczenie);
        $polaczenie->close();
        
?>

<?php
        echo "<form action='addcomment.php' method='post'>";
        if(isset($_POST['hiddenid']))
        {
            $x=$_POST['hiddenid'];
        }
        else
        {
            $x=$_SESSION['songid'];
        }
        echo "<input type='text' name='kom' placeholder='&nbsp;napisz komentarz' required/>";
        echo "<input type='hidden' value='$x' name='hiddensongid'/>";
        echo "<input type='submit' id='addcomment' value='dodaj komentarz'/>";
        echo "</form>";
?>
        
        
        
        
        
        <a class="back" href="trending.php"><i class="fa fa-reply"></i></a>
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