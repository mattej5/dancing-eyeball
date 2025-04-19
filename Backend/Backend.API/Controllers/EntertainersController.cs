using Backend.API.Data;
using Backend.API.Models;
using Backend.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EntertainersController : ControllerBase
{
    private readonly EntertainmentDbContext _context;

    public EntertainersController(EntertainmentDbContext context)
    {
        _context = context;
    }

    [HttpGet("bookings")]
    public async Task<ActionResult<IEnumerable<EntertainerBookingSummary>>> GetEntertainerBookings()
    {
        var result = await _context.Entertainers
            .Select(ent => new EntertainerBookingSummary
            {
                EntertainerId = ent.EntertainerId,
                StageName = ent.EntStageName,
                TimesBooked = _context.Engagements.Count(e => e.EntertainerId == ent.EntertainerId),
                MostRecentBookingEndDate = _context.Engagements
                    .Where(e => e.EntertainerId == ent.EntertainerId && e.EndDate != null)
                    .Max(e => (DateOnly?)e.EndDate)
            })
            .ToListAsync();

        return Ok(result);
    }

    [HttpGet("singleEnt/{id}")]
    public async Task<ActionResult<EntertainerCreateDto>> GetEntertainerById(int id)
    {
        var ent = await _context.Entertainers
            .Where(e => e.EntertainerId == id)
            .Select(e => new EntertainerCreateDto
            {
                EntStageName = e.EntStageName,
                EntSsn = e.EntSsn,
                EntStreetAddress = e.EntStreetAddress,
                EntCity = e.EntCity,
                EntState = e.EntState,
                EntZipCode = e.EntZipCode,
                EntPhoneNumber = e.EntPhoneNumber,
                EntWebPage = e.EntWebPage,
                EntEmailAddress = e.EntEmailAddress,
                DateEntered = e.DateEntered
            })
            .FirstOrDefaultAsync();

        if (ent == null) return NotFound();

        return Ok(ent);
    }
    
    [HttpPost]
    public async Task<ActionResult<Entertainer>> AddEntertainer([FromBody] EntertainerCreateDto dto)
    {
        if (dto is null)
        {
            return BadRequest("Entertainer data is required.");
        }

        var newEntertainer = new Entertainer
        {
            EntStageName = dto.EntStageName,
            EntSsn = dto.EntSsn,
            EntStreetAddress = dto.EntStreetAddress,
            EntCity = dto.EntCity,
            EntState = dto.EntState,
            EntZipCode = dto.EntZipCode,
            EntPhoneNumber = dto.EntPhoneNumber,
            EntWebPage = dto.EntWebPage,
            EntEmailAddress = dto.EntEmailAddress,
            DateEntered = dto.DateEntered ?? DateOnly.FromDateTime(DateTime.Now)
        };

        _context.Entertainers.Add(newEntertainer);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEntertainerBookings), new { id = newEntertainer.EntertainerId }, newEntertainer);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEntertainer(int id, [FromBody] EntertainerCreateDto dto)
    {
        var entertainer = await _context.Entertainers.FindAsync(id);
        if (entertainer == null)
        {
            return NotFound();
        }

        entertainer.EntStageName = dto.EntStageName;
        entertainer.EntSsn = dto.EntSsn;
        entertainer.EntStreetAddress = dto.EntStreetAddress;
        entertainer.EntCity = dto.EntCity;
        entertainer.EntState = dto.EntState;
        entertainer.EntZipCode = dto.EntZipCode;
        entertainer.EntPhoneNumber = dto.EntPhoneNumber;
        entertainer.EntWebPage = dto.EntWebPage;
        entertainer.EntEmailAddress = dto.EntEmailAddress;
        entertainer.DateEntered = dto.DateEntered ?? entertainer.DateEntered;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEntertainer(int id)
    {
        var entertainer = await _context.Entertainers.FindAsync(id);
        if (entertainer == null)
        {
            return NotFound();
        }

        _context.Entertainers.Remove(entertainer);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}