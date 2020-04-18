<?php
require_once "config.php";


Class ListManager
{
    private $db;
    
    public function __construct()
    {
        $dbManager = (new DBManager());
        $this->db = $dbManager->conn;
    }
    
    public function updateList($data)
    {
        $this->db->update('list', array('name' => $data['name']), array('id' => $data['id']));
    }
    
    public function getList()
    {
        $statement = $this->db->prepare('SELECT * FROM list');
        $statement->execute();
        $list = $statement->fetchAll();
        
        return $list;
    }
}