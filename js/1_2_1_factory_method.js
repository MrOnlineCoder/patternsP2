class ProductA
{
    Operation()
    {
        return "This is A";
    }
}

class ProductВ 
{
    Operation()
    {
        return "This is B";
    }
}

class ProductCreator{
    CreateProduct(){
        return null;
    }

    CreateProductList(count){
        let productList = [];
        for(let i=0;i<count; i++){
            productList.push(this.CreateProduct())
        }
        return productList;
    }
}

class ProductACreator extends ProductCreator
{
    CreateProduct()
    {
        return new ProductA();
    }
}

class ProductBCreator extends ProductCreator
{
    CreateProduct()
    {
        return new ProductВ();
    }
}

export {ProductACreator, ProductBCreator};