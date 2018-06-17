app.directive('contactForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/contactForm/contactForm.html',
        controller: 'ContactFormController',
    };
})
.controller('ContactFormController', function($scope, MySqlService){
    $scope.contact = {
        'id'     : 0,
        'name'   : '',
        'address': '',
        'phone'  : '',
        'taxId'  : ''
    };

    $scope.save = function(){
        $scope.contact.id = Number($scope.contact.id);
        let shouldInsert = Number($scope.contact.id) === 0;
        const req = {userData : {}};
        let method = "update";
        
        Object.assign(req.userData, $scope.contact);
        delete( req.userData.id ); //Remove Id Field from Query

        if (shouldInsert) {
            method = "insert";
        } else {
            req.andWhere = { 'id': $scope.contact.id };
        }
        
        MySqlService
            [method]('contacts', req)
            .then(function (res) {
                console.log(res);
                $scope.reset();
            });
    };

    $scope.reset = () => {
        $scope.contact = {
            'id': 0,
            'name': '',
            'address': '',
            'phone' : '',
            'taxId': ''
        };
    };

    $scope.setCustomer = function(contact){
        contact.id = Number(contact.id);
        Object.assign($scope.contact, contact);
    };

    $scope.$on('Set Contact', function(e, arg){
        $scope.setCustomer(arg.data);
    });
});