app.directive('invoiceTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/invoiceTable/invoiceTable.html',
        controller : 'InvoiceTableController',
        scope : {
            searchText: '=',
            pageLength : '=',
            pageIndex : '='
        }
    };
})
.controller('InvoiceTableController', function($scope, MySqlService, UserService) {
    $scope.invoices = [];
    $scope.refreshData = function () {
        let contacts = [];
        $scope.invoices = [];
        MySqlService
            .select('contacts')
            .then(function (res) {
                if (res.status === 200) {
                    contacts = res.data[0]['rows'];
                }
                else {
                    console.log("Error While Loading Contacts");
                    return;
                }
            })
            .then(function () {
                console.log(UserService.allUsers);
                MySqlService
                    .select('invoices', {
                        andWhere: { status: 1 }
                    })
                    .then(function (res) {
                        if (res.status === 200) {
                            res.data[0]['rows'].forEach(function (invoice) {
                                invoice.contact = contacts.find(x => x.id === invoice.contactId);
                                invoice.postedByName = UserService.getUserById(invoice.postedBy)['title'];
                                invoice.typeName = invoice.type == 0 ? 'Purchase' : 'Sales';
                                $scope.invoices.push(invoice);
                            });
                        }
                        else {
                            console.log("Error while Loading Invoices");
                            return;
                        }
                    });
            })
            .then(function () {
                $scope.$emit("DataLoaded", { data: $scope.invoices.length });
            });
    };

    $scope.delete = function (invoice) {
        if (confirm("Do You Really Wish To Delete Invoice #" + invoice.id)) {
            MySqlService
                .update('invoices', {
                    userData: { 'status': 0 },
                    andWhere: { id: invoice.id }
                })
                .then(function (res) {
                    console.log(res);
                    let index = $scope.invoices.indexOf(invoice);
                    $scope.invoices.splice(index, 1);
                });
        }
    }    

    $scope.$on('Refresh Data', function (e, arg) {
        $scope.refreshData();
        console.log("Refresh Data Called");
    });
})