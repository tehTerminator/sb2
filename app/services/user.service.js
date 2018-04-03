app.factory('UserService', function(MySqlService){
    const userService = {
        allUser : [],
        currentUser : {}
    };
    
    userService.getAllUsers = function(){
        MySqlService.select('users', {
            'columns' : ['id', 'name']
        }).then(function(response){
            userService.allUsers = response;
        });
    }

    userService.tryLogIn = function(username, password, success, failure){
        MySqlService.select('users', {
            'columns' : ['id', 'name', 'authLevel'],
            'andWhere' : {'name': username, 'password': password}
        }).then(function(response){
            if( response.length == 1 ){
                userService.currentUser = response[0];
                success();
            } else {
                failure();
            }
        })
    }

    userService.isLoggedIn = function(){
        return userService.currentUser == {};
    }

    userService.getUserName = function(){
        if( userService.currentUser == {} || userService.currentUser.name == undefined ){
            return 'Anonymous';
        } else {
            return userService.currentUser.name;
        }
    }

    userService.getAuthLevel = function(){
        if( userService.currentUser == {} || userService.currentUser.getAuthLevel == undefined ){
            return -1;
        } else {
            return userService.currentUser.authLevel;
        }
    }

    return userService;
});