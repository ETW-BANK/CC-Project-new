namespace Travel_Ginie_App.Server.AttractionsDto
{
    public class NearestMetroStation
    {
        public string name { get; set; }
        public string local_name { get; set; }
        public string address { get; set; }
        public string local_address { get; set; }
        public List<Line> lines { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double distance { get; set; }
    }
}
