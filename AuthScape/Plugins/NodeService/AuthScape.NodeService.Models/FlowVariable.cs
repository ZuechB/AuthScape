using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Flows.Models
{
    public class FlowVariable
    {
        public string Name { get; set; }
        public VariableType Type { get; set; }
        public bool IsArray { get; set; } // if false then a single value
        public string Value { get; set; }
    }

    public enum VariableType
    {
        String = 1,
        DateTime = 2,
        Boolean = 3,
        Integer = 4,
        Decimal = 5,
        Object = 6,
    }
}
