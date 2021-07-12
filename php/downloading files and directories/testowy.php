<?php //lists all files from certain folder

$path='C:/xampp/htdocs/';//wyswietlane bedzie albo z bazy albo listowane z konkretnego folderu
echo "<h2>Download Files from HERE : </h2>";
if ($handle = opendir($path)) 
{
    session_start();
    $_SESSION['filepath']=$path;
    while (false !== ($entry = readdir($handle))) 
    {
        if ($entry != "." && $entry != "..") 
        {
            
            echo "<form method='post' action='download.php?file=$entry' name='edit'>";
            echo "<input name='entry' value='$entry' type='hidden'>";
            echo "<a>$entry</a>";
//            echo $path.$entry;
//            if(is_dir($path.$entry))
//            {
//                echo " folder\n";
//            }
//            else echo " niefolder\n";
            echo "<input value='pobierz' type='submit'>";
            echo "</form>";
        }
    }
    closedir($handle);
}
?>


