namespace Creational
{
    namespace FactoryMethod
    {
        interface IProduct
        {
            string Operation();
        }

        interface ICreator
        {
            IProduct CreateProduct();
        }

        class ProductA : IProduct
        {
            public string Operation()
            {
                return "This is A";
            }
        }
        class ProductВ : IProduct
        {
            public string Operation()
            {
                return "This is B";
            }
        }

        class ProductACreator: ICreator
        {
            public IProduct CreateProduct()
            {
                return new ProductA();
            }
        }

        class ProductBCreator: ICreator
        {
            public IProduct CreateProduct()
            {
                return new ProductВ();
            }
        }
    }
}