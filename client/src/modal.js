import { openSocket } from './scripts/socketConnection';

export const initModal = () => {
  const modal =
    document.getElementById('loginModal') ??
    document.getElementById('logoutModal');
  const openBtn = document.querySelector('[data-modal-target]');
  const loginForm = document.getElementById('loginForm');
  const closeBtn = modal.querySelector('[data-modal-close]');
  const logoutForm = document.getElementById('logoutForm');

  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  });

  closeBtn.addEventListener('click', () => {
    if (loginForm) {
      closeBtn.setAttribute('disabled', true);
      return;
    }
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  });

  modal.addEventListener('click', (e) => {
    if (loginForm) {
      return;
    }
    if (e.target === modal) {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (loginForm) {
      return;
    }
    if (e.key === 'Escape') {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }
  });

  const socketInstance = openSocket(() => {});

  if (loginForm) {
    loginForm?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const formData = new FormData(loginForm);
      const payload = {
        type: 'login',
        content: {
          username: formData.get('username'),
        },
      };
      const serializedPayload = JSON.stringify(payload);
      socketInstance.send(serializedPayload);
    });
  }
  if (logoutForm) {
    logoutForm?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const formData = new FormData(logoutForm);
      const payload = {
        type: 'logout',
        content: {
          participantId: formData.get('participantId'),
        },
      };
      const serializedPayload = JSON.stringify(payload);
      socketInstance.send(serializedPayload);
    });
  }
};
