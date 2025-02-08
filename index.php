<?php
    include "autoRequire.php";

    $uri_request = $_SERVER["REQUEST_URI"]; 
    $http_request = $_SERVER["REQUEST_METHOD"];

    // Strip query string (?foo=bar) and decode URI
    if (false !== $pos = strpos($uri_request, '?'))
        $uri_request = substr($uri_request, 0, $pos);

    $uri_request = rawurldecode($uri_request);

    $routeInfo = $dispatcher->dispatch($http_request, $uri_request);
    switch ($routeInfo[0]) {
        case FastRoute\Dispatcher::NOT_FOUND:
            // 404 Not Found
            echo "URI não encontrada.";

            break;
        case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
            $allowedMethods = $routeInfo[1];
            // 405 Method Not Allowed
            echo "O método HTTP usado -> {$http_request} não é suportado.";   
        
            break;
        case FastRoute\Dispatcher::FOUND:
            $handler = $routeInfo[1];
            $vars = $routeInfo[2];

            if (!empty(file_get_contents("php://input")))
                $_POST = json_decode(file_get_contents("php://input"), true);
            else
                $_POST = [];

            $class = $handler[0];
            $function = $handler[1];

            $controller = new $class(); // instatiate class
            $controller->{$function}(); // call function

            break;
    }
?>