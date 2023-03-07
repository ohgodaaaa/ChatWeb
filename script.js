const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatList = document.querySelector('.chat-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value;
  input.value = '';
  addMessage('user', message);
  getResponse(message);
});

function addMessage(sender, text) {
  const listItem = document.createElement('li');
  listItem.classList.add('chat-item');
  listItem.classList.add(sender);
  listItem.textContent = text;
  chatList.appendChild(listItem);
}

async function getResponse(input) {
  const response = await fetch('/api/chatgpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: input
    })
  });
  const data = await response.json();
  const message = data.response;
  addMessage('bot', message);
}
