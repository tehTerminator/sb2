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
    $scope.total = {
        tax : 0,
        amountWithoutTax : 0,
        amountWithTax : 0
    };

    $scope.retrieveFromServer = function(){
        const request = {
            andWhere : { invoiceId : $scope.invoiceId }
        }
        MySqlService.select('transactions', request)
        .then(function(response){
            if( response.status === 200 ){
                if( response.data[0]['rowCount'] > 0 ){
                    let res = response.data[0]['rows'];
                    res.foreach(function(transaction){
                       $scope.pushTransaction(transaction)
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
    };

    $scope.pushTransaction = function(transaction, taxIncluded) {
        transaction.productName = ProductService.getProductById( transaction.productId );
        let amountWithTax = transaction.quantity * transaction.rate;
        let amountWithoutTax = 0;

        transaction.sgstAmount = ( amountWithTax * 100 ) / (100 + transaction.sgstRate);
        transaction.cgstAmount = ( amountWithTax * 100 ) / (100 + transaction.cgstRate);
        transaction.igstAmount = ( amountWithTax * 100 ) / (100 + transaction.igstRate);

        transcation.totalTax = transaction.sgstAmount + transaction.cgstAmount + transaction.igstAmount;
        amountWithoutTax = amountWithTax - transaction.totalTax;

        $scope.total.tax += transaction.totalTax;
        $scope.total.amountWithoutTax += amountWithoutTax;
        $scope.total.amountWithTax += transaction.amountWithTax;

        $scope.transactions.push(trasaction);
    };

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
        $scope.pushTransaction(arg.data);
    });

    $scope.reset = function(){
        $scope.transactions = [];
        $scope.total = {
            tax : 0,
            amountWithoutTax : 0,
            amountWithTax : 0
        };
    }
});