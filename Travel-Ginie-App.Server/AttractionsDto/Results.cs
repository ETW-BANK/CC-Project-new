namespace Travel_Ginie_App.Server.AttractionsDto
{
    public class Results
    {
        public string location_id { get; set; }
        public string name { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string num_reviews { get; set; }
        public string timezone { get; set; }
        public string location_string { get; set; }
        public Photo photo { get; set; }
        public List<object> awards { get; set; }
        public string doubleclick_zone { get; set; }
        public string preferred_map_engine { get; set; }
        public string geo_type { get; set; }
        public CategoryCounts category_counts { get; set; }
        public string map_image_url { get; set; }
        public List<object> nearby_attractions { get; set; }
        public string description { get; set; }
        public bool is_localized_description { get; set; }
        public string web_url { get; set; }
        public string write_review { get; set; }
        public List<Ancestor> ancestors { get; set; }
        public Category category { get; set; }
        public List<Subcategory> subcategory { get; set; }
        public string parent_display_name { get; set; }
        public bool is_jfy_enabled { get; set; }
        public List<NearestMetroStation> nearest_metro_station { get; set; }
        public string geo_description { get; set; }
        public bool has_restaurant_coverpage { get; set; }
        public bool has_attraction_coverpage { get; set; }
        public bool has_curated_shopping_list { get; set; }
        public bool has_review_draft { get; set; }
        public bool has_panoramic_photos { get; set; }
    }
}
