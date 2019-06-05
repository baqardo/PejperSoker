<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="assets/styles/style.css">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700&display=swap&subset=latin-ext" rel="stylesheet">
    <!-- <meta http-equiv="refresh" content="0; url=php_scripts/lobby.php"> -->
</head>

<body>
    <?php
    
    require_once "./php_scripts/utilities_php/connect.php";
    require_once "./php_scripts/utilities_php/usefull_function.php";
    session_start();

        if((isset($_SESSION['is__logged']))&&($_SESSION['is__logged']==true))
        {
            echo <<< EOT

            <div class="loader alert">
        <img src="assets/img/loader.gif">
        <h1>Waiting for opponent</h1>
        <!-- <div class="gameid_box">
            <h2>Game ID: </h2>
            <span class="game_id"></span>
            <button class="copy"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg></button>
        </div> -->
    </div>
    <div style="display: none;">
        <img src="assets/img/ball.png" alt="ball" id="ball">
    </div>
    <div class="endgame alert">
        <h1 class="message">
            FUCKING WINNER <!-- wiadomość z ajaxa -->
        </h1>
        <button class="endgame--button button">GO BACK</button>
    </div>
    <div class="creator--box alert">
        <div class="creator">
            <h1>Stwórz postać</h1>
            <form method="POST" id="creator">  
                <h3>Wybierz kolor</h3>
                <div class="colors">
    
                </div>
                <input class="button" type="submit" id="play" value="graj" name="graj">
            </form>
        </div>
    </div> <!-- kreator -->

    <header class="header">
        <div class="name active" data-id="0">
            Gracz
        </div>
        <div class="img--box">
            <img src="assets/img/Logo.png" alt="Logo">
        </div>
        <div class="name" data-id="1">
            BOT
        </div>
    </header>
    <div id="board"></div>
    
    <script src="js/global.js"></script>
    <script src="js/main.js"></script>
    <script src="js/ajax.js"></script>
   
    
EOT;

        }
         else {
            header("Location:./multi.html");
        }
    
    
    ?>

</body>


<!-- <script src="js/ajax_check_is_session.js"></script>/ -->
</html>