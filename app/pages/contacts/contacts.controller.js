app.controller('ContactsPageController', function($scope){
    //Receive Contact from Child Table
    $scope.$on('Contact Selected', function(e, arg){
        //Send Contact to Child Form
        $scope.$broadcast('Set Contact', {data: arg.data});
        console.log("Contact Selected");
    });
});