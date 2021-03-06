app.directive('productForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/productForm/productForm.html',
        controller: 'ProductFormController',
    }
})

.controller('ProductFormController', function($scope, $timeout, MySqlService, CategoryService, CompanyService){
    $scope.product = {
        'id': 0,
        'title' : '',
        'description' : '',
        'categoryId' : 0,
        'companyId' : '',
        'unit' : ''
    };

    $scope.categories = CategoryService.getCategories();
    $scope.companies = CompanyService.getCompanies();

    $scope.save = function(){
        const req = {
            userData: {
                'title': $scope.product.title,
                'description': $scope.product.description,
                'categoryId': $scope.product.category.id,
                'companyId': $scope.product.company.id,
                'unit': $scope.product.unit
            }
        };

        let shouldInsert = Number($scope.product.id) === 0;
        let method = "update";

        if (shouldInsert) {
            method = "insert";
        } else {
            req.andWhere = { 'id': $scope.product.id };
        }
        
        MySqlService
            [method]('products', req)
            .then(function (res) {
                console.log(res);
                $scope.reset();
            });
    };
    
    $scope.setProduct = function(product){
        product.id = Number(product.id);
        product.categoryId = Number(product.categoryId);
        product.companyId = Number(product.companyId);
        Object.assign($scope.product, product);
        $timeout(() => {
            jQuery("#companyField .ui.dropdown").dropdown('set selected', product.companyId);
            jQuery("#categoryField .ui.dropdown").dropdown('set selected', product.categoryId);
            jQuery("#unitField .ui.dropdown").dropdown('set selected', product.unit)
        }, 500);
    };

    $scope.$on('Set Product', function(e, arg){
        $scope.setProduct(arg.data);
    });

    $scope.initDropdown = () => {
        jQuery(".ui.dropdown").dropdown();
    };

    $scope.reset = () => {
        $scope.product = {
            'title': '',
            'description': '',
            'categoryId': 0,
            'companyId': '',
            'unit': ''
        };
    }
});