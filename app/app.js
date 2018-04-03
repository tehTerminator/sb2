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
