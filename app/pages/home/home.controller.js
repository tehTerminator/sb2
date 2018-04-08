app.controller('HomeController', function($scope, UserService){
  $scope.title = "Hello - " + UserService.getUserName();
});
