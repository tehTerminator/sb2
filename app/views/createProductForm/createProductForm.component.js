app.directive('createProductForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/createProductForm/createProductForm.component.html',
        controller: 'CreateProductFormController'
    }
})

.controller('CreateProductFormController', function($scope, MySqlService, CategoryService, CompanyService){
    $scope.product = {
        'name' : '',
        'desciption' : '',
        'category' : 0,
        'company' : '',
        'unit' : ''
    };

    $scope.saveProduct = function(){
        MySqlService.insert('products', {
            'userData' : $scope.product
        })
        .then(function(response){
            
        })
    }


})