using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KickBot.Utility
{
    public static class ConnectionString
    {
        private static string cName = "Data Source=sql5052.site4now.net;User ID=DB_A41CEB_chiseltech_admin;Password=Probation1A";
        public static string CName
        {
            get => cName;
        }
        
    }
}
