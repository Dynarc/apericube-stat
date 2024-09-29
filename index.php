<!DOCTYPE html>
<html lang="fr">

<?php
session_start();

if(isset($_GET["version"]) && in_array($_GET["version"], ["1","2"])) { // verify if v1 or v2 is selected
    $_SESSION["version"] = $_GET["version"];
} else {
    $_SESSION["version"] = isset($_SESSION["version"]) ? $_SESSION["version"] : "1";
}

$v = $_SESSION["version"];
$nv = ($v == '1' ? '2' : '1');
?>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <link href="https://getbootstrap.com/docs/5.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" /> -->
    <link rel="stylesheet" href="./public/bootstrap.min.css">
    <title>STAT APÉRICUBE</title>
</head>

<body>
    <div class="d-flex">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sticky-top" style="width: 280px; height: 100vh;">
            <p href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4">Stats Apéricube S<?=$v?></span>
                <button type="button" class="btn btn-secondary btn-sm ms-3" onclick="fetch('./?version=<?=$nv?>').then((r)=>r.text()).then((r)=>location.reload());">S<?=$nv?></button>
            </p>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <p class="nav-link text-white" aria-current="page">
                        Utilisateur
                    </p>
                </li>
                <form class="d-flex align-items-center">
                    <input list="search-list" id="search" name="search" style="width: 90%;"/>
                    <datalist id="search-list">

                    </datalist>
                </form>

                <li class="nav-item mt-5">
                    <p class="nav-link text-white" aria-current="page">
                        Global
                    </p>
                </li>
                <form>
                    <select id="info-type" class="my-2 mb-0" style="width: 90%;">
                        <option value="statistics">Statistiques</option>
                        <option value="recipes">Recettes</option>
                        <option value="advancements">Advancements</option>
                    </select>
                    <select id="stat-type" class="my-2" style="width: 90%;">
                        <option value="">--Choisissez le type de stat--</option>
                        <option value="minecraft:used">Items utilisés</option>
                        <option value="minecraft:broken">Items cassés</option>
                        <option value="minecraft:crafted">Items craftés</option>
                        <option value="minecraft:dropped">Items jetés</option>
                        <option value="minecraft:picked_up">Items ramassés</option>
                        <option value="minecraft:mined">Blocs cassés</option>
                        <option value="minecraft:killed">Ennemis tués</option>
                        <option value="minecraft:killed_by">Tué par</option>
                        <option value="minecraft:custom">Autre</option>
                    </select>

                    <input list="stat-list" id="stat-name" name="stat-name" style="width: 90%;"/>
                    <datalist id="stat-list">

                    </datalist>
                </form>

                <p class="total my-3 btn btn-lg btn-outline-light" style="width: 90%; display: none;"></p>
            </ul>
        </div>
        <div class="my-5 mx-3 content w-100" style="width: auto">

        </div>
    </div>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <?php
    $array_files = scandir('./data/V'.$v.'/advancement');
    array_splice($array_files, 0, 2);
    $js_array = '[';
    foreach ($array_files as $files) {
        $js_array .= "'".$files."',";
    }
    $js_array = substr($js_array, 0, -1);
    $js_array .= "]";
    echo '<script>const allFiles = '.$js_array.', version = "V'.$v.'";</script>';
    ?>

    <!-- <script src="./object.js"></script> -->
    <script src="./script.js"></script>
    <!-- <script src="https://getbootstrap.com/docs/5.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script> -->
    <script src="./public/bootstrap.bundle.min.js"></script>
    <script src="./public/chart.min.js"></script>
    <script src="./public/chart-plugin-datalabels.min.js"></script>
</body>

</html>

<!-- ! next update is to comment everything and finish global stats -->
<!-- TODO: update advancement to keep only the player's criteria when it's done to prevent multiple way advancement to display all possiblities (and only show which one he succed) -->