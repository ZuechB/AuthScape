namespace AuthScape.Backpack.Models
{
    public struct CMYK
    {
        private double _c;
        private double _m;
        private double _y;
        private double _k;

        public CMYK(double c, double m, double y, double k)
        {
            this._c = c;
            this._m = m;
            this._y = y;
            this._k = k;
        }

        public double C
        {
            get { return this._c; }
            set { this._c = value; }
        }

        public double M
        {
            get { return this._m; }
            set { this._m = value; }
        }

        public double Y
        {
            get { return this._y; }
            set { this._y = value; }
        }

        public double K
        {
            get { return this._k; }
            set { this._k = value; }
        }

        public bool Equals(CMYK cmyk)
        {
            return (this.C == cmyk.C) && (this.M == cmyk.M) && (this.Y == cmyk.Y) && (this.K == cmyk.K);
        }
    }
}
