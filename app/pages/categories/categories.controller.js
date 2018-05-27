app.controller('CategoryPageController', function($scope){
    //Receive Category from Child Table
    $scope.$on('Category Selected', function(e, arg){
        //Send Category to Child Form
        $scope.$broadcast('Set Category', arg);
        console.log("Category Selected");
    });
});