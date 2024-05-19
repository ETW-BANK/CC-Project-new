namespace Travel_Ginie_App.Server.AttractionsDto
{
    public class Root
    {
        public int status { get; set; }
        public object msg { get; set; }
        public Results results { get; set; }
        public Attractions activities { get; set; }
    }
}
