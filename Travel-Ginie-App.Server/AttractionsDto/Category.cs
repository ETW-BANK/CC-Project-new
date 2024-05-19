namespace Travel_Ginie_App.Server.AttractionsDto
{
    public class Category
    {
        public Attractions attractions { get; set; }
        public Restaurants restaurants { get; set; }
        public Accommodations accommodations { get; set; }
        public string neighborhoods { get; set; }
        public string airports { get; set; }
        public string attraction_products { get; set; }
    }
}
