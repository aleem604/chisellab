using KickBot.Model;
using KickBot.Utility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;


namespace KickBot.DAL
{
    public class DataAccessLayer
    {
        string connectionString = ConnectionString.CName;

        public IEnumerable<User> GetAllUsers()
        {
            List<User> lstUser = new List<User>();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spGetAllUsers", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    User user = new User();
                    user.UserId = Convert.ToInt32(rdr["UserId"]);
                    user.Email = Convert.ToString(rdr["Email"]);
                    user.UserName = Convert.ToString(rdr["UserName"]);
                    user.IsActive =Convert.ToBoolean( rdr["IsActive"]);
                    user.ConnectionId = Convert.ToString(rdr["ConnectionId"]);
                    user.ConnectedDate = Convert.ToDateTime(rdr["ConnectedDate"]);

                    lstUser.Add(user);
                }
                con.Close();
            }
            return lstUser;
        }
        public void AddUpdateUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddUpdateUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@UserName", user.UserName);
                    cmd.Parameters.AddWithValue("@IsActive", user.IsActive);
                    cmd.Parameters.AddWithValue("@ConnectionId", user.ConnectionId);
                    cmd.Parameters.AddWithValue("@ConnectedDate", user.ConnectedDate);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public void UpdateUser(User user)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spUpdateUser", con);
                cmd.CommandType = CommandType.StoredProcedure;                
                cmd.Parameters.AddWithValue("@ConnectionId", user.ConnectionId);               
                cmd.Parameters.AddWithValue("@IsActive", user.IsActive);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        public User GetUserData(int? id)
        {
            User user = new User();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Users WHERE Id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {                  
                    user.UserId = Convert.ToInt32(rdr["Id"]);
                    user.Email = Convert.ToString(rdr["Email"]);
                    user.UserName = Convert.ToString(rdr["UserName"]);
                    user.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    user.ConnectionId = Convert.ToString(rdr["ConnectionId"]);
                    user.ConnectedDate = Convert.ToDateTime(rdr["ConnectedDate"]);
                }
            }
            return user;
        }
        public string GetAdminUserData()
        {
            string connectionId = "";

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT ConnectionId FROM Users WHERE Email= 'Admin@gmail.com'";
                    con.Open();
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        connectionId = Convert.ToString(rdr["ConnectionId"]);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return connectionId;
        }

        public void DeleteUser(int? id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spDeleteUer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", id);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
    }
}
