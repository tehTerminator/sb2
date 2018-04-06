<?php

    define('LOCALHOST', 'localhost');
    define('DBNAME', 'sb2');
    define('USER', 'root');
    define('PASSWORD', 'Toor*7391');

    $connection = null;
        
    try{
        $connection = new PDO('mysql:host=localhost;dbname=' . DBNAME, USER, PASSWORD);
        // $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    } catch( PDOException $ex ){
        die( json_encode(
            array(
                'result'=>false,
                'exception'=>$ex->getMessage()
                )
            ) 
        );
    }