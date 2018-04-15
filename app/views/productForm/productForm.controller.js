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
        'description' : '',
        'categoryId' : 0,
        'companyId' : '',
        'unit' : ''
    };

    $scope.save = function(){
        const productData = {
            'name' : $scope.product.name,
            'description' : $scope.product.description,
            'categoryId' : $scope.product.category.id,
            'companyId' : $scope.product.company.id,
            'unit' : $scope.product.unit
        };

        if( typeof showIdField !== 'undefined' && showIdField == true ){
            MySqlService.update('products', {
                userData : productData,
                andWhere : { 'id' : $scope.product.id }
            })
            .then(function(response){
                $scope.product = {
                    'name' : '',
                    'description' : '',
                    'categoryId' : 0,
                    'companyId' : '',
                    'unit' : ''
                };
            })
        } else {
            MySqlService.insert('products', {
                userData : productData
            })
            .then(function(response){
                $scope.product = {
                    'name' : '',
                    'description' : '',
                    'categoryId' : 0,
                    'companyId' : '',
                    'unit' : ''
                };
            });
        }
    };
    
    $scope.getData = function() {
        CategoryService.retrieveCategories();
        CompanyService.retrieveCompanies();
        $scope.categories = CategoryService.getCategories();
        $scope.companies = CompanyService.getCompanies(); 
    };

    $scope.initDropdown = function() {
        jQuery(".ui.dropdown").dropdown();
    }
});