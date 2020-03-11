"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var connectedUser = [];
//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
var input = document.getElementById("messageInput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendButton").click();
    }
});

connection.on("ReceiveMessage", function (user, message, connectionId) {
    debugger;
    const result = connectedUser.find(({ id }) => id === connectionId);
    if (result !== undefined || result !== null) {
        connectedUser.push({ id: connectionId, name: user });
    }   
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var elements = createmyElements(user, msg);

    document.getElementById("messagesList").appendChild(elements);   
});

connection.on("UserConnected", function (connectionId) {
    debugger;
    var elements = connectedUserFunc(connectionId);
    document.getElementById("chatList").appendChild(elements);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    document.getElementById("userInput").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("messageInput").value = "";
    event.preventDefault();
});

function createmyElements(user, message) {

    if (user !== 'Admin') {
        var d1 = document.createElement("div");
        d1.setAttribute("class", "row msg_container base_sent");
        var d2a = document.createElement("div");
        d2a.setAttribute("class", "col-md-10 col-xs-10");
        var d2b = document.createElement("div");
        d2b.setAttribute("class", "col-md-2 col-xs-2 avatar");
        var d3 = document.createElement("div");
        d3.setAttribute("class", "messages msg_sent");
        var p = document.createElement("p");
        p.textContent = message;
        var img = document.createElement("img");
        img.setAttribute("src", "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg");
        img.setAttribute("class", "img-responsive");
        d1.appendChild(d2a).appendChild(d3).appendChild(p);
        d1.appendChild(d2b).appendChild(img);
    }
    else if (user === 'Admin') {
        var d1 = document.createElement("div");
        d1.setAttribute("class", "row msg_container base_receive");
        var d2a = document.createElement("div");
        d2a.setAttribute("class", "col-md-10 col-xs-10");
        var d2b = document.createElement("div");
        d2b.setAttribute("class", "col-md-2 col-xs-2 avatar");
        var d3 = document.createElement("div");
        d3.setAttribute("class", "messages msg_receive");
        var p = document.createElement("p");
        p.textContent = message;
        var img = document.createElement("img");
        img.setAttribute("src", "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg");
        img.setAttribute("class", "img-responsive");
        d1.appendChild(d2b).appendChild(img);
        d1.appendChild(d2a).appendChild(d3).appendChild(p);

    }

    return d1;
}

function connectedUserFunc(connectionId) {
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
    p.textContent = connectionId;
    var img = document.createElement("img");
    img.setAttribute("src", "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg");

    d1.appendChild(d2).appendChild(d2a).appendChild(img);
    d2.appendChild(d2b).appendChild(h).appendChild(span).appendChild(p);
    return d1;
}