app.directive('createTransaction', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/createTransaction/createTransaction.html',
        controller: 'CreateTransactionController',
    };
})
.controller('CreateTransactionController', function($scope, ProductService, CategoryService, CompanyService){  
    $scope.saveInvoice = () => {
        $scope.$emit('Save Invoice');
    }
})