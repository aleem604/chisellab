using KickBot.DAL;
using KickBot.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KickBot.Hubs
{
    public class ChatHub : Hub
    {
        DataAccessLayer dal = new DataAccessLayer();
        public override async Task OnConnectedAsync()
        {
            
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            dal.UpdateUser(new User { ConnectionId = Context.ConnectionId, IsActive = false });
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }

        public async Task StartChat(string userName, string email)
        {
            string adminConnectedId = dal.GetAdminUserData();
            try
            {
                dal.AddUpdateUser(new User { ConnectionId = Context.ConnectionId, ConnectedDate = DateTime.Now, IsActive = true, Email = email, UserName = userName });
                await Clients.Client(adminConnectedId).SendAsync("NewUserAdded", userName, email,Context.ConnectionId);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task SendMessage(string message)
        {
            string adminConnectedId = dal.GetAdminUserData();
            try
            {
                await Clients.Client(adminConnectedId).SendAsync("ReceiveMessageByAdmin", message, Context.ConnectionId);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task AdminReply(string to, string message)
        {
            try
            {
                await Clients.Client(to).SendAsync("ReceiveMessageByClient", message);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public void AdminLive()
        {           
            try
            {
                dal.AddUpdateUser(new User { ConnectionId = Context.ConnectionId, ConnectedDate = DateTime.Now, IsActive = true, Email = "Admin@gmail.com", UserName = "Admin" });
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
