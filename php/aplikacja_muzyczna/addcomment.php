<?php
    session_start();
    require_once "baza.php";

    $tresc=$_POST['kom'];
    if(isset($_SESSION['username']))
        {
            $uzytkownik1=$_SESSION['username'];
        }
        else
        {
            $uzytkownik1="Annonymous";
        }
    $songid=$_POST['hiddensongid'];
    $_SESSION['songid']=$_POST['hiddensongid'];
    $tresc=htmlentities($tresc,ENT_QUOTES, "UTF-8");       
    $uzytkownik1=htmlentities($uzytkownik1,ENT_QUOTES, "UTF-8");

    $polaczenie=@new mysqli($host,$db_user,$db_password,$db_name);

     if($polaczenie->query(sprintf("INSERT INTO komentarz (uzytkownik,tresc,id_utworu) VALUES ('$uzytkownik1','$tresc','$songid');",mysqli_real_escape_string($polaczenie,$tresc),mysqli_real_escape_string($polaczenie,$uzytkownik1))))
     {
         
     }
     else
     {
         echo "error ".$polaczenie->errno;
         exit();
     }

    header('Location: comments.php');
?>



        


