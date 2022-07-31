using System;
using System.Runtime.Serialization;

namespace AuthScape.Models.Exceptions
{
    [Serializable]
    public class BadRequestException : Exception
    {

        public BadRequestException() : base() { }

        public BadRequestException(string message)
            : base(message) { }

        public BadRequestException(string format, params object[] args)
            : base(string.Format(format, args)) { }

        public BadRequestException(string message, Exception innerException)
            : base(message, innerException) { }

        public BadRequestException(string format, Exception innerException, params object[] args)
            : base(string.Format(format, args), innerException) { }

        protected BadRequestException(SerializationInfo info, StreamingContext context)
            : base(info, context) { }
    }
}
