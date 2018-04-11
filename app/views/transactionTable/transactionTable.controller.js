app.directive('transactionTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/transactionTable/transactionTable.html',
        controller : 'TransactionTableController',
        scope : {
            showButtons : '=',
            invoiceId : '@',
        }
    };
})
.controller('TransactionTableController', function($scope, ProductService,  MySqlService){
    $scope.transactions = [];

    $scope.init = function(){
        const request = {
            andWhere : { invoiceId : $scope.invoiceId }
        }
        MySqlService.select('transactions', request)
        .then(function(response){
            if( response.status === 200 ){
                if( response.data[0]['rowCount'] > 0 ){
                    let res = response.data[0]['rows'];
                    res.foreach(function(transaction){
                        transaction.productName = ProductService.getProductById( transaction.productId );
                        $scope.transactions.push(trasaction);
                    });
                } else {
                    $scope.transactions = [];
                }
            } else {
                $scope.transactions = [];
            }
        });
    };

    $scope.$on('RetrieveTransactions', function(e, arg){
        $scope.init();
    });

    $scope.selectTransaction = function(transaction){
        $scope.$emit('TransactionSelected', {data: transaction});
    }

    $scope.deleteTransaction = function(transaction){
        if (confirm("Do you wish to delete Transaction #" + transaction.id)) {
            MySqlService.delete('transactions', {
                andWhere : { id: transaction.id }
            })
            .then(function(response){
                if( response.status === 200 ){
                    if( response.data[0]['rowCount'] === 1){
                        let index = $scope.transactions.indexOf(transaction);
                        $scope.transactions.splice(index, 1);
                    } else {
                        console.log("Error Occured", response);
                    }
                }
            });
        }
    };

    $scope.$on('PushTransaction', function(e, arg){
        $scope.transactions.push(arg.data);
    });
})