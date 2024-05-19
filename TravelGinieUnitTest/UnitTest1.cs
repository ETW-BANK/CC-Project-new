using Xunit;
using Xunit.Sdk;

namespace TravelGinieUnitTest
{
    [Fact]
    public async Task GetEvents_ReturnsEvents()
    {
        // Arrange
        var travelApp = new itrave();
        string type = "music"; // Example type
        string city = "New York"; // Example city

        // Act
        List<object> events = await travelApp.GetEvents(type, city);

        // Assert
        Assert.NotNull(events); // Ensure events list is not null
        Assert.True(events.Count > 0); // Ensure at least one event is returned
                                       // You can add more specific assertions based on your expected data
    }

}