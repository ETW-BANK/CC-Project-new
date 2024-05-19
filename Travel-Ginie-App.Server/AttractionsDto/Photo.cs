namespace Travel_Ginie_App.Server.AttractionsDto
{
    public class Photo
    {
        public Images images { get; set; }
        public bool is_blessed { get; set; }
        public DateTime uploaded_date { get; set; }
        public string caption { get; set; }
        public string id { get; set; }
        public string helpful_votes { get; set; }
        public DateTime published_date { get; set; }
        public object user { get; set; }
    }
}
