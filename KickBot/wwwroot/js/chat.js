"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var connectedUser = [];
//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;
document.getElementById('sendButton').style.visibility = 'hidden';
document.getElementById('messageInput').style.visibility = 'hidden';
document.getElementById('chartStarted_p').style.visibility = 'hidden';

var input = document.getElementById("messageInput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendButton").click();
    }
});

connection.on("ReceiveMessageByClient", function (message) {   
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var elements = createmyElements("received", msg);
    document.getElementById("messagesList").appendChild(elements);
})

connection.on("UserConnected", function (connectionId) {

});

connection.start().then(function () {
    //document.getElementById("sendButton").disabled = false;   
}).catch(function (err) {
    return console.error(err.toString());
});
document.getElementById("startChatButton").addEventListener("click", function (event) {
    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;   
    document.getElementById('userName').style.visibility = 'hidden';
    document.getElementById('userEmail').style.visibility = 'hidden';
    document.getElementById('startChatButton').style.visibility = 'hidden';
    document.getElementById('messageInput').style.visibility = 'visible';
    document.getElementById('sendButton').style.visibility = 'visible';
    document.getElementById('chartStarted_p').style.visibility = 'visible';
    connection.invoke("StartChat", userName, userEmail).catch(function (err) {
        return console.error(err.toString());
    });  
    
    event.preventDefault();

});

document.getElementById("sendButton").addEventListener("click", function (event) {   
    var message = document.getElementById("messageInput").value;
    message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    connection.invoke("SendMessage", message).catch(function (err) {
        return console.error(err.toString());
    });
   var elements = createmyElements("send", message);
    document.getElementById("messagesList").appendChild(elements);
    document.getElementById("messageInput").value = "";
    event.preventDefault();

});

function createmyElements(inOut, message) {

    if (inOut === 'send') {
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
    else if (inOut === 'received') {
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
