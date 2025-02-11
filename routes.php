<?php 
    $dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
        $root = "/geogrid";

        $r->addRoute("GET", "$root/itens", ["ItemController", "getView"]);
        $r->addRoute("GET", "$root/itens/pegar", ["ItemController", "selectItens"]);
        $r->addRoute("POST", "$root/itens/deletar", ["ItemController", "deleteItem"]);
        $r->addRoute("POST", "$root/itens/adicionar", ["ItemController", "insertItem"]);
        $r->addRoute("POST", "$root/itens/editar", ["ItemController", "editItem"]);
    });
?>