app
    .controller('PrintInvoiceController', function ($scope, $routeParams, MySqlService) {
        $scope.invoice = {
            'id': $routeParams.id
        };
        $scope.myCompany = {};

        $scope.contact = {};

        $scope.getContact = (id) => {
            MySqlService
                .select('contacts', { andWhere: { 'id': id } })
                .then((res) => {
                    $scope.contact = res.data[0].rows[0];
                })
                .then(() => {
                    $scope.$broadcast('Retrieve Transactions', { id: $scope.invoice.id });
                })
                .then($scope.getMyDetails());
        };

        $scope.getInvoice = () => {
            MySqlService
                .select('invoices', { andWhere: { id: $scope.invoice.id } })
                .then((res) => {
                    $scope.invoice = res.data[0].rows[0];
                    if ($scope.invoice.type == 0) {
                        $scope.invoice.title = "Purchase Invoice";
                    } else {
                        $scope.invoice.title = "Sales Invoice";
                    }
                })
                .then(() => {
                    $scope.getContact($scope.invoice.contactId);
                });
        };

        $scope.getMyDetails = () => {
            MySqlService
                .select('settings')
                .then(function (res) {
                    let data = res.data[0]['rows'];
                    console.log(data);
                    $scope.myCompany.name = data.find(x => x.title == "company_name")['val'];
                    $scope.myCompany.address = data.find(x => x.title == "address")['val'];
                    $scope.myCompany.contact = data.find(x => x.title == "contact")['val'];
                    $scope.myCompany.tax_id = data.find(x => x.title == "tax_id")['val'];
                });
        }

        $scope.getData = () => { $scope.getInvoice(); }
    });