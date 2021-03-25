using System;

namespace Creational
{
    namespace Prototype
    {

        class SomeType
        {
            public string Name = "No name";
            public int Count = 0;

            public SomeType Clone()
            {
                return this.MemberwiseClone() as SomeType;
            }
        }
        class ProductPrototype
        {
            protected DateTime CreatedAt;
            protected int Id;

            public ProductPrototype() 
            {
                this.CreatedAt = DateTime.Now;
                Random rnd = new Random();
                this.Id = rnd.Next();
            }

            public virtual ProductPrototype Clone()
            {
                return this.MemberwiseClone () as ProductPrototype;
            }
        }

        class CustomProduct : ProductPrototype
        {
            public SomeType obj;
            public CustomProduct(SomeType obj = null) : base()
            {
                this.obj = obj;
            }
            public override CustomProduct Clone()
            {
                CustomProduct clone = this.MemberwiseClone() as CustomProduct;
                clone.obj = this.obj.Clone();
                return clone;
            }

            public override string ToString()
            {
                return $"{{\n\tId:{this.Id},\n\tCreatedAt:{this.CreatedAt},\n\tobj:{{ {(this.obj as SomeType).Name} }}\n}}";
            }
        }
    }
}