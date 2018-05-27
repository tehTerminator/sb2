app.directive('categoryTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/categoryTable/categoryTable.html',
        controller : 'CategoryTableController',
        scope : {
            searchText: '=',
            pageLength : '=',
            pageIndex : '='
        }
    };
})
.controller('CategoryTableController', function($scope, MySqlService) {
    $scope.categories = [];
   
    $scope.refreshData = function(){
        MySqlService.select('categories')
        .then(function(response){
            if( response.status === 200 ){
                let res = response.data[0];
                $scope.categories = res['rows'];
            } else {
                $scope.categories = [];
            }
        }).then(function(){
            $scope.$emit("DataLoaded", {data: $scope.categories.length});
        })

    };

    $scope.$on('Refresh Data', function(e, arg){
        $scope.refreshData();
    })

    $scope.select = function(category){
        $scope.$emit('Category Selected', {data: category});
    };
})