<?php 
class ItemController extends Controller {
    private $model;

    public function __construct () {
        parent::__construct();
        $this->model = new ItemModel();
    }

    public function getView () {
        include "Views/mapa/index.php";
    }

    public function selectItens () {
        // fingir que existe um sistema de validação de usuário

        $itens = $this->model->selectItens();
        if (count($itens) > 0) {
            $status = $this->STATUS_SUCESSO;
            $status["itens"] = $itens;
        }
        else {
            $status = $this->STATUS_ERRO;
        }

        // include "Views/mapa/index.php"; server rendered ou api?
        echo json_encode($status);
    }

    public function deleteItem () {
        $id = $_POST["item_id"];
        $delete = $this->model->deleteItem($id);
    
        $status = $delete ? $this->STATUS_SUCESSO : $this->STATUS_ERRO;
        echo json_encode($status);
    }

    public function insertItem () {
        $descricao = filter_var($_POST["item_descricao"], FILTER_SANITIZE_SPECIAL_CHARS); // prevenir um possivel XSS
        $lat = $_POST["item_lat"];
        $lng = $_POST["item_lng"];

        // se qualquer valor for nulo
        if ($descricao === false || !isset($lat) || !isset($lng)) {
            echo json_encode($this->STATUS_ERRO);
            exit();
        }

        if (!is_double($lat) || !is_double($lng)) {
            echo json_encode($this->STATUS_ERRO);
            exit();
        }

        $insert = $this->model->insertItem($descricao, $lat, $lng);
        if ($insert === null) {
            $status = $this->STATUS_ERRO;
        }
        else {
            $status = $this->STATUS_SUCESSO;
            $status["item"] = $insert;
        }

        echo json_encode($status);
    }
}
?>