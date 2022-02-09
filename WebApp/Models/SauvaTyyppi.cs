using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class SauvaTyyppi
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName="nvarchar(100)")]
        public string Tyyppi { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Kuvaus { get; set; }
    }
}
