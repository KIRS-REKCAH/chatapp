/*const socket = io('http://localhost:8000');*/
var socket = io('http://localhost:8000', { transports : ['websocket'] });

const form = document.getElementById("send-container");
const messageImput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageImput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageImput.value = ''
});

const nas = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', nas);

var audio = new Audio('Tone.mp3');

socket.on('user-joined', name=>{
    append(`${name} joind the chat`, 'right')
});

socket.on('receive', data=>{
    append(`${data.name};${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'left')
})