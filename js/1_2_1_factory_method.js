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

class ProductACreator
{
    CreateProduct()
    {
        return new ProductA();
    }
}

class ProductBCreator
{
    CreateProduct()
    {
        return new ProductВ();
    }
}

export {ProductACreator, ProductBCreator};