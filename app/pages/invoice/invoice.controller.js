app.controller('InvoiceController', function($scope, $routeParams, UserService, MySqlService) {
    $scope.invoiceType = $routeParams.type;
    $scope.selected = {
        'contact': {}
    };

    $scope.init = function () {
        if ($scope.invoiceType == "purchase") {
            $scope.type = 0;
        } else {
            $scope.type = 1;
        }

        console.log("$scope.type", $scope.type);
    }

    $scope.title="Invoice Page";

    $scope.$on('Contact Selected', function(e, arg){
        $scope.selected.contact = arg.data;
        $scope.$broadcast('Gain', {data : arg.data});
    });

    $scope.$on('Save Invoice', function (e, arg) { $scope.save(); });
    
    $scope.save = function () {
        //Create Invoice
        const req = {
            userData: {
                'contactId': $scope.selected.contact.id,
                'postedBy': UserService.currentUser.id,
                'type': $scope.type
            }
        };
        MySqlService
            .insert('invoices', req)
            .then((response) => {
                console.log("Saved Invoice", response);
                let invoiceId = response.data[0].lastInsertId;
                $scope.$broadcast('Save Transactions', { data: invoiceId });
            });
    }

    $scope.init();
});