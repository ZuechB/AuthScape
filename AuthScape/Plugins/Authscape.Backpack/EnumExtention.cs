using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace AuthScape.Backpack
{
    public class EnumExtention
    {
        public static string GetEnumDescription(Type type, string value)
        {
            var name = Enum.GetNames(type).Where(f => f.Equals(value, StringComparison.CurrentCultureIgnoreCase)).Select(d => d).FirstOrDefault();

            if (name == null)
            {
                return string.Empty;
            }
            var field = type.GetField(name);
            var customAttribute = field.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return customAttribute.Length > 0 ? ((DescriptionAttribute)customAttribute[0]).Description : name;
        }

        public static T GetEnumValueFromDescription<T>(string description)
        {
            Type enumType = typeof(T);

            if (!enumType.IsEnum)
                throw new ArgumentException($"{enumType.Name} is not an enum.");

            foreach (T enumValue in Enum.GetValues(enumType))
            {
                if (enumValue.ToString() == description)
                    return enumValue;

                FieldInfo field = enumType.GetField(enumValue.ToString());
                if (field != null && Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) is DescriptionAttribute attribute)
                {
                    if (attribute.Description == description)
                        return enumValue;
                }
            }

            throw new ArgumentException($"No enum value with the description '{description}' found in {enumType.Name}.");
        }
    }
}
