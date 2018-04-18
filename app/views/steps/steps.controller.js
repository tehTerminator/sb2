app.directive('step', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/steps/steps.html',
        controller: 'StepController',
        transclude: true,
        scope: false
    }
})
.controller('StepController', function($scope){
    $scope.tabIndex = 1;
    $scope.index = 1;

    $scope.setTab = function(i){
        $scope.tabIndex = i;
    }

    $scope.gain = function(){
        const max = 3;
        if( $scope.tabIndex < max ){
            $scope.tabIndex++;
        }
    };

    $scope.fall = function(){
        const min = 1;
        if( $scope.tabIndex > fall ){
            $scope.tabIndex--;
        }
    };

    $scope.getClass = function(index){
        if( index === $scope.tabIndex ){
            return 'active';
        } else if( index < $scope.tabIndex ) {
            return 'completed';
        } else if( index > $scope.tabIndex ) {
            return 'disabled';
        }
    };

    $scope.isActive = function(index) {
        return index === $scope.tabIndex;
    };

    $scope.$on('Gain', function(e, arg){
        $scope.gain();
    });

    $scope.$on('Fall', function(e, arg){
        $scope.fall();
    });
});