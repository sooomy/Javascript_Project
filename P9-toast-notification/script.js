// ===== ToastManager =====
class ToastManager {
  constructor(container, {duration = 4000, max = 5} = {}) {
    this.box = container;
    this.duration = duration;
    this.max = max;
    this.queue = [];
  }

  show(type = 'info', message = 'Notification') {
    // Empêche doublon immédiat (même texte & type)
    if ([...this.box.children].some(t => t.dataset.id === `${type}|${message}`)) return;

    const toast = this._createToast(type, message);
    if (this.box.children.length >= this.max) {
      this.queue.push(toast);
    } else {
      this._appendToast(toast);
    }
  }

  _createToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.dataset.id = `${type}|${message}`;
    toast.setAttribute('role', 'alert');

    toast.innerHTML = `
      <span class="icon">${this._icon(type)}</span>
      <span class="msg">${message}</span>
      <button class="close" aria-label="Fermer">&times;</button>
      <span class="progress"></span>
    `;

    // barre de progression proportionnelle à duration
    toast.querySelector('.progress').style.animationDuration = `${this.duration}ms`;

    // fermeture auto
    const auto = setTimeout(() => this._removeToast(toast), this.duration);

    // fermeture manuelle
    toast.querySelector('.close').addEventListener('click', () => {
      clearTimeout(auto);
      this._removeToast(toast);
    });

    return toast;
  }

  _appendToast(toast) {
    this.box.appendChild(toast);

    // sortie animée
    toast.addEventListener('animationend', (e) => {
      if (e.animationName === 'slideOut') {
        toast.remove();
        if (this.queue.length) this._appendToast(this.queue.shift());
      }
    });
  }

  _removeToast(toast) {
    toast.style.animation = 'slideOut .35s forwards';
  }

  _icon(type) {
    return {
      success: '✅',
      error  : '❌',
      info   : 'ℹ️',
      warning: '⚠️'
    }[type] || '🔔';
  }
}

// ===== Initialisation =====
const toastMgr = new ToastManager(document.getElementById('toastBox'), {duration: 5000});

document.querySelectorAll('.buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const msg  = btn.dataset.msg;
    toastMgr.show(type, msg);
  });
});
