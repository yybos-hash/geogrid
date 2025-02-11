<?php 
class ItemModel extends Model {
    public function __construct () {
        parent::__construct(); // inicializar super classe (Model)
    }

    public function selectItens () : array {
        return $this->select("SELECT * FROM item ORDER BY item_id");
    }

    public function selectItem (int $id) : array {
        return $this->select("SELECT * FROM item WHERE item_id=:id", ["id" => $id]);
    }

    public function deleteItem (int $id) : bool {
        return $this->delete("DELETE FROM item WHERE item_id=:id", ["id" => $id]);
    }

    public function editItem (int $id, string $descricao) : array {
        $this->update("UPDATE item SET item_descricao=:desc WHERE item_id=:id", ["desc"=> $descricao, "id" => $id]);
        return $this->selectItem($id);
    }

    public function insertItem (string $descricao, float $lat, float $lng) : array | null {
        try {
            // transação pra evitar concorrencia (concurrency) quando pegar o lastInsertId
            $this->pdo->beginTransaction();
            $this->insert("INSERT INTO item (item_descricao, item_lat, item_lng) VALUES (:desc, :lat, :lng)", [
                "desc" => $descricao,
                "lat" => $lat,
                "lng" => $lng
            ]);

            $item = [
                "item_id" => $this->pdo->lastInsertId(),
                "item_descricao" => $descricao,
                "item_lat" => $lat,
                "item_lng" => $lng
            ];

            $this->pdo->commit();

            return $item;
        }
        catch (PDOException $e) {
            $this->pdo->rollBack();
            return null;
        }
    }
}
?>