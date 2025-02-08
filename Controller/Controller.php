<?php 
class Controller {
    protected $STATUS_ERRO;
    protected $STATUS_SUCESSO;

    public function __construct () {
        $this->STATUS_ERRO = ["status" => -1];
        $this->STATUS_SUCESSO = ["status" => 0];
    }
}
?>