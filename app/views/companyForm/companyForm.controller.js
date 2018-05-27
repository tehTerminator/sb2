app
.directive('companyForm', function(){
    return {
        restrict    : 'E',
        templateUrl : 'app/views/companyForm/companyForm.html',
        controller  : 'CompanyFormController',
    };
})
.controller('CompanyFormController', function($scope, MySqlService){
    $scope.company = {
        'id' : 0,
        'title' : '',
        'description' : '',
    };

    $scope.save = function() {
        if ($scope.showIdField === true) {
            MySqlService.update('companies', {
                userData : {
                    'title' : $scope.company.name,
                    'description' : $scope.company.description,
                },
                andWhere : {
                    'id' : $scope.company.id
                }
            })
            .then(function(response) {
                $scope.company = {
                    'id' : 0,
                    'title' : '',
                    'description' : '',
                };
            });
        } else if ($scope.showIdField === false) {
            MySqlService.insert('companies', {
                userData : {
                    'title' : $scope.company.name,
                    'description' : $scope.company.description,
                }
            })
            .then(function(response) {
                $scope.company = {
                    'id' : 0,
                    'title' : '',
                    'description' : '',
                };
            })
        }
    };

    $scope.setCompany = (company) => {
        company.id = Number(company.id);
        Object.assign($scope.company, company);
    }

    $scope.$on('Set Company', function(e, arg){
        $scope.setCompany(arg.data);
    });
});