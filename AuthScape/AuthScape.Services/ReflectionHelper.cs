using System.Reflection;

namespace AuthScape.Services
{
    public static class ReflectionHelper
    {
        public static bool IsMarkedAsNullable(this PropertyInfo p)
        {
            return new NullabilityInfoContext().Create(p).WriteState is NullabilityState.Nullable;
        }
    }
}
