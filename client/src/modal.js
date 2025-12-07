import { socketInstance } from './scripts/socketConnection';
import {
  modalOverlayOpenClass,
  modalOpenClass,
  modalOpenBtnAttr,
  modalCloseBtnAttr,
  logoutModalId,
  loginModalId,
  logoutFormId,
  loginFormId,
  formUsernameId,
  formParticipantId,
  modalContainerId,
} from './constants/domElements';

if (localStorage.getItem('user')) {
  const accountInfo = document.getElementById('btnUser');
  accountInfo.textContent = JSON.parse(localStorage.getItem('user')).name[0];

  fetch('./logout.html')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load modal');
      return response.text();
    })
    .then((html) => {
      document.getElementById(modalContainerId).innerHTML = html;

      initLogoutHandlers();
      const modal = document.getElementById(logoutModalId);
      if (modal) {
        const participantInput = document.getElementById(formParticipantId);
        console.log(participantInput);
        const storedUser = localStorage.getItem('user');

        if (storedUser && participantInput) {
          try {
            const user = JSON.parse(storedUser);
            participantInput.value = user.participantId;
          } catch (e) {
            console.error('Invalid user data in localStorage', e);
          }
        }
      }
    })
    .catch((err) => console.error(err));
} else {
  fetch('./login.html')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load modal');
      return response.text();
    })
    .then((html) => {
      document.getElementById(modalContainerId).innerHTML = html;

      intiLoginHandlers();

      const modal = document.getElementById(loginModalId);
      if (modal) {
        modal.classList.add(modalOpenClass);
        document.body.classList.add(modalOverlayOpenClass);
      } else {
        console.error('#loginModal not found after injecting HTML');
      }
    })
    .catch((err) => console.error(err));
}

const intiLoginHandlers = () => {
  const loginForm = document.getElementById(loginFormId);

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
};

const handleLoginSubmit = (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const payload = {
    type: 'login',
    content: {
      username: formData.get(formUsernameId),
    },
  };
  const serializedPayload = JSON.stringify(payload);
  socketInstance.send(serializedPayload);
};

const initLogoutHandlers = () => {
  const modal = document.getElementById(logoutModalId);
  const logoutForm = document.getElementById(logoutFormId);
  const closeBtn = modal.querySelector(modalCloseBtnAttr);
  const openBtn = document.querySelector(modalOpenBtnAttr);

  openBtn.addEventListener('click', () => {
    modal.classList.add(modalOpenClass);
    document.body.classList.add(modalOverlayOpenClass);
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove(modalOpenClass);
    document.body.classList.remove(modalOverlayOpenClass);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove(modalOpenClass);
      document.body.classList.remove(modalOverlayOpenClass);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove(modalOpenClass);
      document.body.classList.remove(modalOverlayOpenClass);
    }
  });

  if (logoutForm) {
    logoutForm.addEventListener('submit', handleLogoutSubmit);
  }
};

const handleLogoutSubmit = (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const payload = {
    type: 'logout',
    content: {
      participantId: formData.get(formParticipantId),
    },
  };
  const serializedPayload = JSON.stringify(payload);
  socketInstance.send(serializedPayload);
};
