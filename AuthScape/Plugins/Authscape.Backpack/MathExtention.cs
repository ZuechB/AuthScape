using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Backpack
{
    public class MathExtention
    {
        public static double Mean(int[] numbers)
        {
            var mean = numbers.Average();
            return mean;
        }

        public static double Median(int[] numbers)
        {
            double median;
            int[] sortedNumbers = numbers.OrderBy(n => n).ToArray();
            int size = sortedNumbers.Length;
            if (size % 2 == 0)
            {
                median = (sortedNumbers[size / 2 - 1] + sortedNumbers[size / 2]) / 2.0;
            }
            else
            {
                median = sortedNumbers[size / 2];
            }

            return median;
        }

        public static double Mode(int[] numbers)
        {
            var mode = numbers
                .GroupBy(n => n)
                .OrderByDescending(g => g.Count())
                .ThenBy(g => g.Key)
                .First()
                .Key;

            return mode;
        }

        public static (int min, int max) FindMinMax(int[] numbers)
        {
            int min = numbers[0];
            int max = numbers[0];

            foreach (int number in numbers)
            {
                if (number < min)
                {
                    min = number;
                }
                if (number > max)
                {
                    max = number;
                }
            }

            return (min, max);
        }

        // page views = 0.2
        // clicks are 0.5
        // buy = 0.8

        // actual pageview = 1000
        // 59 clicks
        // 3 buys

        // company a 50%
        // company b 40


        public static double Normalize(double value, double minValue, double maxValue)
        {
            return ((value - minValue) / (maxValue - minValue)) * 100;
        }

        public static double CalculateCompositeScore(double normalizedPageViews, double normalizedSales, double weightPageViews, double weightSales)
        {
            return (normalizedPageViews * weightPageViews) + (normalizedSales * weightSales);
        }


    }
}
