app.factory('ProductService', function(MySqlService, CategoryService, CompanyService){
    const productService = {};
    productService['data'] = [];

    productService.retrieveProducts = function(){
        return MySqlService.select('products')
        .then(function(response){
            if( response.status === 200 ){
                const output = response.data[0].rows;
                output.forEach(product => {
                    product.category = CategoryService.getCategoryById(product.categoryId)['title'];
                    product.company = CompanyService.getCompanyById(product.companyId)['title'];
                    productService.data.push(product);
                });
                angular.forEach(response.data.data, function(product){
                });
            } else {
                productService.data = [];
            }
        });
    };

    productService.getProducts = function(){
        return productService.data;
    }

    productService.getProductById = function(id){
        return productService.data.find( product => product.id === id );
    }

    productService.getProductsByName = function(name){
        return productService.data.filter( 
            product => product.title.toLowerCase().indexOf(name.toLowerCase()) >= 0 
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
        return products;
    }

    productService.getProductsByCompanyName = function(companyName){
        let companies = CompanyService.getCompaniesByName(companyName);
        let products = [];
        companies.forEach(function(company){
            products.concat( productService.getProductByCompanyId(company.id) );
        });
        return products;
    }

    productService.getProductHistory = function( productId ){
        const request = {
            'columns' : [
                'quantity', 
                'rate', 
                'invoices.type as invoiceType', 
                'invoices.postedOn as postedOn'
            ],
            andWhere : {
                'transactions.productId' : productId,
            },
            join : "join invoices",
            limit : 5
        };
        return MySqlService.select('transactions', request);
    }

    return productService;
});