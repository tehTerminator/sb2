app.directive('transactionForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/transactionForm/transactionForm.html',
        controller: 'TransactionFormController',
    }
})
.controller('TransactionFormController', function($scope, $rootScope, CategoryService, ProductService){
    $scope.product = {};
    $scope.rate = 0;
    $scope.quantity = 0;

    $scope.init = function(){
        jQuery(".ui.search").search({
            type: 'category',
            source: ProductService.getProducts(),
            onSelect: (result, response) => {
                $scope.selectProduct(result);
            }
        });
    };

    $scope.selectProduct = function (product) {
        Object.assign($scope.product, product);
        $rootScope.$broadcast('GetProductHistory', {productId: product.id});
    };

    $scope.addTransaction = function () {
        let category = CategoryService.getCategoryById($scope.product.categoryId);
        let transaction = {
            'productId': $scope.product.id,
            'quantity': $scope.quantity,
            'rate': $scope.rate,
            'sgstRate': category.sgstRate,
            'cgstRate': category.cgstRate,
            'igstRate': category.igstRate
        };
        $rootScope.$broadcast('Push Transaction', transaction);
    }

    $scope.init();
})