
<?php 
    session_start();
    $_SESSION['OK']=true;
    $_SESSION['login']=$_POST['login'];
    $_SESSION['haslo']=$_POST['haslo'];
    $_SESSION['haslo2']=$_POST['haslo2'];
    

if((strlen($_SESSION['login'])<3)||(strlen($_SESSION['login'])>20))
{
    $_SESSION['e_login']="<p style='color: red'>login musi zawierac od 3 do 20 znakow!</p>";
    $_SESSION['OK']=false;
    header('Location: signup.php');
}
if((ctype_alnum($_SESSION['login']))==false)//TO NIE WSZYSTKO!!!!
{
    $_SESSION['e_login']="<p style='color: red'>login zawiera niepoprawne znaki!</p>";
    $_SESSION['OK']=false;
    header('Location: signup.php');
}
$email=$_POST['email'];
$emailB=filter_var($email,FILTER_SANITIZE_EMAIL);
if((filter_var($emailB,FILTER_VALIDATE_EMAIL)==false)||($email!=$emailB))
{
    $_SESSION['e_email']="<p style='color: red'>email zawiera niedozwolone znaki!</p>";
    $_SESSION['OK']=false;
    header('Location: signup.php');
}
$haslo=$_SESSION['haslo'];
$haslo2=$_SESSION['haslo2'];
if(strlen($_SESSION['haslo'])<3)
{
    $_SESSION['e_haslo']="<p style='color: red'>haslo musi zawierac minimum 3 znaki!</p>";
    $_SESSION['OK']=false;
    header('Location: signup.php');

}
if($haslo!=$haslo2)
{
    $_SESSION['e_haslo']="<p style='color: red'>hasla sie roznia!</p>";
    $_SESSION['OK']=false;
    header('Location: signup.php');

}
if(isset($_POST['regulamin'])==false)
{
    $_SESSION['e_regulamin']="<p style='color: red'>zaakceptuj regulamin!</p>";
    $_SESSION['OK']=false;
    header('Location: signup.php');
}
//sprawdz w bazie czy takiego loginu nie ma juz w bazie 
if($_SESSION['OK']==true)
{
    $login=$_POST['login'];
    require_once "baza.php";
    $polaczenie=@new mysqli($host,$db_user,$db_password,$db_name);
    if($result=$polaczenie->query(sprintf("SELECT * FROM uzytkownicy WHERE username='%s'",mysqli_real_escape_string($polaczenie,$login))))
    {
        $ile=$result->num_rows;
        if($ile==1)
        {
            $_SESSION['e_login']="<p style='color: red'>istnieje juz konto o takim loginie</p>";
            $polaczenie->close();
            $_SESSION['OK']=false;
            header('Location: signup.php');
        }

            
    }
    if($_SESSION['OK']==true)
    {
        if($result=$polaczenie->query(sprintf("SELECT * FROM uzytkownicy WHERE email='%s'",mysqli_real_escape_string($polaczenie,$emailB))))
        {
           $ile=$result->num_rows;
            if($ile==1)
            {
                $_SESSION['e_email']="<p style='color: red'>email zajęty!</p>";
                $polaczenie->close();
                $_SESSION['OK']=false;
                header('Location: signup.php');
            } 
        }
    }
    if($_SESSION['OK']==true)
    {
        
        $haslo_hash=password_hash($haslo,PASSWORD_DEFAULT);
        if($polaczenie->query("INSERT INTO uzytkownicy (username,password,email,songs,replies) VALUES ('$login','$haslo_hash','$emailB',0,0);"))
            {
         /*DODALO POMYSLNIE*/
                $_SESSION['git']="<p style='color: green'>KONTO DODANE POMYSLNIE!</p>";
                header('Location: index.php');
                
            }
     else
     {
         echo "error ".$polaczenie->errno;
         exit();
     }
        
    $polaczenie->close();
        
    }
    
}

?>