<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

    include 'QueryBuilder.php';

    
    define('LOCALHOST', 'localhost');
    define('DBNAME', 'q3');
    define('USER', 'root');
    define('PASSWORD', 'Toor*7391');

    $connection = NULL;
        
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

    $request = json_decode( file_get_contents("php://input") );
    $request = json_decode( json_encode($request), true );

    $output = array();
    process_request($connection, $request, $output);
    $verbose = isset($response['verbose']) ? $request['verbose'] : NULL;
    print_response($output, $verbose);

    function print_response($output, $verbose=false) {
        if ($verbose && count($output) == 1) {
            die( json_encode($output[0]['data']) );
        } else if ($verbose && count($output) > 1 ){
            die( json_encode($output) );
        } else if ($verbose == false && count($output) == 1) {
            die( json_encode($output[0]) );
        } else {
            die( json_encode($output) );
        }
    }

    function process_request($connection, $request, &$output=NULL) {
        $output = $output == NULL ? array() : $output;
        if (isset($request['queryType'])) {
            $tableName = $request['tableName'];
            $qb = new QueryBuilder($connection, $tableName);
            $queryType = $request['queryType'];
            $request['param'] = isset($request['param']) ? $request['param'] : NULL;
            $qb->{$queryType}($request['param']);
            $qb->execute();
            array_push($output, $qb->get_output());
        } else {
            foreach($request as $value) {
                process_request($value, $output);
            }
        }
    }
    
