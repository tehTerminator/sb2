app.directive('createTransaction', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/createTransaction/createTransaction.html',
        controller: 'CreateTransactionController',
    };
})
.controller('CreateTransactionController', function($scope, ProductService, CategoryService){
    $scope.products = [];
    $scope.category = {};
    $scope.company = {};
    $scope.transaction = {
        product : {},
        quantity : 0,
        rate: 0,
        sgstRate:0,
        cgstRate:0,
        igstRate:0
    };

    $scope.initCheckbox = function() {
        jQuery(".ui.checkbox").checkbox();
    };

    $scope.initDropdown = function() {
        jQuery(".ui.dropdown").dropdown();
    };

    $scope.getProducts = function(){
        ProductService.retrieveProducts();
        CategoryService.retrieveCategories();
        products = ProductService.getProducts();
    };

    $scope.setCategory = function(product){
        $scope.category = CategoryService.getCategoryById(product.categoryId);
        $scope.transaction.sgstRate = $scope.category.sgstRate;
        $scope.transaction.cgstRate = $scope.category.cgstRate;
        $scope.transaction.igstRate = $scope.category.igstRate;
    };
})