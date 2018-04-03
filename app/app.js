const app = angular.module('simpleBillingApp', ['ngRoute']);

app.directive('appRoot', function(){
    return {
        'restrict' : 'E',
        'template' : '{{title}}'
    }
})
.controller('MainController', function($scope){
    $scope.title = "Simple Billing App"
})
