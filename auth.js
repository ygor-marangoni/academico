'use strict';

const authPageConfig = {
  apiBaseUrl: (window.APP_CONFIG?.API_BASE_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  ),
};

const authSel = {
  authPanelForm: () => document.querySelector('.auth-panel-form'),
  authForm: () => document.getElementById('authForm'),
  authTabLogin: () => document.getElementById('authTabLogin'),
  authTabRegister: () => document.getElementById('authTabRegister'),
  authNameWrap: () => document.getElementById('authNameWrap'),
  authName: () => document.getElementById('authName'),
  authEmail: () => document.getElementById('authEmail'),
  authPassword: () => document.getElementById('authPassword'),
  authError: () => document.getElementById('authError'),
  authSubmitBtn: () => document.getElementById('authSubmitBtn'),
  btnGoogleLogin: () => document.getElementById('btnGoogleLogin'),
  authFootnote: () => document.getElementById('authFootnote'),
  authGuestPanel: () => document.getElementById('authGuestPanel'),
  authSessionPanel: () => document.getElementById('authSessionPanel'),
  sessionUserName: () => document.getElementById('sessionUserName'),
  sessionUserEmail: () => document.getElementById('sessionUserEmail'),
  authLogoutBtn: () => document.getElementById('authLogoutBtn'),
  toastContainer: () => document.getElementById('toastContainer'),
};

const authPageState = {
  mode: 'login',
  user: null,
};

const authPageApi = {
  async request(path, options = {}) {
    const response = await fetch(`${authPageConfig.apiBaseUrl}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
      throw new Error(payload?.message || 'Não foi possível se comunicar com o servidor.');
    }

    return payload;
  },

  me() {
    return this.request('/api/auth/me', { method: 'GET' });
  },

  register(data) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login(data) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout() {
    return this.request('/api/auth/logout', { method: 'POST' });
  },

  googleUrl() {
    return `${authPageConfig.apiBaseUrl}/api/auth/google`;
  },
};

function showToast(message, type = 'info') {
  const container = authSel.toastContainer();
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 220);
  }, 2800);
}

const authPage = {
  nextUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get('next') || 'index.html';
  },

  setMode(mode) {
    authPageState.mode = mode;
    const isRegister = mode === 'register';
    authSel.authTabLogin().classList.toggle('active', !isRegister);
    authSel.authTabRegister().classList.toggle('active', isRegister);
    authSel.authNameWrap().classList.toggle('hidden', !isRegister);
    authSel.authSubmitBtn().textContent = isRegister ? 'Criar conta' : 'Entrar';
    authSel.authPassword().setAttribute(
      'autocomplete',
      isRegister ? 'new-password' : 'current-password',
    );
    authSel.authFootnote().textContent = isRegister
      ? 'Crie uma conta para sincronizar os seus dados entre dispositivos.'
      : 'Suas tarefas serão vinculadas à sua conta.';
    this.clearError();
  },

  showError(message) {
    const node = authSel.authError();
    node.textContent = message;
    node.classList.remove('hidden');
  },

  clearError() {
    const node = authSel.authError();
    node.textContent = '';
    node.classList.add('hidden');
  },

  render() {
    const loggedIn = Boolean(authPageState.user);
    authSel.authGuestPanel().classList.toggle('hidden', loggedIn);
    authSel.authSessionPanel().classList.toggle('hidden', !loggedIn);
    authSel.authPanelForm()?.classList.toggle('session-active', loggedIn);

    if (loggedIn) {
      authSel.sessionUserName().textContent = authPageState.user.name || 'Usuário';
      authSel.sessionUserEmail().textContent = authPageState.user.email || '';
    }
  },

  async submit() {
    const email = authSel.authEmail().value.trim();
    const password = authSel.authPassword().value;
    const name = authSel.authName().value.trim();

    if (!email || !password) {
      this.showError('Preencha email e senha para continuar.');
      return;
    }

    if (authPageState.mode === 'register' && name.length < 2) {
      this.showError('Informe um nome com pelo menos 2 caracteres.');
      return;
    }

    this.clearError();
    authSel.authSubmitBtn().disabled = true;
    authSel.authSubmitBtn().textContent =
      authPageState.mode === 'register' ? 'Criando conta...' : 'Entrando...';

    try {
      const response =
        authPageState.mode === 'register'
          ? await authPageApi.register({ name, email, password })
          : await authPageApi.login({ email, password });

      authPageState.user = response.user;
      this.render();
      window.location.href = this.nextUrl();
    } catch (error) {
      this.showError(error.message);
    } finally {
      authSel.authSubmitBtn().disabled = false;
      this.setMode(authPageState.mode);
    }
  },

  async restoreSession() {
    try {
      const response = await authPageApi.me();
      authPageState.user = response.user;
    } catch (error) {
      authPageState.user = null;
    } finally {
      this.render();
    }
  },

  async logout() {
    try {
      await authPageApi.logout();
    } catch (error) {
      showToast('Não foi possível encerrar a sessão agora.', 'error');
    }

    authPageState.user = null;
    this.render();
    this.setMode('login');
    showToast('Sessão encerrada.', 'info');
  },

  handleQueryState() {
    const url = new URL(window.location.href);
    const mode = url.searchParams.get('mode');
    const status = url.searchParams.get('auth');

    if (mode === 'register') {
      this.setMode('register');
    } else {
      this.setMode('login');
    }

    if (!status) return;

    url.searchParams.delete('auth');
    window.history.replaceState({}, '', url.toString());

    if (status === 'success') {
      showToast('Login com Google concluido!', 'success');
      return;
    }

    if (status === 'google-disabled') {
      this.showError('O login com Google ainda não foi configurado no backend.');
      return;
    }

    this.showError('Não foi possível concluir o login com Google.');
  },

  bindEvents() {
    authSel.authTabLogin().addEventListener('click', () => this.setMode('login'));
    authSel.authTabRegister().addEventListener('click', () => this.setMode('register'));
    authSel.authForm().addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.submit();
    });
    authSel.btnGoogleLogin().addEventListener('click', () => {
      window.location.href = authPageApi.googleUrl();
    });
    authSel.authLogoutBtn().addEventListener('click', async () => {
      await this.logout();
    });
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  authPage.handleQueryState();
  authPage.bindEvents();
  await authPage.restoreSession();
});
