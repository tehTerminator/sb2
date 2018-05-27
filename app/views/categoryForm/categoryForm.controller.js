app.directive('categoryForm', function() {
    return {
        restrict:'E', 
        templateUrl:'app/views/categoryForm/categoryForm.html', 
        controller:'CategoryFormController', 
    }
})

.controller('CategoryFormController', function($scope, MySqlService) {
    $scope.category =  {
        'title':'', 
        'sgstRate':0, 
        'cgstRate':0, 
        'igstRate':0, 
    }; 

    $scope.save = function() {
        const categoryData =  {
            'title':$scope.category.title, 
            'sgstRate':$scope.category.sgstRate, 
            'cgstRate':$scope.category.cgstRate, 
            'igstRate':$scope.category.igstRate, 
        }; 

        if (typeof showIdField != 'undefined' && showIdField == true) {
            MySqlService.update('categories',  {
                userData:categoryData, 
                andWhere: {'id':$scope.category.id }
            })
            .then(function (response) {
                $scope.category =  {
                    'title':'', 
                    'sgstRate':0, 
                    'cgstRate':0, 
                    'igstRate':0, 
                }; 
            })
        }else {
            MySqlService.insert('categories',  {
                userData:categoryData
            })
            .then(function (response) {
                $scope.category =  {
                    'title':'', 
                    'sgstRate':0, 
                    'cgstRate':0, 
                    'igstRate':0, 
                }; 
            }); 
        }
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
}); 