app.controller('ProductsPageController', function($scope){
    //Receive Product from Child Table
    $scope.$on('Product Selected', function(e, arg){
        //Send Product to Child Form
        $scope.$broadcast('Set Product', {data: arg.data});
        console.log("Product Selected");
    });
});