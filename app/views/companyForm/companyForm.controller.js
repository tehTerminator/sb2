app
.directive('companyForm', function(){
    return {
        restrict    : 'E',
        templateUrl : 'app/views/companyForm/companyForm.html',
        controller  : 'CompanyFormController',
        scope       : { 
            'formHeading'   : '@',
            'showIdField'   : '='
        }
    };
})
.controller('CompanyFormController', function($scope, MySqlService){
    $scope.company = {
        'id' : 0,
        'name' : '',
        'description' : '',
    };

    $scope.save = function() {
        if ($scope.showIdField === true) {
            MySqlService.update('companies', {
                userData : {
                    'name' : $scope.company.name,
                    'description' : $scope.company.description,
                },
                andWhere : {
                    'id' : $scope.company.id
                }
            })
            .then(function(response) {
                console.log( response );
            });
        } else if ($scope.showIdField === false) {
            MySqlService.insert('companies', {
                userData : {
                    'name' : $scope.company.name,
                    'description' : $scope.company.description,
                }
            })
            .then(function(response) {
                console.log(response);
            })
        }
    };
});