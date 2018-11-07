var forumContainer = document.getElementById('forum-list');
var forumInput = document.getElementById('forum-input');
var socket = io();
var forumForm = document.getElementById('forum-form').addEventListener('submit', (event) => {
    event.preventDefault();
    var userId = document.getElementById('userId-input');
    var username = document.getElementById('username-input');
    socket.emit('chat', {message: forumInput.value, id: userId.value, username: username.value});
    return false;
});
socket.on('chat', (detail) => {
    var newChat = document.createElement('p');
    newChat.classList.add('mb-1');
    newChat.innerHTML = `<a href='/users/${detail.id}'>${detail.username}</a> <span class="neon-green">- ${detail.message}</span>`;
    forumInput.value = null;
    if (forumContainer.firstChild) {
        forumContainer.insertBefore(newChat, forumContainer.firstChild);
    } else {
        forumContainer.append(newChat);
    }

});


