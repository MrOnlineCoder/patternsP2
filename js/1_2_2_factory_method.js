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

function CreateProduct(product){
    if (product == "A")
        return new ProductA();
    if (product == "B")
        return new ProductВ();
}

export default CreateProduct;