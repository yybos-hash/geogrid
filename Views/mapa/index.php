<?php 
include "apiKey.php";
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="Views/mapa/css/index.css">
        <link rel="stylesheet" href="Views/mapa/css/map.css">
        <link rel="stylesheet" href="Views/mapa/css/modal.css">
        <link rel="stylesheet" href="Views/mapa/css/info-holder.css">
        <link rel="stylesheet" href="Views/mapa/css/formulario.css">
        <script src="https://maps.googleapis.com/maps/api/js?key=<?php echo $apiKey; ?>&callback=initMap&v=weekly&libraries=marker&loading=async" async defer></script>

        <title>Document</title>
    </head>
    <body>
        <div id="main-div">
            <div id="map-holder">
                <div id="google-map"></div>

                <div id="info-holder">
                    <button id="button-consultar">Consultar</button>
                </div>
            </div>
        </div>    

        <script src="Views/mapa/js/map.js"></script>
        <script src="Views/mapa/js/modal.js"></script>
        <script src="Views/mapa/js/formulario.js"></script>
        <script src="Views/mapa/js/index.js"></script>
    </body>
</html>