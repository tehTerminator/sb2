app
.factory('CategoryService', function(MySqlService){
    const categoryService = {};
    categoryService['data'] = [];

    categoryService.retrieveCategories = function(){
        MySqlService.select('categories')
        .then(function(response){
            categoryService.data = response.data[0]['rows'];
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

    return categoryService;
})