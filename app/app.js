const app = angular.module('simpleBillingApp', ['ngRoute']);

app.directive('appRoot', function(){
    return {
        'restrict'      : 'E',
        'templateUrl'   : 'app/app.component.html',
        'controller'    : 'MainController'
    }
})

.controller('MainController', function($scope, $location, UserService, ProductService, CategoryService, CompanyService){
    $scope.title = "Simple Billing App";

    $scope.authUser = function(){
        if( UserService.isLoggedIn() ){
            $location.url('/home');
        } else {
            $location.url('/login');
        }
    }

    $scope.$on('$routeChangeStart', function(event,current,previous) {
        if( !UserService.isLoggedIn() ){
            $location.url('/login');
        }
    });

    $scope.init = () => {
        UserService.getAllUsers();
        CompanyService.retrieveCompanies()
            .then(CategoryService.retrieveCategories()
                .then(ProductService.retrieveProducts())
            );
    };

    $scope.init();
})

.config(function($routeProvider, $locationProvider){
    $routeProvider

    .when('/home', {
        templateUrl : 'app/pages/home/home.html',
        controller  : 'HomeController'
    })
    .when('/report', {
        templateUrl : 'app/pages/report/report.html',
    })
    .when('/invoice/:type', {
        templateUrl : 'app/pages/invoice/invoice.html',
        controller: 'InvoiceController'
    })
    .when('/print/:id', {
        templateUrl : 'app/pages/printInvoice/printInvoice.html',
        controller  : 'PrintInvoiceController'
    })    
    .when('/contacts', {
        templateUrl : 'app/pages/contacts/contacts.html',
        controller  : 'ContactsPageController'
    })
    .when('/categories', {
        templateUrl : 'app/pages/categories/categories.html',
        controller  : 'CategoryPageController'
    })
    .when('/companies', {
        templateUrl : 'app/pages/companies/companies.html',
        controller  : 'CompanyPageController'
    })
    .when('/products', {
        templateUrl : 'app/pages/products/products.html',
        controller  : 'ProductsPageController'
    })
    .when('/login', {
        templateUrl : 'app/pages/login/login.html',
        controller  : 'LoginPageController'
    })
    .otherwise({
        redirectTo: 'home'
    });

    $locationProvider.html5Mode(true);
    })

    .filter('dateToISO', function() {
        return function (input) {
            var input;
            try {
                input = new Date(input).toISOString();
            } catch (e) {
                input = new Date().toISOString();
            }
            return input;
        };
    });

