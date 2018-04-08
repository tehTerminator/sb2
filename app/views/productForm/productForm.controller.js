app.directive('productForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/productForm/productForm.html',
        controller: 'ProductFormController',
        scope       : { 
            'formHeading'   : '@',
            'showIdField'   : '='
        }
    }
})

.controller('ProductFormController', function($scope, MySqlService, CategoryService, CompanyService){
    $scope.product = {
        'name' : '',
        'desciption' : '',
        'categoryId' : 0,
        'companyId' : '',
        'unit' : ''
    };

    $scope.categories = CategoryService.getCategories();
    $scope.companies = CompanyService.getCompanies();

    $scope.save = function(){
        const productData = {
            'name' : $scope.product.name,
            'descrition' : $scope.product.descrition,
            'categoryId' : $scope.product.categoryId,
            'companyId' : $scope.product.companyId,
            'unit' : $scope.product.unit
        };

        if( showIdField ){
            MySqlService.update('product', {
                userData : productData,
                andWhere : { 'id' : $scope.product.id }
            })
            .then(function(response){
                console.log(response);
            })
        } else {
            MySqlService.insert('product', {
                userData : productData
            })
            .then(function(response){
                console.log(response);
            });
        }
    };
});