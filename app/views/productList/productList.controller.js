app.controller('ProductListController', function($scope, ProductService){
    $scope.products = ProductService.getProductList();
    
    $scope.selectProduct = function(product){
        $emit('ProductSelected', {data: product});
    }
})