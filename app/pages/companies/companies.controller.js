app.controller('CompanyPageController', function($scope){
    //Receive Company from Child Table
    $scope.$on('Company Selected', function(e, arg){
        //Send Company to Child Form
        $scope.$broadcast('Set Company', arg);
        console.log("Company Selected");
    });
});