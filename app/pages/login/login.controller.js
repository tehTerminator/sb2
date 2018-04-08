app.controller('LoginPageController', function($scope, $location, UserService) {
    $scope.user = {
        username: "",
        password: "",
        authLevel: -1
    };

    $scope.tryToLogIn = function() {
        UserService
        .tryToLogIn($scope.user.username, $scope.user.password)
        .then(function(response){
            if( response.status === 200 ){
                //Success
                const res = response.data[0];
                if( res.rowCount === 1 ){
                    const user = res.rows[0];
                    user.loggedIn = true;
                    UserService.setUser( user );
                    $location.url(['home']);
                } else {
                    alert("Invalid Username Or Password");
                }
            } else {
                alert("Unable to Connect to Server");
            }
        });
    };

    $scope.reset = function(){
        $scope.user = {
            username: "",
            password: "",
            authLevel: -1
        };
    }
});