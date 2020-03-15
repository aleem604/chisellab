using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KickBot.Model
{
    public class User
    {
        public int UserId { set; get; }
        [Required]
        public string ConnectionId { set; get; }
        public string UserName { set; get; }
        public string Email { set; get; }
        public bool IsActive { set; get; }
        [Required]
        public DateTime ConnectedDate { set; get; }

    }
}
