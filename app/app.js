const app = angular.module('simpleBillingApp', ['ngRoute']);

app.directive('appRoot', function(){
    return {
        'restrict'      : 'E',
        'templateUrl'   : 'app/app.component.html',
        'controller'    : 'MainController'
    }
})

.controller('MainController', function($scope, $location, UserService){
    $scope.title = "Simple Billing App";

    $scope.authUser = function(){
        if( UserService.isLoggedIn() ){
            $location.url('/home');
        } else {
            $location.url('/login');
        }
    }

    $scope.$on('$routeChangeStart', function(event,current,previous) {
        if( !UserService.isLoggedIn() ){
            $location.url('/login');
        }
    });
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
    .when('/invoice', {
        templateUrl : 'app/pages/invoice/invoice.html'
    })
    .when('/contacts', {
        templateUrl : 'app/pages/contacts/contacts.html',
        controller  : 'ContactsPageController'
    })
    .when('/login', {
        templateUrl : 'app/pages/login/login.html',
        controller  : 'LoginPageController'
    })
    .otherwise({
        redirectTo: 'home'
    });

    $locationProvider.html5Mode(true);
});

