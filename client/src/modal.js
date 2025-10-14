export const initModal = () => {
  const modal = document.getElementById('loginModal');
  const openBtn = document.querySelector('[data-modal-target]');
  const closeBtn = modal.querySelector('[data-modal-close]');

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
};
