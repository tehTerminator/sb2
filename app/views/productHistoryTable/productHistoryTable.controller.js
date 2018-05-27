app
    .directive('productHistoryTable', function () {
        return {
            restrict    : 'E',
            templateUrl : 'app/views/productHistoryTable/productHistoryTable.html',
            controller  : 'ProductHistoryTableController',
        };
    })
    .controller('ProductHistoryTableController', function ($scope, ProductService) {
        $scope.productHistory = {
            'sales'     : [],
            'purchases' : []
        };

        $scope.$on('GetProductHistory', function (e, arg) {
            let productId = arg.productId;
            ProductService
                .getProductHistory(productId)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        let data = response.data[0].rows;
                        $scope.productHistory['sales']      = data.filter(e => e.invoiceType == 1);
                        $scope.productHistory['purchases']  = data.filter(e => e.invoiceType == 0);
                    }
                });
        });
    });