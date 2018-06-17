app.directive('productsTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/productTable/productTable.html',
        controller : 'ProductTableController',
        scope : {
            searchText: '=',
            pageLength : '=',
            pageIndex : '='
        }
    };
})
.controller('ProductTableController', function($scope, MySqlService, CategoryService, CompanyService) {
    $scope.products = [];
   
    $scope.refreshData = function () {
        $scope.products = [];
        MySqlService.select('products')
        .then(function(response){
            if( response.status === 200 ){
                let res = response.data[0]['rows'];
                res.forEach(function (product) {
                    product.category = CategoryService.getCategoryById(product.categoryId)['title'];
                    product.company = CompanyService.getCompanyById(product.companyId)['title'];
                    $scope.products.push(product);
                })
            } else {
                $scope.products = [];
            }
        }).then(function(){
            $scope.$emit("DataLoaded", {data: $scope.products.length});
        })

    };

    $scope.$on('Refresh Data', function(e, arg){
        $scope.refreshData();
    })

    $scope.select = function(product){
        $scope.$emit('Product Selected', {data: product});
    };
})