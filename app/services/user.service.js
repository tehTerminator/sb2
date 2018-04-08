app.factory('UserService', function(MySqlService){
    const userService = {
        allUsers : [],
        currentUser : {}
    };
    
    userService.getAllUsers = function(){
        MySqlService.select('users', {
            'columns' : ['id', 'name']
        }).then(function(response){
            userService.allUsers = response;
        });
    }

    userService.tryToLogIn = function(username, password){
        return MySqlService.select('users', {
            'columns' : ['id', 'fullName', 'authLevel'],
            'andWhere' : {'username': username, 'password': password}
        });
    }

    userService.setUser = function(user){
        userService.currentUser = user;
    }

    userService.isLoggedIn = function(){
        return ( userService.currentUser.authLevel !== undefined && userService.currentUser.authLevel >= 0)
    }

    userService.getUserName = function(){
        if( userService.currentUser == {} || userService.currentUser.fullName == undefined ){
            return 'Anonymous';
        } else {
            return userService.currentUser.fullName;
        }
    }

    userService.getAuthLevel = function(){
        if( userService.currentUser.getAuthLevel === undefined ){
            return -1;
        } else {
            return userService.currentUser.authLevel;
        }
    }

    userService.getUserById = function(userId) {
        return userService.allUsers.find( user => user.id === userId );
    }
    
    return userService;
});