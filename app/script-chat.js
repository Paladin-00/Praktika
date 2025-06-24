document.addEventListener('DOMContentLoaded', () => {

  const chatWindow = document.getElementById('chat-window');
  const homeView = document.getElementById('chat-home');
  const existingView = document.getElementById('chat-existing');
  const newView = document.getElementById('chat-new');

  const chatToggle = document.getElementById('chat-toggle');
  const toggleIcon = chatToggle.querySelector('use');

  const existingInput = document.getElementById('existing-input');
  const existingSend = document.getElementById('existing-send');
  const existingMessages = existingView.querySelector('.chat-messages');

  let sentCount = 0;

  const socket = new WebSocket(`ws://${window.location.host}`);

  socket.addEventListener('open', () => {
    console.log('🔗 WebSocket підключено');
  });

  socket.addEventListener('error', (err) => {
    console.error('❌ WebSocket помилка', err);
  });

  socket.addEventListener('message', event => {
    const botTime = getCurrentTime();
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.innerHTML = `
      <img src="./images/konstantin.jpg" class="avatar-small" />
      <div class="bubble">
        <strong>Константин</strong><br/>
        ${event.data}
        <div class="time">${botTime}</div>
      </div>
    `;
    existingMessages.appendChild(botMsg);
    existingMessages.scrollTop = existingMessages.scrollHeight;
  });

  if (chatToggle) {
    chatToggle.onclick = () => {
      chatWindow.classList.toggle('hidden');
      showView(homeView);

      if (chatWindow.classList.contains('hidden')) {
        toggleIcon.setAttribute('href', './images/icons.svg#icon-plus');
      } else {
        toggleIcon.setAttribute('href', './images/icons.svg#icon-cross');
      }
    };
  }

  function showView(view) {
    [homeView, existingView, newView].forEach(v => v.classList.remove('active'));
    view.classList.add('active');
  }

  document.getElementById('open-existing').onclick = () => {
    showView(existingView);
  };

  document.getElementById('open-new').onclick = () => {
    showView(newView);
  };

  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.onclick = () => showView(homeView);
  });

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function sendMessage() {
    if (sentCount >= 2) {
      showView(newView);
      return;
    }

    const text = existingInput.value.trim();
    if (text) {
      const time = getCurrentTime();

      const userMsg = document.createElement('div');
      userMsg.className = 'message user';
      userMsg.innerHTML = `
        <div class="bubble">
          ${text}
          <div class="time">${time}</div>
        </div>
      `;
      existingMessages.appendChild(userMsg);
      existingMessages.scrollTop = existingMessages.scrollHeight;

      existingInput.value = '';
      sentCount++;

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(text);
      } else {
        console.error('WebSocket не підключено');
      }
    }
  }

  existingSend.onclick = sendMessage;

  existingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  document.getElementById('new-form').onsubmit = (e) => {
    e.preventDefault();
    alert('Дані відправлено!');
    showView(homeView);
  };

  (function () {
    const newForm = document.getElementById('new-form');

    newForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameInput = newForm.querySelector('input[name="name"]');
      const emailInput = newForm.querySelector('input[name="email"]');
      const messageInput = newForm.querySelector('textarea[name="message"]');

      let isValid = true;

      if (nameInput.value.trim().length < 2) {
        isValid = false;
        nameInput.classList.add('error');
        alert('Ім\'я повинно містити хоча б 2 символи.');
      } else {
        nameInput.classList.remove('error');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.classList.add('error');
        alert('Введіть коректний email.');
      } else {
        emailInput.classList.remove('error');
      }

      if (messageInput.value.trim().length === 0) {
        isValid = false;
        messageInput.classList.add('error');
        alert('Поле "Ваше запитання" не може бути порожнім.');
      } else {
        messageInput.classList.remove('error');
      }

      if (isValid) {
        emailjs.sendForm('service_tfpkg4c', 'template_kda3fat', this)
          .then(function () {
            alert('Повідомлення успішно відправлено!');
            newForm.reset();
          }, function (error) {
            alert('Виникла помилка: ' + JSON.stringify(error));
          });
      }
    });

    const style = document.createElement('style');
    style.innerHTML = `
      .error {
        border: 2px solid red;
      }
    `;
    document.head.appendChild(style);
  })();


});

  