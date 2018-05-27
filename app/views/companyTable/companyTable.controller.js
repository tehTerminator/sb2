app.directive('companyTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/companyTable/companyTable.html',
        controller : 'CompanyTableController',
        scope : {
            searchText: '=',
            pageLength : '=',
            pageIndex : '='
        }
    };
})
.controller('CompanyTableController', function($scope, MySqlService) {
    $scope.companies = [];
   
    $scope.refreshData = function(){
        MySqlService.select('companies')
        .then(function(response){
            if( response.status === 200 ){
                let res = response.data[0];
                $scope.companies = res['rows'];
            } else {
                $scope.companies = [];
            }
        }).then(function(){
            $scope.$emit("DataLoaded", {data: $scope.companies.length});
        })

    };

    $scope.$on('Refresh Data', function(e, arg){
        $scope.refreshData();
    })

    $scope.select = function(company){
        $scope.$emit('Company Selected', {data: company});
    };
})