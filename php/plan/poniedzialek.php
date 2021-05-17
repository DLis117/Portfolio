<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>PLAN</title>
        <meta name="description" content="poniedzialek">
        <link rel="stylesheet" href="poniedzialek.css">
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC&family=Roboto+Slab&family=Sansita+Swashed:wght@300&display=swap" rel="stylesheet">
    </head>
    <body>
          <?php
            session_start();
            require_once "connect.php";
          ?>
        <script>
    function jakiDzien()
{
  var data = new Date();
  dzien = data.getDay();
  switch(dzien)
  {
    case 0: document.write("<h2>niedziela</h2>"); break;
    case 1: document.write("<h2>poniedziałek</h2>"); break;
    case 2: document.write("<h2>wtorek</h2>"); break;
    case 3: document.write("<h2>środa</h2>"); break;
    case 4: document.write("<h2>czwartek</h2>"); break;
    case 5: document.write("<h2>piątek</h2>"); break;
    case 6: document.write("<h2>sobota</h2>"); break;
    default: document.write("<h2>Dziś mamy nieznany dzień tygodnia :)</h2>");
  }
}
            jakiDzien();
        </script>
        <h3 class="dataa">data</h3>
        <div class="algosy"><h1>notatka + godzina</h1><p>9:15 - 10:45</p></div>
        <img class="higiena" src="output-onlinepngtools%20(3).png"/>
        <img class="piciewody" src="szklankawody.png"/>
        <img class="zupka" src="zupka.png"/>
        <img class="banan" src="banan.png"/>
        <img class="chomik" src="chomik.png"/>
        <img class="arbuz" src="arbuz.png"/>
        <img class="garnek" src="garnek.png"/>
        <img class="basen" src="basen.png"/>
        <p class="pole"></p>
        <img class="szczalka8" src="szczalka.png"/>
        <img class="szczalka1" src="szczalka.png"/>
        <img class="szczalka2" src="szczalka.png"/>
        <img class="szczalka3" src="szczalka.png"/>
        <img class="szczalka4" src="szczalka.png"/>
        <img class="szczalka5" src="szczalka.png"/>
        <img class="szczalka6" src="szczalka.png"/>
        <img class="szczalka7" src="szczalka.png"/>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script>
            $('.garnek').on('click',function()
            {
             $('.szczalka1').toggleClass('znikaj');
                <?php
                    $dataaa=date("Y-m-d");
                    $polaczenie=@new mysqli($host,$db_user,$db_password,$db_name);
                    if($polaczenie->query("UPDATE `tabela1` SET `gotowanie` = 1 WHERE `tabela1`.`data` = '$dataaa'"))
                    {
                        $polaczenie->close();
                    }
                ?>
                    
            })
            $('.zupka').on('click',function()
            {
             $('.szczalka2').toggleClass('znikaj');
            })
            $('.arbuz').on('click',function()
            {
             $('.szczalka3').toggleClass('znikaj');
            })
            $('.higiena').on('click',function()
            {
             $('.szczalka4').toggleClass('znikaj');
            })
            $('.banan').on('click',function()
            {
             $('.szczalka5').toggleClass('znikaj');
            })
            $('.chomik').on('click',function()
            {
             $('.szczalka6').toggleClass('znikaj');
            })
            $('.piciewody').on('click',function()
            {
             $('.szczalka7').toggleClass('znikaj');
            })
            $('.basen').on('click',function()
            {
             $('.szczalka8').toggleClass('znikaj');
            })
            var today = new Date();
            var date=today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
            
            $(".dataa").text(date);
            
            $(".garnek").mouseover(function()
            {
                $(".pole").text("ugotuj coś!")
            });
            $(".garnek").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".zupka").mouseover(function()
            {
                $(".pole").text("zjedz zupę przynajmniej 2 razy w tygodniu!")
            });
            $(".zupka").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".piciewody").mouseover(function()
            {
                $(".pole").text("wypij 1.5litra wody!")
            });
            $(".piciewody").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".higiena").mouseover(function()
            {
                $(".pole").text("higiena")
            });
            $(".higiena").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".basen").mouseover(function()
            {
                $(".pole").text("idź na basen przynajmniej raz w tygodniu!")
            });
            $(".basen").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".arbuz").mouseover(function()
            {
                $(".pole").text("wykonaj ćwiczenia na plecy!")
            });
            $(".arbuz").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".chomik").mouseover(function()
            {
                $(".pole").text("plan treningowy:")
            });
            $(".chomik").mouseout(function()
            {
                $(".pole").text("")
            });
            $(".banan").mouseover(function()
            {
                $(".pole").text("idź pobiegać!")
            });
            $(".banan").mouseout(function()
            {
                $(".pole").text("")
            });
        </script>
    </body>
</html>