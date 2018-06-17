app.directive('categoryForm', function() {
    return {
        restrict:'E', 
        templateUrl:'app/views/categoryForm/categoryForm.html', 
        controller:'CategoryFormController', 
    }
})

.controller('CategoryFormController', function($scope, MySqlService) {
    $scope.category = {
        'id': 0,
        'title':'', 
        'sgstRate':0, 
        'cgstRate':0, 
        'igstRate':0, 
    }; 

    $scope.save = function() {
        const req = {
            userData: {
                'title':$scope.category.title, 
                'sgstRate':$scope.category.sgstRate, 
                'cgstRate':$scope.category.cgstRate, 
                'igstRate':$scope.category.igstRate, 
            }
        }; 

        let shouldInsert = Number($scope.category.id) === 0;
        let method = "update";

        if (shouldInsert) {
            method = "insert";
        } else {
            req.andWhere = { 'id': $scope.category.id };
        }
        
        MySqlService
            [method]('categories', req)
            .then( $scope.reset() );
    }; 

    $scope.setCategory = (category) => {
        category.id = Number(category.id);
        category.sgstRate = Number(category.sgstRate);
        category.cgstRate = Number(category.cgstRate);
        category.igstRate = Number(category.igstRate);
        Object.assign($scope.category, category);
    }

    $scope.$on('Set Category', function (e, arg) {
        $scope.setCategory(arg.data);
    });

    $scope.reset = () => {
        $scope.category = {
            'id': 0,
            'title':'', 
            'sgstRate':0, 
            'cgstRate':0, 
            'igstRate':0, 
        }; 
    }
}); 