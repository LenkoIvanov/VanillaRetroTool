import { openSocket } from './scripts/socketConnection';

export const initModal = () => {
  const modal = document.getElementById('loginModal');
  const openBtn = document.querySelector('[data-modal-target]');
  const closeBtn = modal.querySelector('[data-modal-close]');
  const modalForm = document.getElementById('loginForm');

  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }
  });

  const socketInstance = openSocket(() => {});

  modalForm?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(modalForm);
    const payload = {
      type: 'login',
      content: {
        username: formData.get('username'),
      },
    };
    const serializedPayload = JSON.stringify(payload);
    socketInstance.send(serializedPayload);
  });
};
