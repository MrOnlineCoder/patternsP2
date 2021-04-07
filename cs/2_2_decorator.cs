namespace Structural.Decorator
{
    interface IComponent
    {
        public abstract string Operation();
    }

    class ConcreteComponent : IComponent

    {
        public string Operation()
        {
            return "ConcreteComponent";
        }
    }

    abstract class Decorator : IComponent
    {
        protected IComponent _component;
        public Decorator(IComponent component)
        {
            this._component = component;
        }

        public virtual string Operation()
        {
            if (this._component != null)
            {
                return this._component.Operation();
            }
            else
            {
                return string.Empty;
            }
        }
    }
    class ConcreteDecoratorA : Decorator
    {
        public ConcreteDecoratorA(IComponent comp) : base(comp)
        {
        }

        public override string Operation()
        {
            return $"ConcreteDecoratorA({base.Operation()})";
        }

        public int OtherOperation()
        {
            return base.Operation().Length;
        }
    }

    class ConcreteDecoratorB : Decorator
    {
        public ConcreteDecoratorB(IComponent comp) : base(comp)
        {
        }

        public override string Operation()
        {
            return $"ConcreteDecoratorB({base.Operation()})";
        }
    }
}

