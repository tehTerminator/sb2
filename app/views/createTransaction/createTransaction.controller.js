app.directive('createTransaction', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/createTransaction/createTransaction.html',
        controller: 'CreateTransactionController',
    };
})
.controller('CreateTransactionController', function($scope){
    $scope.initCheckbox = function() {
        jQuery(".ui.checkbox").checkbox();
    }

    $scope.initDropdown = function() {
        jQuery(".ui.dropdown").dropdown();
    }
})