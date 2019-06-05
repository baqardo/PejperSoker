<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700&display=swap&subset=latin-ext" rel="stylesheet"> 
    <link rel="stylesheet" href="../assets/styles/style.css">
    <title>Document</title>
</head>
<body>
    <?php
        require_once "./utilities_php/connect.php";
        require_once "./utilities_php/usefull_function.php";
        session_start();
        
        $connect = @new mysqli($host, $db_user , $db_password,$db_name);

        if ($connect->errno) {
            echo "wystapil blad" . $connect->errno . "----" . $connect->error;
        } 
        else 
        {
            if((isset($_SESSION['is__logged']))&&($_SESSION['is__logged']==true)){
                $name = $_SESSION['login'];
                echo <<< EOT

                <div class="logged_user">
                    <span class="user_login">$name</span>
                    <a href="utilities_php/logout.php" class="logout">Wyloguj się</a>
                </div>

EOT;

                if(check_is_session($connect,$_SESSION['id'])){

                } else {

                }
            } else {
                header("Location:../multi.html");
            }
        }
        $connect->close();
    ?>

    <header class="header_no">
        <div class="img--box">
            <img src="../assets/img/Logo.png" alt="logo">
        </div>
    </header>
    <div class="menu">
        <h1 class="paper_h1">Tyb multiplayer</h1>
        <div class="buttons--box">
            <a href="../index2.html" class="type button" id="createGame">Stwórz grę</a>
            <a href="./join_to_game.html" class="type button">Dołącz do gry</a><br>
        </div>
    </div>
   
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="../js/ajax.js"></script>
</body>
</html>