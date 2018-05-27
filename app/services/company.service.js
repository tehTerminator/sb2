app
.factory('CompanyService', function(MySqlService){
    const companyService = {};
    companyService['data'] = [];

    companyService.retrieveCompanies = function(){
        return MySqlService.select('companies')
        .then(function(response){
            companyService.data = response.data[0]['rows'];
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
            company => company.title.toLowerCase().indexOf(name.toLowerCase()) >= 0
        );
    }
    return companyService;
    
});