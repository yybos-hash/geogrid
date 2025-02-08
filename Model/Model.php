<?php 
class Model {
    protected $pdo;

    private $host = "localhost";
    private $usuario = "root";
    private $senha = "";
    private $database = "geogrid";

    public function __construct () {
        $this->pdo = new PDO("mysql:dbname=$this->database;host=$this->host", $this->usuario, $this->senha);
    }

    protected function select (string $query, array $args=[]) : array {
        $prepare = $this->pdo->prepare($query);
        $prepare->execute($args);
        $resultado = $prepare->fetchAll(PDO::FETCH_ASSOC);

        return $resultado;
    }

    protected function insert (string $query, array $args) : bool {
        $prepare = $this->pdo->prepare($query);
        return $prepare->execute($args);
    }

    protected function update (string $query, array $args) : bool {
        $prepare = $this->pdo->prepare($query);
        return $prepare->execute($args);
    }

    protected function delete (string $query, array $args) : bool {
        $prepare = $this->pdo->prepare($query);
        return $prepare->execute($args);
    }
}
?>