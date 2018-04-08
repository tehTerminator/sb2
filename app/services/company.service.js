app
.factory('CompanyService', function(MySqlService){
    const companyService = {};
    companyService['data'] = [];

    companyService.retrieveCompanies = function(){
        MySqlService.select('companies')
        .then(function(response){
            companyService.data = response;
        })
    }

    companyService.getCompanies = function(){
        return companyService.data;
    }

    companyService.getCompanyById = function(id){
        return companyService.data.find( company => company.id === id );
    }

    companyService.getCompaniesByName = function(name){
        return companyService.data.filter( 
            company => company.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
        );
    }

    return companyService;
    
});