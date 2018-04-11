app.controller('InvoiceController', function($scope, $routeParams, MySqlService) {
    $scope.selected = {
        'contact' : {},
        'product' : {},
        'invoice' : {},
        'transaction' : {},
    };
    
    $scope.step = 0;

    $scope.products = ProductService.getAllProducts();


    $scope.$on('ContactSelected', function(e, arg){
        $scope.selected.contact = arg.data;
        $scope.step++;
    });

    $scope.$on('ProductSelected', function(e, arg){});
    
})