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

    $scope.save = function () {
        const req = {
            'userData': {
                'title': $scope.company.name,
                'description': $scope.company.description
            }
        };

        let shouldInsert = Number($scope.company.id) === 0;
        let method = "update";

        if (shouldInsert) {
            method = "insert";
        } else {
            req.andWhere = { id: $scope.company.id };
        }

        MySqlService
                [method]('companies', req)
                .then($scope.reset());
    };

    $scope.setCompany = (company) => {
        company.id = Number(company.id);
        Object.assign($scope.company, company);
    }

    $scope.$on('Set Company', function(e, arg){
        $scope.setCompany(arg.data);
    });

    $scope.reset = () => {
        $scope.company = {
            'id' : 0,
            'title' : '',
            'description' : '',
        };
    }
});