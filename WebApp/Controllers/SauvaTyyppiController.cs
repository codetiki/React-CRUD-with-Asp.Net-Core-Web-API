using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SauvaTyyppiController : ControllerBase
    {
        private readonly BarDBContext _context;

        public SauvaTyyppiController(BarDBContext context)
        {
            _context = context;
        }

        // GET: api/SauvaTyyppi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SauvaTyyppi>>> GetSauvatyypit()
        {
            return await _context.Sauvatyypit.ToListAsync();
        }

        // GET: api/SauvaTyyppi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SauvaTyyppi>> GetSauvaTyyppi(int id)
        {
            var sauvaTyyppi = await _context.Sauvatyypit.FindAsync(id);

            if (sauvaTyyppi == null)
            {
                return NotFound();
            }

            return sauvaTyyppi;
        }

        // PUT: api/SauvaTyyppi/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSauvaTyyppi(int id, SauvaTyyppi sauvaTyyppi)
        {
            sauvaTyyppi.id = id;

            _context.Entry(sauvaTyyppi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SauvaTyyppiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SauvaTyyppi
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SauvaTyyppi>> PostSauvaTyyppi(SauvaTyyppi sauvaTyyppi)
        {
            _context.Sauvatyypit.Add(sauvaTyyppi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSauvaTyyppi", new { id = sauvaTyyppi.id }, sauvaTyyppi);
        }

        // DELETE: api/SauvaTyyppi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SauvaTyyppi>> DeleteSauvaTyyppi(int id)
        {
            var sauvaTyyppi = await _context.Sauvatyypit.FindAsync(id);
            if (sauvaTyyppi == null)
            {
                return NotFound();
            }

            _context.Sauvatyypit.Remove(sauvaTyyppi);
            await _context.SaveChangesAsync();

            return sauvaTyyppi;
        }

        private bool SauvaTyyppiExists(int id)
        {
            return _context.Sauvatyypit.Any(e => e.id == id);
        }
    }
}
