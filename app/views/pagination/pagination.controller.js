app
.directive('pagination', function() {
    return {
        restrict    : 'E',
        templateUrl : 'app/views/pagination/pagination.html',
        controller  : 'PaginationController',
        transclude  : true,
    }
})
.controller('PaginationController', function($scope) {
    $scope.currentPage  = 0;
    $scope.pageLength   = 5;
    $scope.totalPages   = 0;
    $scope.pageSizes    = [5, 10, 15, 20, 25, 50];
    $scope.pageArray    = [];
    $scope.lastActivePage = 0;
    $scope.totalItems = 0;
    $scope.searchText = "";
    
    $scope.$on('DataLoaded', function(event, args) {
        var totalItems = args.data;
        $scope.initialize( totalItems );
    });

    $scope.requestData = function() {
        $scope.$broadcast('Refresh Data');
    }

    $scope.initialize = function(totalItems) {
        console.log("Initialize", totalItems);
        $scope.totalItems = totalItems;
        $scope.totalPages = Math.ceil(totalItems / $scope.pageLength);
        $scope.pageArray = [];
        for(var i=1; i<=$scope.totalPages; i++) {
            $scope.pageArray.push(i);
        }
        jQuery(".ui.dropdown").dropdown();
    }

    $scope.firstPage = function() {
        $scope.currentPage = 0;
    }

    $scope.prevPage = function() {
        if( $scope.currentPage > 0 ) {
            $scope.currentPage--;
        }
    }

    $scope.isFirst = function() {
        return $scope.currentPage == 0;
    }

    $scope.nextPage = function() {
        if( $scope.currentPage < $scope.pageArray.length - 1 ) {
            $scope.currentPage++;
        }
    }

    $scope.isLast = function() {
        return $scope.currentPage == $scope.pageArray.length - 1;
    }

    $scope.lastPage = function() {
        $scope.currentPage = $scope.pageArray.length - 1;
    }

    $scope.setPageLength = function( length ) {
        $scope.pageLength = length;
        $scope.initialize( $scope.totalItems );
    }

    $scope.setPage = function(i) {
        if( i > 0 && i < $scope.totalPages - 1)
            $scope.currentPage = i - 1;
        else
            $scope.setPage(1);
    }

    $scope.resetPage = function() {
        if( $scope.searchText.length > 1) {
            $scope.firstPage();
        } if( $scope.searchText.length == 1) {
            $scope.lastActivePage = $scope.currentPage;
            $scope.firstPage();
        } 
        else{
            $scope.setPage($scope.lastActivePage);
        }
    }

    $scope.initDropdown = function(){
        jQuery(".ui.dropdown").dropdown();
    }
})

.filter('pagination', function() {
    return function(data, itemCount, pageIndex) {
        let startIndex = itemCount * pageIndex;
        let endCount = startIndex + itemCount;
        return data.slice(startIndex, endCount);
    };
});