using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KickBot.Model
{
    public class Message
    {
        public int MessageId { set; get; }
        [Required]
        public int UserId { set; get; }
        [Required]
        public string MessageTxt { set; get; }
        [Required]
        public int Orderby { set; get; }
        public bool IsRead { set; get; }

    }
}
