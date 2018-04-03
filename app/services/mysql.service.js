app.factory('MySqlService', function($http){
    const mySql = {};
    
    mySql['createRequest'] = function(queryType, tableName, additionalParams){
        const serverLink = "php/sql.php";
        const request = {
            'queryType' : queryType,
            'tableName' : tableName,
            'verbose'   : false
        };

        if( additionalParams !== undefined || additionalParams !== null ){
            request['param'] = additionalParams;
        }

        return $http.post(serverLink, request);
    }

    mySql['select'] = function(tableName, additionalParams){
        return mySql.createRequest('select', tableName, additionalParams);
    }

    mySql['insert'] = function(tableName, additionalParams){
        return mySql.createRequest('insert', tableName, additionalParams);
    }

    mySql['update'] = function(tableName, additionalParams){
        return mySql.createRequest('update', tableName, additionalParams);
    }

    mySql['delete'] = function(tableName, additionalParams){
        return mySql.createRequest('delete', tableName, additionalParams);
    }

    return mySql;
});