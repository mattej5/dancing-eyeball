namespace Backend.API.Models.DTOs;

public class EntertainerBookingSummary
{
    public int EntertainerId { get; set; }
    public string? StageName { get; set; }
    public int TimesBooked { get; set; }
    public DateOnly? MostRecentBookingEndDate { get; set; }
}