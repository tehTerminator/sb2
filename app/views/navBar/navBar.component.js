app
.directive('navBar', function(){
    return {
        restrict: 'A',
        templateUrl: 'app/views/navBar/navBar.component.html',
        controller: 'NavigationController'
    }
})
.controller('NavigationController', function($scope, $location, UserService){
    $scope.user = {
        name: "Anonymous"
    };

    $scope.init = function(){
        jQuery(".ui.dropdown").dropdown();
    }

    $scope.init();
});