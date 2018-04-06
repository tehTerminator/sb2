app.factory('ProductService', function(MySqlService, CategoryService, CompanyService){
    const productService = {};
    productService['data'] = [];

    productService.retrieveProducts = function(){

        MySqlService.select('products')
        .then(function(response){
            if( response.status === 200 ){
                angular.forEach(response.data.data, function(product){
                    product.categoryName = CategoryService.getCategoryById(product.categoryId);
                    product.companyName = CompanyService.getCompanyById(product.companyId);
                    productService.data.push(product);
                });
            } else {
                productService.data = [];
            }
        });
    }



    productService.getProductList = function(){
        return productService.data;
    }

    productService.getProductById = function(id){
        return productService.data.find( product => product.id === id );
    }

    productService.getProductsByName = function(name){
        return productService.data.filter( 
            product => product.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 
        );
    }

    productService.getProductsByCategoryId = function(categoryId){
        return productService.data.filter( product => product.categoryId === categoryId );
    }

    productService.getProductsByCompanyId = function(companyId){
        return productService.data.filter( product => product.companyId === companyId );
    }

    productService.getProductsByCategoryName = function(categoryName){
        let categories = CategoryService.getCategoriesByName(categoryName);
        let products = [];
        categories.forEach(function(category){
            products.concat( productService.getProductsByCategoryId(category.id) );
        });
        return product;
    }

    productService.getProductsByCompanyName = function(companyName){
        let companies = CompanyService.getCompaniesByName(companyName);
        let products = [];
        companies.forEach(function(company){
            products.concat( productService.getProductByCompanyId(company.id) );
        });
        return products;
    }

    return productService;
})

.factory('CategoryService', function(MySqlService){
    const categoryService = {};
    categoryService['data'] = [];

    categoryService.retrieveCategories = function(){
        MySqlService.select('categories')
        .then(function(response){
            categoryService.data = response;
        })
    }

    categoryService.getCategories = function(){
        return categoryService.data;
    }
    
    categoryService.getCategoryById = function(id){
        return categoryService.data.find( category => category.id === id );
    }

    categoryService.getCategoriesByName = function(name){
        return categoryService.data.filter( 
            category => category.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 
        );
    }
})

.factory('CompanyService', function(MySqlService){
    const companyService = {};
    companyService['data'] = [];

    companySerice.retrieveCompanies = function(){
        MySqlService.select('companies')
        .then(function(response){
            companyService.data = response;
        })
    }

    companyService.getCompanyById = function(id){
        return companyService.data.find( company => company.id === id );
    }

    companyService.getCompaniesByName = function(name){
        return companyService.data.filter( 
            company => company.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
        );
    }
    
})

 