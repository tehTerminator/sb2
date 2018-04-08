app.directive('categoryForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/categoryForm/categoryForm.html',
        controller: 'CategoryFormController',
        scope       : { 
            'formHeading'   : '@',
            'showIdField'   : '='
        }
    }
})

.controller('CategoryFormController', function($scope, MySqlService){
    $scope.category = {
        'name' : '',
        'sgstRate' : 0,
        'cgstRate' : 0,
        'igstRate' : 0,
    };

    $scope.save = function(){
        const categoryData = {
            'name' : '',
            'sgstRate' : $scope.category.sgstRate,
            'cgstRate' : $scope.category.cgstRate,
            'igstRate' : $scope.category.igstRate,
        };

        if( showIdField ){
            MySqlService.update('categories', {
                userData : categoryData,
                andWhere : { 'id' : $scope.category.id }
            })
            .then(function(response){
                console.log(response);
            })
        } else {
            MySqlService.insert('categories', {
                userData : categoryData
            })
            .then(function(response){
                console.log(response);
            });
        }
    };
});