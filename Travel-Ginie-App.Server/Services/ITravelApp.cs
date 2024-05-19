using Travel_Ginie_App.Server.AIResponseDTO;
using Travel_Ginie_App.Server.AiTripPlan;
using Travel_Ginie_App.Server.GeoIdDto;
using Travel_Ginie_App.Server.HotelDtos;
using Travel_Ginie_App.Server.RestaurantsDto;
using Travel_Ginie_App.Server.TripPlanDto;

namespace Travel_Ginie_App.Server.Services
{
    public interface ITravelApp
    {
        Task<List<string>> GetCountryNames();//done
        Task<List<string>> GetCities(string country);//done
     
        Task<List<RestaurantsDto.RestaurantsDto>> GetRestaurants(string city);//done
        Task<List<HotelDtos.Data>> GetHotelDetails(string city, DateTime checkin, DateTime checkout);//done

        Task<TripPlanDto.TripPlan> GetTravelPlan(string day, string city, string activities, int numberofppl, decimal budjet, string companions);//done

        Task<List<object>> GetEvents(string type, string city, int start);//done

        Task<AIResponseDTO.AiTripPlanDTO> GetPlanDetail(string propt);//done

        Task<List<AttractionsDto.Results>> GetAttractions(string city);


        Task<int> GetGeoId(string city);//done

        Task<string> GetCategories();//done

    }
}