//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace AuthScape.Backpack.Pagination
//{
//    public class PagedList<T> : List<T>
//    {
//        public int offset { get; set; }
//        public int length { get; set; }
//        public int total { get; set; }
//        public int totalPages { get; set; }



//        public PagedList() : base() { }

//        public PagedList(IEnumerable<T> collection) : base(collection) { }

//        public PagedList(IEnumerable<T> filteredCollection, int offset, int length, int total) : base(filteredCollection)
//        {
//            this.total = total;
//            this.offset = offset;
//            this.length = length;
//        }

//        public JsonResult ToJson(Func<T, object> selectItems = null)
//        {
//            var data = new
//            {
//                Success = true,
//                total,
//                totalPages = totalPages,
//                Data = selectItems != null ? this.Select(selectItems).ToList() : this.Select(x => (object)x).ToList()
//            };

//            return new JsonResult(data);
//        }

//        public PagedList<U> Transform<U>(Func<T, U> transform)
//        {
//            return new PagedList<U>(this.Select(transform), offset, length, total);
//        }
//    }

//    public static class PagedListExtensions
//    {
//        public static PagedList<T> ToPagedResult<T>(this IQueryable<T> query, int pageNumber, int pageSize) where T : class
//        {
//            var pagedResult = query.Skip(pageSize * pageNumber).Take(pageSize);
//            var total = query.Count();

//            return new PagedList<T>(pagedResult.ToList())
//            {
//                total = total,
//                offset = pageNumber,
//                length = pageSize,
//                totalPages = CalculatePages(total, pageSize)
//            };
//        }
//        public static PagedList<T> ToPagedResult<T>(this IEnumerable<T> query, int pageNumber, int pageSize) where T : class
//        {
//            var pagedResult = query.Skip(pageSize * pageNumber).Take(pageSize);
//            var total = query.Count();

//            return new PagedList<T>(pagedResult.ToList())
//            {
//                total = total,
//                offset = pageNumber,
//                length = pageSize,
//                totalPages = CalculatePages(total, pageSize)
//            };
//        }

//        public static async Task<PagedList<T>> ToPagedResultAsync<T>(this IQueryable<T> query, int pageNumber, int pageSize) where T : class
//        {
//            var results = await query.Skip(pageSize * pageNumber).Take(pageSize).ToListAsync();
//            var total = query.Count();

//            return new PagedList<T>(results)
//            {
//                total = total,
//                offset = pageNumber,
//                length = pageSize,
//                totalPages = CalculatePages(total, pageSize)
//            };
//        }

//        private static int CalculatePages(int total, int length)
//        {
//            decimal wholeNum = 0;
//            decimal number = ((decimal)total / (decimal)length);
//            if (number > 1)
//            {
//                var x = number - Math.Truncate(number);
//                wholeNum = number - x;
//                if (x > 0m)
//                {
//                    wholeNum++;
//                }
//            }
//            else
//            {
//                if (number > 0)
//                {
//                    wholeNum++;
//                }
//            }

//            return (int)wholeNum;
//        }
//    }
//}
