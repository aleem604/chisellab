"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var connectedUser = [];
var selectedUser = null;
//Disable send button until connection is established
document.getElementById("adminSendButton").disabled = true;
var input = document.getElementById("adminInput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("adminSendButton").click();
    }
});
connection.start().then(function () {
    connection.invoke("AdminLive").catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("adminSendButton").disabled = false;
    document.getElementById("adminInput").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});


connection.on("ReceiveMessageByAdmin", function (message, connectionId) {
    selectedUser = connectionId;
    debugger;
    var p = document.createElement("p");
    p.textContent = message;
    var date = new Date();
    var dat = date.toLocaleTimeString();
    var time = date.toLocaleDateString();

    var span = document.createElement("span");
    span.setAttribute("class", "time_date");
    span.textContent = dat + " | " + time;

    var d1 = document.createElement("div");
    d1.setAttribute("class", "incoming_msg");

    var d2 = document.createElement("div");
    d2.setAttribute("class", "incoming_msg_img");

    var d3 = document.createElement("div");
    d3.setAttribute("class", "received_msg");

    var d4 = document.createElement("div");
    d4.setAttribute("class", "received_withd_msg");
    d4.appendChild(p);
    d4.appendChild(span)
    var img = document.createElement("img");
    img.setAttribute("src", "https://ptetutorials.com/images/user-profile.png");

    d1.appendChild(d2).appendChild(img);
    d1.appendChild(d3).appendChild(d4);
    document.getElementById("msg_history_admin").appendChild(d1);


});

connection.on("NewUserAdded", function (userName, email, connectionId) {
    selectedUser = connectionId;
    debugger;
    const result = connectedUser.find(({ id }) => id === connectionId);
    if (result !== undefined || result !== null) {
        connectedUser.push({ id: connectionId, name: userName, email: email });
    }
    var elements = connectedUserFunc(userName, email, connectionId);
    document.getElementById("chatList").appendChild(elements);
});


document.getElementById("adminSendButton").addEventListener("click", function (event) {
    var message = document.getElementById("adminInput").value;

    connection.invoke("AdminReply", selectedUser, message).catch(function (err) {
        return console.error(err.toString());
    });
    debugger;
    var d1 = document.createElement("div");
    d1.setAttribute("class", "outgoing_msg");
    var d2 = document.createElement("div");
    d2.setAttribute("class", "sent_msg");
    var p = document.createElement("p");
    p.textContent = message;
    d2.appendChild(p);
    var span = document.createElement("span");
    span.setAttribute("class", "time_date");
    var date = new Date();
    var dat = date.toLocaleTimeString();
    var time = date.toLocaleDateString();
    span.textContent = dat + " | " + time;
    d2.appendChild(span);
    d1.appendChild(d2);
    document.getElementById("msg_history_admin").appendChild(d1);

    document.getElementById("adminInput").value = "";

});
function ReplyToUser(connectionId, userName) {
    selectedUser = connectionId;
    document.getElementById("selectedUserName").textContent = userName;
}


function connectedUserFunc(userName, email, connectionId) {
    debugger;
    var d1 = document.createElement("div");
    d1.setAttribute("class", "chat_list active_chat");
    var d2 = document.createElement("div");
    d2.setAttribute("class", "chat_people");
    var d2a = document.createElement("div");
    d2a.setAttribute("class", "chat_img");
    var d2b = document.createElement("div");
    d2b.setAttribute("class", "chat_ib");
    var h = document.createElement("h5");
    var span = document.createElement("span");
    span.setAttribute("class", "chat_date")
    var p = document.createElement("p");
    p.textContent = userName;
    var img = document.createElement("img");
    img.setAttribute("src", "https://ptetutorials.com/images/user-profile.png");
    d2.appendChild(d2a).appendChild(img);
    d2.appendChild(d2b).appendChild(h).appendChild(span).appendChild(p);
    var a = document.createElement('a');
    a.appendChild(d2);
    a.href = "#";
    a.setAttribute("onClick", "ReplyToUser('" + connectionId + "','" + userName + "')");
    d1.appendChild(a);


    return d1;
}