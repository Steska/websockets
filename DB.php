<?
require_once 'vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

Class DBManager
{
    public $conn;
    
    private $connectionParams = array(
        'dbname' => 'test',
        'user' => 'postgres',
        'password' => 'postgres',
        'host' => 'localhost',
        'port' => 5432,
        'driver' => 'pdo_pgsql',
    );
    
    public function __construct()
    {
        $this->conn = \Doctrine\DBAL\DriverManager::getConnection($this->connectionParams);

    }
}