using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace VehicleManagement.Models.DB
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<tblRole> tblRole { get; set; }
        public DbSet<tbluser> tbluser { get; set; }
        public DbSet<tbldriver> tbldriver { get; set; }
        public DbSet<tblbusiness> tblbusiness { get; set; }
        public DbSet<tblstatus> tblstatus { get; set; }
        public DbSet<tblvehicle> tblvehicle { get; set; }
        public DbSet<tblInvoice> tblInvoice { get; set; }
    }
}
