app.directive('transactionTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/transactionTable/transactionTable.html',
        controller : 'TransactionTableController',
    };
})
.controller('TransactionTableController', function($scope, MySqlService, ProductService){
    $scope.transactions = [];
    $scope.total = {
        tax : 0,
        amountWithoutTax : 0,
        amountWithTax : 0
    };

    $scope.$on('Push Transaction', function (e, arg) {
        $scope.pushTransaction(arg);
    });

    $scope.$on('Retrieve Transactions', (e, arg) => {
        $scope.retrieveFromServer(arg.id);
    })

    $scope.retrieveFromServer = function(id) {
        MySqlService
            .select('transactions', {
                andWhere: {invoiceId: id}
            })
            .then((res) => {
                if (res.status === 200) {
                    let data = res.data[0].rows;
                    data.forEach(function (item) {
                        $scope.pushTransaction(item);
                    });
                }
            });
    }

    $scope.$on('Save Transactions', function (e, arg) {
        let invoiceId = arg.data;
        $scope.transactions.forEach(function (t) {
            const req = {
                'userData': {
                    'invoiceId': invoiceId,
                    'productId': t.productId,
                    'quantity': t.quantity,
                    'rate': t.rate,
                    'sgstRate': t.sgstRate,
                    'cgstRate': t.cgstRate,
                    'igstRate': t.igstRate
                }
            };
            MySqlService
                .insert('transactions', req)
                .then((res) => { console.log(res); })
                .then(() => { $location.url('/print/' + invoiceId); });
        })
    })

    $scope.deleteTransaction = function(transaction){
        if (confirm("Do you wish to delete Transaction #" + transaction.id)) {
            $scope.$emit("Delete Transaction", { data: transaction });
            let index = $scope.transactions.indexOf(transaction);
            $scope.transactions.splice(index, 1);

            $scope.total.amountWithoutTax = $scope.total.amountWithoutTax - transaction.amountWithTax + transaction.totalTax;
            $scope.total.amountWithTax -= transaction.amountWithTax;
            $scope.total.tax -= transaction.totalTax;
        }
    };

    $scope.reset = function(){
        $scope.transactions = [];
        $scope.total = {
            tax : 0,
            amountWithoutTax : 0,
            amountWithTax : 0
        };
    }

    $scope.pushTransaction = function (transaction) {
        let amountWithoutTax = 0;
        let output = {
            'transaction': {},
        };

        transaction.productName = ProductService.getProductById(transaction.productId)['title'];
        transaction.amountWithTax = transaction.quantity * transaction.rate;
        transaction.unit = ProductService.getProductById(transaction.productId)['unit'];
        
        transaction.sgstAmount = $scope.getTaxAmount(transaction.amountWithTax, transaction.sgstRate);
        transaction.cgstAmount = $scope.getTaxAmount(transaction.amountWithTax, transaction.cgstRate);
        transaction.igstAmount = $scope.getTaxAmount(transaction.amountWithTax, transaction.igstRate);
        
        transaction.totalTax = transaction.sgstAmount + transaction.cgstAmount + transaction.igstAmount;
        amountWithoutTax = transaction.amountWithTax - transaction.totalTax;
        
        $scope.total.tax += transaction.totalTax;
        $scope.total.amountWithoutTax += amountWithoutTax;
        $scope.total.amountWithTax += transaction.amountWithTax;
        $scope.transactions.push(transaction);
    };

    $scope.getTaxAmount = function (amountWithoutTax, taxRate) {
        let y = Number(amountWithoutTax);
        let r = Number(taxRate);
        let x = 0;
        x = (y * r) / (100 + r);
        return Math.round(x);
    }
});