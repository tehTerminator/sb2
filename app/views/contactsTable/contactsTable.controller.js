app.directive('contactsTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/contactsTable/contactsTable.html',
        controller : 'ContactsTableController',
        scope : {
            searchText: '=',
            pageLength : '=',
            pageIndex : '='
        }
    };
})
.controller('ContactsTableController', function($scope, MySqlService) {
    $scope.contacts = [];
   
    $scope.refreshData = function(){
        MySqlService.select('contacts')
        .then(function(response){
            if( response.status === 200 ){
                let res = response.data[0];
                $scope.contacts = res['rows'];
            } else {
                $scope.contacts = [];
            }
        }).then(function(){
            $scope.$emit("DataLoaded", {data: $scope.contacts.length});
        })

    };

    $scope.$on('Refresh Data', function(e, arg){
        $scope.refreshData();
    })

    $scope.select = function(contact){
        $scope.$emit('Contact Selected', {data: contact});
    };
})