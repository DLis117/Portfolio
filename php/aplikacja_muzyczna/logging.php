<?php

	session_start();

	require_once "baza.php";

	$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
	
	if ($polaczenie->connect_errno!=0)
	{
		echo "Error: ".$polaczenie->connect_errno;
	}
	else
	{
		$login = $_POST['login'];
		$haslo = $_POST['password'];
		
		$login = htmlentities($login, ENT_QUOTES, "UTF-8");
	
		if ($rezultat = @$polaczenie->query(
		sprintf("SELECT * FROM uzytkownicy WHERE username='%s'",
		mysqli_real_escape_string($polaczenie,$login))))
		{
			$ilu_userow = $rezultat->num_rows;
			if($ilu_userow>0)
			{
				$wiersz = $rezultat->fetch_assoc();
				if (password_verify($haslo, $wiersz['password']))
				{
                    $_SESSION['logged']=true;
                    $_SESSION['id']=$wiersz['id'];//z bazy
                    $_SESSION['username']=$wiersz['username'];
                    $_SESSION['songs']=$wiersz['songs'];
                    $_SESSION['replies']=$wiersz['replies'];
                    

                    unset($_SESSION['e_log']);
                    $rezultat->free();
                    header('Location: profile.php');
				}
				else
                {
                    $_SESSION['e_log']="<p style='color: red'>nieprawidlowy login lub haslo!</p>";
                    header('Location: login.php');
                }
            }
            else
            {
                $_SESSION['e_log']="<p style='color: red'>nieprawidlowy login lub haslo!</p>";
                header('Location: login.php');
            }
        
        }
    $polaczenie->close();
}

?>