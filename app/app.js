const app = angular.module('simpleBillingApp', ['ngRoute']);

app.directive('appRoot', function(){
    return {
        'restrict'      : 'E',
        'templateUrl'   : 'app/app.component.html',
        'controller'    : 'MainController'
    }
})

.controller('MainController', function($scope, UserService){
    $scope.title = "Simple Billing App";
})

.config(function($routeProvider, $locationProvider){
    $routeProvider

    .when('/home', {
        templateUrl : 'app/pages/home/home.html',
        controller  : 'HomeController'
    })
    .when('/store', {
        templateUrl : 'app/pages/store/store.html',
        controller  : 'StoreController'
    })
    .otherwise({
        redirectTo: 'home'
    });

    $locationProvider.html5Mode(true);
});

