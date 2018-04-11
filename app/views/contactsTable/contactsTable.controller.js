app.directive('contactsTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'app/views/contactsTable/contactsTable.html',
        controller : 'ContactsTableController',
        scope : {
            pageLength : '=',
            pageCount : '=',
            pageIndex : '='
        }
    };
})
.controller('ContactsTableController', function($scope, MySqlService) {
    $scope.contacts = [];
    $scope.selectedContact = {
        'id' : 0,
        'name' : "",
        'address' : "",
        'mobile' : "",
        'gstId' : ""
    };
    
    $scope.refreshData = function(){
        MySqlService.select('contacts')
        .then(function(response){
            if( response.status === 200 ){
                let res = response.data[0];
                $scope.contacts = res['rows'];
            } else {
                $scope.constacts = [];
            }
        });

        $scope.$emit("Data Loaded", {data: $scope.contacts.length});
    };

    $scope.save = function() {
        if( id === 0 ) {
            MySqlService.insert('contacts', {
                'userData' : {
                    name : $scope.selectedContact.name,
                    address : $scope.selectedContact.address,
                    mobile : $scope.selectedContact.mobile,
                    gstId : $scope.selectedContact.gstId
                }
            })
            .then(function(response){
                if(response.status === 200){
                    const res = response.data[0];
                    const contact = res['rows'][0];
                    contact.id = res['lastInsertId'];
                    $scope.contacts.push(contact);
                }
            });
        } else {
            MySqlService.update('contacts', {
                'userData' : {
                    name : $scope.selectedContact.name,
                    address : $scope.selectedContact.address,
                    mobile : $scope.selectedContact.mobile,
                    gstId : $scope.selectedContact.gstId
                },
                andWhere : {
                    'id' : $scope.selectedContact.id
                }
            })
            .then(function(response){
                if( response.status === 200 ) {
                    if( response.data[0]['rowCount'] === 1 ) {
                        let contactIndex = $scope.contacts.indexOf( $scope.selectedContact );
                        $scope.contact[contactIndex] = $scope.selectedContact;
                        $scope.selectedContact = {
                            'id' : 0,
                            'name' : "",
                            'address' : "",
                            'mobile' : "",
                            'gstId' : ""
                        };
                    } else {
                        alert("Error Occured");
                        console.log(response);
                    }
                }
            });
        }
    };

    $scope.select = function(contact){
        $scope.selectedContact = contact;
        $scope.$emit('Contact Selected', {data: contact});
    };
})