/* ============================================================
   ACADÊMICO — script.js
   Arquitetura: State → Utils → Render → Handlers → Storage → Init
   ============================================================ */

'use strict';

/* ============================================================
   1. ESTADO GLOBAL
   ============================================================ */
const state = {
  tasks: [],
  currentDate: new Date(), // data de navegação (mês/semana visível)
  selectedDate: new Date(), // dia selecionado (painel lateral)
  miniCalDate: new Date(), // mês exibido no mini-calendário
  currentView: 'month', // 'month' | 'week' | 'agenda'
  theme: 'system', // 'light' | 'dark' | 'system'
  user: null,
  authMode: 'login',
  authChecked: false,
  dayPanelCollapsedMobile: false,
  filters: {
    type: 'all',
    priority: 'all',
    status: 'all',
    discipline: 'all',
    search: '',
  },
  editingTaskId: null,
  pendingDeleteId: null,
};

/* ============================================================
   2. SELETORES DOM
   ============================================================ */
const sel = {
  // layout
  sidebar: () => document.getElementById('sidebar'),
  sidebarOverlay: () => document.getElementById('sidebarOverlay'),
  hamburgerBtn: () => document.getElementById('hamburgerBtn'),
  sidebarCloseBtn: () => document.getElementById('sidebarCloseBtn'),

  // topbar
  topbarTitle: () => document.getElementById('topbarTitle'),
  btnPrev: () => document.getElementById('btnPrev'),
  btnNext: () => document.getElementById('btnNext'),
  btnToday: () => document.getElementById('btnToday'),
  searchInput: () => document.getElementById('searchInput'),
  btnViewMonth: () => document.getElementById('btnViewMonth'),
  btnViewWeek: () => document.getElementById('btnViewWeek'),
  btnViewAgenda: () => document.getElementById('btnViewAgenda'),
  authStatus: () => document.getElementById('authStatus'),
  authUserName: () => document.getElementById('authUserName'),
  authUserEmail: () => document.getElementById('authUserEmail'),
  btnLogout: () => document.getElementById('btnLogout'),
  themeToggleBtn: () => document.getElementById('themeToggleBtn'),
  btnNewTaskTop: () => document.getElementById('btnNewTaskTop'),
  btnNewTaskSidebar: () => document.getElementById('btnNewTaskSidebar'),
  fabBtn: () => document.getElementById('fabBtn'),

  // auth
  authScreen: () => document.getElementById('authScreen'),
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

  // filtros
  filterPriority: () => document.getElementById('filterPriority'),
  filterStatus: () => document.getElementById('filterStatus'),
  filterDiscipline: () => document.getElementById('filterDiscipline'),
  filterClearBtn: () => document.getElementById('filterClearBtn'),

  // calendário
  monthWeekdays: () => document.getElementById('monthWeekdays'),
  monthGrid: () => document.getElementById('monthGrid'),
  calendarMonth: () => document.getElementById('calendarMonth'),
  calendarWeek: () => document.getElementById('calendarWeek'),
  calendarAgenda: () => document.getElementById('calendarAgenda'),
  weekHeader: () => document.getElementById('weekHeader'),
  weekBody: () => document.getElementById('weekBody'),
  agendaList: () => document.getElementById('agendaList'),

  // mini calendário
  miniCalTitle: () => document.getElementById('miniCalTitle'),
  miniCalGrid: () => document.getElementById('miniCalGrid'),
  miniPrev: () => document.getElementById('miniPrev'),
  miniNext: () => document.getElementById('miniNext'),

  // painel do dia
  dayPanel: () => document.getElementById('dayPanel'),
  dayPanelDate: () => document.getElementById('dayPanelDate'),
  daySummary: () => document.getElementById('daySummary'),
  dayTasksList: () => document.getElementById('dayTasksList'),
  dayEmptyState: () => document.getElementById('dayEmptyState'),
  dayPanelAdd: () => document.getElementById('dayPanelAdd'),
  btnEmptyAdd: () => document.getElementById('btnEmptyAdd'),

  // sidebar extras
  upcomingList: () => document.getElementById('upcomingList'),
  sidebarAccount: () => document.getElementById('sidebarAccount'),
  accountGuest: () => document.getElementById('accountGuest'),
  accountMember: () => document.getElementById('accountMember'),
  sidebarUserName: () => document.getElementById('sidebarUserName'),
  sidebarUserEmail: () => document.getElementById('sidebarUserEmail'),
  sidebarUserAvatar: () => document.getElementById('sidebarUserAvatar'),
  sidebarLogoutBtn: () => document.getElementById('sidebarLogoutBtn'),
  statTotal: () => document.getElementById('statTotal'),
  statDone: () => document.getElementById('statDone'),
  statPending: () => document.getElementById('statPending'),
  typeFilterList: () => document.getElementById('typeFilterList'),

  // modal
  modalOverlay: () => document.getElementById('modalOverlay'),
  modal: () => document.getElementById('modal'),
  modalTitle: () => document.getElementById('modalTitle'),
  modalClose: () => document.getElementById('modalClose'),
  taskForm: () => document.getElementById('taskForm'),
  taskId: () => document.getElementById('taskId'),
  taskTitle: () => document.getElementById('taskTitle'),
  taskDescription: () => document.getElementById('taskDescription'),
  taskDate: () => document.getElementById('taskDate'),
  taskTime: () => document.getElementById('taskTime'),
  taskType: () => document.getElementById('taskType'),
  taskPriority: () => document.getElementById('taskPriority'),
  taskDiscipline: () => document.getElementById('taskDiscipline'),
  taskRecurrence: () => document.getElementById('taskRecurrence'),
  taskRecurrenceSemanas: () => document.getElementById('taskRecurrenceSemanas'),
  recurrenceWeeksWrap: () => document.getElementById('recurrenceWeeksWrap'),
  recurrenceHint: () => document.getElementById('recurrenceHint'),
  recurrenceSection: () => document.getElementById('recurrenceSection'),
  disciplineList: () => document.getElementById('disciplineList'),
  titleError: () => document.getElementById('titleError'),
  dateError: () => document.getElementById('dateError'),
  btnSave: () => document.getElementById('btnSave'),
  btnCancel: () => document.getElementById('btnCancel'),
  btnDeleteTask: () => document.getElementById('btnDeleteTask'),
  btnDuplicateTask: () => document.getElementById('btnDuplicateTask'),

  // confirm modal
  confirmOverlay: () => document.getElementById('confirmOverlay'),
  confirmDelete: () => document.getElementById('confirmDelete'),
  confirmCancel: () => document.getElementById('confirmCancel'),

  // toast
  toastContainer: () => document.getElementById('toastContainer'),
};

const appConfig = {
  apiBaseUrl: (window.APP_CONFIG?.API_BASE_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  ),
};

/* ============================================================
   3. UTILITÁRIOS DE DATA
   ============================================================ */
const utils = {
  /** Retorna novo Date sem efeitos colaterais */
  cloneDate(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  },

  /** yyyy-mm-dd → Date local */
  parseDate(str) {
    if (!str) return null;
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  },

  /** Date → yyyy-mm-dd */
  formatISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  },

  /** Date → "Segunda, 14 de março de 2025" */
  formatFull(d) {
    return d.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  },

  /** Date → "mar 2025" */
  formatMonthYear(d) {
    return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  },

  /** Date → "14 mar" */
  formatShort(d) {
    return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  },

  /** Dia da semana abreviado */
  weekdayShort(d) {
    return d
      .toLocaleDateString('pt-BR', { weekday: 'short' })
      .replace('.', '')
      .toLowerCase();
  },

  isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  },

  isToday(d) {
    return utils.isSameDay(d, new Date());
  },

  /** Retorna segunda-feira da semana que contém `d` */
  getWeekStart(d) {
    const day = d.getDay(); // 0=dom
    const diff = day === 0 ? -6 : 1 - day;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
  },

  /** Todos os dias de um mês incluindo preenchimento de grade */
  getMonthDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWd = firstDay.getDay(); // 0=dom
    // Grade começa na segunda (wd=1); ajuste para iniciar na segunda
    const offset = startWd === 0 ? 6 : startWd - 1;
    const days = [];
    // Dias do mês anterior
    for (let i = offset - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    // Dias do mês
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    // Dias do próximo mês (completar 6 semanas = 42 cells)
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push(new Date(year, month + 1, d));
    }
    return days;
  },

  /** Gera ID único */
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },

  /** Debounce simples */
  debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },
};

/* ============================================================
   4. CONFIGURAÇÕES DE TIPO
   ============================================================ */
const TYPE_CONFIG = {
  prova: { label: 'Prova', color: '#ef4444' },
  trabalho: { label: 'Trabalho', color: '#f97316' },
  estudo: { label: 'Estudo', color: '#3b82f6' },
  aula: { label: 'Aula', color: '#22c55e' },
  reuniao: { label: 'Reunião', color: '#f59e0b' },
  pessoal: { label: 'Pessoal', color: '#8b5cf6' },
  outro: { label: 'Outro', color: '#9ca3af' },
};

const WEEK_DAYS_PT = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

/* ============================================================
   5. STORAGE — CRUD PERSISTÊNCIA
   ============================================================ */
const storage = {
  KEY: 'academico_calendar_tasks',

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((t) => t && t.titulo && t.data);
    } catch (e) {
      console.warn('Erro ao carregar tarefas do localStorage:', e);
      return [];
    }
    if (sel.authStatus()) {
      sel.authStatus().classList.toggle('hidden', !loggedIn);
    }
    if (loggedIn && sel.authUserName() && sel.authUserEmail()) {
      sel.authUserName().textContent = state.user.name || 'Usuário';
      sel.authUserEmail().textContent = state.user.email || '';
    }
  },

  save(tasks) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Erro ao salvar tarefas:', e);
    }
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },

  exportJSON() {
    const blob = new Blob([JSON.stringify(state.tasks, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academico_tarefas_${utils.formatISO(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
};

const http = {
  async request(path, options = {}) {
    const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');
    const payload = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = new Error(payload?.message || 'Falha na comunicação com a API.');
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  },
};

const api = {
  auth: {
    me() {
      return http.request('/api/auth/me', { method: 'GET' });
    },
    register(data) {
      return http.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    login(data) {
      return http.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    logout() {
      return http.request('/api/auth/logout', { method: 'POST' });
    },
    getGoogleAuthUrl() {
      return `${appConfig.apiBaseUrl}/api/auth/google`;
    },
  },
  tasks: {
    list() {
      return http.request('/api/tasks', { method: 'GET' });
    },
    create(data) {
      return http.request('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    importMany(items) {
      return http.request('/api/tasks/import', {
        method: 'POST',
        body: JSON.stringify({ tasks: items }),
      });
    },
    update(id, data) {
      return http.request(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    remove(id) {
      return http.request(`/api/tasks/${id}`, { method: 'DELETE' });
    },
  },
};

const auth = {
  setMode(mode) {
    state.authMode = mode;
    if (!sel.authTabLogin() || !sel.authTabRegister()) return;
    const isRegister = mode === 'register';
    sel.authTabLogin().classList.toggle('active', !isRegister);
    sel.authTabRegister().classList.toggle('active', isRegister);
    sel.authNameWrap().classList.toggle('hidden', !isRegister);
    sel.authSubmitBtn().textContent = isRegister ? 'Criar conta' : 'Entrar';
    sel.authPassword().setAttribute(
      'autocomplete',
      isRegister ? 'new-password' : 'current-password',
    );
    sel.authFootnote().textContent = isRegister
      ? 'Crie uma conta para sincronizar os seus dados entre dispositivos.'
      : 'Suas tarefas serão vinculadas à sua conta.';
    this.clearError();
  },

  setUser(user) {
    state.user = user;
    this.render();
  },

  clearUser() {
    state.user = null;
    this.render();
  },

  render() {
    const loggedIn = Boolean(state.user);
    if (sel.accountGuest()) {
      sel.accountGuest().classList.toggle('hidden', loggedIn);
    }
    if (sel.accountMember()) {
      sel.accountMember().classList.toggle('hidden', !loggedIn);
    }

    if (loggedIn && sel.sidebarUserName() && sel.sidebarUserEmail()) {
      if (sel.authUserName()) {
        sel.authUserName().textContent = state.user.name || 'Usuário';
      }
      sel.sidebarUserEmail().textContent = state.user.email || '';
      sel.sidebarUserName().textContent = state.user.name || 'Usuário';
      if (sel.sidebarUserAvatar()) {
        const base = (state.user.name || state.user.email || 'U').trim();
        const initials = base
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part.charAt(0).toUpperCase())
          .join('');
        sel.sidebarUserAvatar().textContent = initials || 'U';
      }
    }
    if (sel.authStatus()) {
      sel.authStatus().classList.toggle('hidden', !loggedIn);
    }
    if (loggedIn && sel.authUserEmail()) {
      sel.authUserEmail().textContent = state.user.email || '';
    }
  },

  showError(message) {
    const node = sel.authError();
    if (!node) {
      showToast(message, 'error');
      return;
    }
    node.textContent = message;
    node.classList.remove('hidden');
  },

  clearError() {
    const node = sel.authError();
    if (!node) return;
    node.textContent = '';
    node.classList.add('hidden');
  },

  async submit() {
    const email = sel.authEmail().value.trim();
    const password = sel.authPassword().value;
    const name = sel.authName().value.trim();

    if (!email || !password) {
      this.showError('Preencha email e senha para continuar.');
      return;
    }

    if (state.authMode === 'register' && name.length < 2) {
      this.showError('Informe um nome com pelo menos 2 caracteres.');
      return;
    }

    this.clearError();
    sel.authSubmitBtn().disabled = true;
    sel.authSubmitBtn().textContent =
      state.authMode === 'register' ? 'Criando conta...' : 'Entrando...';

    try {
      const response =
        state.authMode === 'register'
          ? await api.auth.register({ name, email, password })
          : await api.auth.login({ email, password });

      this.setUser(response.user);
      state.authChecked = true;
      sel.authForm().reset();
      await tasks.loadRemote();
      await maybeImportLegacyTasks();
      renderAll();
      showToast(
        state.authMode === 'register'
          ? 'Conta criada com sucesso!'
          : 'Login realizado com sucesso!',
        'success',
      );
    } catch (error) {
      this.showError(error.message);
    } finally {
      sel.authSubmitBtn().disabled = false;
      this.setMode(state.authMode);
    }
  },

  async restoreSession() {
    try {
      const response = await api.auth.me();
      this.setUser(response.user);
    } catch (error) {
      this.clearUser();
      tasks.loadLocal();
      state.authChecked = true;
      this.render();
      return;
    }

    try {
      await tasks.loadRemote();
      await maybeImportLegacyTasks();
    } catch (error) {
      console.warn('Falha ao carregar tarefas remotas:', error);
      showToast('Sessão restaurada, mas houve falha ao carregar as tarefas.', 'info');
    }

    state.authChecked = true;
    this.render();
  },

  async logout() {
    try {
      await api.auth.logout();
    } catch (error) {
      console.warn('Falha ao encerrar sessão:', error);
    }

    this.clearUser();
    tasks.loadLocal();
    modal.close();
    confirmModal.close();
    this.setMode('login');
    renderAll();
    showToast('Sessão encerrada.', 'info');
  },

  handleProviderRedirectStatus() {
    const url = new URL(window.location.href);
    const status = url.searchParams.get('auth');
    if (!status) return;

    url.searchParams.delete('auth');
    window.history.replaceState({}, '', url.toString());

    if (status === 'success') {
      showToast('Login com Google concluído!', 'success');
      return;
    }

    if (status === 'google-disabled') {
      this.showError('O login com Google ainda não foi configurado no backend.');
      return;
    }

    this.showError('Não foi possível concluir o login com Google.');
  },
};

async function maybeImportLegacyTasks() {
  const legacyTasks = storage.load();
  if (!state.user || !legacyTasks.length || state.tasks.length > 0) return;

  const shouldImport = window.confirm(
    'Encontramos tarefas salvas apenas neste navegador. Deseja importá-las para a sua conta?',
  );

  if (!shouldImport) return;

  const payload = legacyTasks.map((task) => ({
    titulo: task.titulo,
    descricao: task.descricao || '',
    data: task.data,
    hora: task.hora || '',
    tipo: task.tipo || 'outro',
    prioridade: task.prioridade || 'media',
    status: task.status || 'pendente',
    disciplina: task.disciplina || '',
    recorrencia: task.recorrencia || 'nenhuma',
    recorrenciaSemanas: task.recorrenciaSemanas || null,
    recurrenceGroupId: task.recurrenceGroupId || null,
  }));

  const response = await api.tasks.importMany(payload);
  state.tasks = response.tasks;
  storage.clear();
  showToast('Tarefas locais importadas para a nuvem.', 'success');
}

/* ============================================================
   5b. CONTROLE DE TEMA
   ============================================================ */
const themeCtrl = {
  STORAGE_KEY: 'academico_theme',

  getEffectiveTheme() {
    if (state.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return state.theme;
  },

  apply() {
    const isDark = this.getEffectiveTheme() === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    const btn = sel.themeToggleBtn();
    if (!btn) return;
    const moon = btn.querySelector('.icon-moon');
    const sun = btn.querySelector('.icon-sun');
    if (moon) moon.classList.toggle('hidden', !isDark);
    if (sun) sun.classList.toggle('hidden', isDark);
    btn.setAttribute(
      'aria-label',
      isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro',
    );
  },

  toggle() {
    const effective = this.getEffectiveTheme();
    state.theme = effective === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.STORAGE_KEY, state.theme);
    this.apply();
    showToast(
      state.theme === 'dark'
        ? '🌙 Tema escuro ativado'
        : '☀️ Tema claro ativado',
      'info',
    );
  },

  load() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const allowed = ['light', 'dark', 'system'];
    state.theme = allowed.includes(saved) ? saved : 'system';
    this.apply();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (state.theme === 'system') this.apply();
    };
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onChange);
    }
  },
};

/* ============================================================
   6. CRUD DE TAREFAS
   ============================================================ */
const tasks = {
  getAll() {
    return state.tasks;
  },

  getFiltered() {
    const { type, priority, status, discipline, search } = state.filters;
    return state.tasks.filter((t) => {
      if (type !== 'all' && t.tipo !== type) return false;
      if (priority !== 'all' && t.prioridade !== priority) return false;
      if (status !== 'all' && t.status !== status) return false;
      if (discipline !== 'all' && t.disciplina !== discipline) return false;
      if (search) {
        const q = search.toLowerCase();
        const inTitle = (t.titulo || '').toLowerCase().includes(q);
        const inDesc = (t.descricao || '').toLowerCase().includes(q);
        const inDisc = (t.disciplina || '').toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inDisc) return false;
      }
      return true;
    });
  },

  getForDay(dateObj) {
    const iso = utils.formatISO(dateObj);
    return this.getFiltered()
      .filter((t) => t.data === iso)
      .sort((a, b) => {
        if (!a.hora && !b.hora) return 0;
        if (!a.hora) return 1;
        if (!b.hora) return -1;
        return a.hora.localeCompare(b.hora);
      });
  },

  getForDayAll(dateObj) {
    // Sem filtros (para preview no calendário e mini-cal)
    const iso = utils.formatISO(dateObj);
    return state.tasks
      .filter((t) => t.data === iso)
      .sort((a, b) => {
        if (!a.hora && !b.hora) return 0;
        if (!a.hora) return 1;
        if (!b.hora) return -1;
        return a.hora.localeCompare(b.hora);
      });
  },

  hasTasksOnDay(dateObj) {
    const iso = utils.formatISO(dateObj);
    return state.tasks.some((t) => t.data === iso);
  },

  loadLocal() {
    state.tasks = storage.load();
    return state.tasks;
  },

  async loadRemote() {
    const response = await api.tasks.list();
    state.tasks = response.tasks || [];
    return state.tasks;
  },

  async create(data) {
    const payload = {
      titulo: data.titulo.trim(),
      descricao: data.descricao || '',
      data: data.data,
      hora: data.hora || '',
      tipo: data.tipo || 'outro',
      prioridade: data.prioridade || 'media',
      status: data.status || 'pendente',
      disciplina: data.disciplina || '',
      recorrencia: data.recorrencia || 'nenhuma',
      recorrenciaSemanas:
        data.recorrencia === 'semanal'
          ? Math.min(
              Math.max(parseInt(data.recorrenciaSemanas, 10) || 4, 2),
              16,
            )
          : null,
      recurrenceGroupId: data.recurrenceGroupId || null,
    };

    if (!state.user) {
      const task = {
        ...payload,
        id: utils.uid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(task);
      storage.save(state.tasks);
      return task;
    }

    const response = await api.tasks.create(payload);
    state.tasks.push(response.task);
    return response.task;
  },

  async createRecurring(data) {
    const groupId = utils.uid();
    const baseDate = utils.parseDate(data.data);
    const weeks = Math.min(
      Math.max(parseInt(data.recorrenciaSemanas, 10) || 4, 2),
      16,
    );
    const payload = [];

    for (let i = 0; i < weeks; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i * 7);
      payload.push({
        titulo: data.titulo.trim(),
        descricao: data.descricao || '',
        data: utils.formatISO(d),
        hora: data.hora || '',
        tipo: data.tipo || 'aula',
        prioridade: data.prioridade || 'media',
        status: 'pendente',
        disciplina: data.disciplina || '',
        recorrencia: i === 0 ? 'semanal' : 'nenhuma',
        recorrenciaSemanas: i === 0 ? weeks : null,
        recurrenceGroupId: groupId,
      });
    }

    if (!state.user) {
      const created = payload.map((item) => ({
        ...item,
        id: utils.uid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      state.tasks.push(...created);
      storage.save(state.tasks);
      return created;
    }

    const response = await api.tasks.importMany(payload);
    state.tasks.push(...response.tasks);
    return response.tasks;
  },

  async update(id, data) {
    if (!state.user) {
      const idx = state.tasks.findIndex((t) => t.id === id);
      if (idx === -1) return null;
      state.tasks[idx] = {
        ...state.tasks[idx],
        ...data,
        id,
        updatedAt: new Date().toISOString(),
      };
      storage.save(state.tasks);
      return state.tasks[idx];
    }

    const response = await api.tasks.update(id, data);
    const idx = state.tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      state.tasks[idx] = response.task;
    }
    return response.task;
  },

  async toggle(id) {
    const t = state.tasks.find((item) => item.id === id);
    if (!t) return null;

    const nextStatus = t.status === 'concluida' ? 'pendente' : 'concluida';
    if (!state.user) {
      t.status = nextStatus;
      t.updatedAt = new Date().toISOString();
      storage.save(state.tasks);
      return t;
    }

    const response = await api.tasks.update(id, { status: nextStatus });
    const idx = state.tasks.findIndex((item) => item.id === id);
    if (idx !== -1) {
      state.tasks[idx] = response.task;
    }
    return response.task;
  },

  async delete(id) {
    if (state.user) {
      await api.tasks.remove(id);
    }
    state.tasks = state.tasks.filter((t) => t.id !== id);
    if (!state.user) {
      storage.save(state.tasks);
    }
  },

  async duplicate(id) {
    const t = state.tasks.find((item) => item.id === id);
    if (!t) return null;

    return this.create({
      titulo: t.titulo,
      descricao: t.descricao,
      data: t.data,
      hora: t.hora,
      tipo: t.tipo,
      prioridade: t.prioridade,
      disciplina: t.disciplina,
      recorrencia: 'nenhuma',
      recorrenciaSemanas: null,
      recurrenceGroupId: null,
      status: 'pendente',
    });
  },

  getDisciplines() {
    const set = new Set(state.tasks.map((t) => t.disciplina).filter(Boolean));
    return Array.from(set).sort();
  },

  getUpcoming(limit = 5) {
    const today = utils.formatISO(new Date());
    return state.tasks
      .filter((t) => t.data >= today && t.status !== 'concluida')
      .sort(
        (a, b) =>
          a.data.localeCompare(b.data) ||
          (a.hora || '').localeCompare(b.hora || ''),
      )
      .slice(0, limit);
  },

  getWeekStats() {
    const start = utils.getWeekStart(new Date());
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return utils.formatISO(d);
    });
    const weekTasks = state.tasks.filter((t) => days.includes(t.data));
    return {
      total: weekTasks.length,
      done: weekTasks.filter((t) => t.status === 'concluida').length,
      pending: weekTasks.filter((t) => t.status !== 'concluida').length,
    };
  },
};

/* ============================================================
   7. RENDERIZAÇÃO — CALENDÁRIO MENSAL
   ============================================================ */
const renderMonth = {
  init() {
    // Cabeçalho dos dias da semana
    const wd = sel.monthWeekdays();
    wd.innerHTML = '';
    WEEK_DAYS_PT.forEach((d) => {
      const el = document.createElement('div');
      el.className = 'weekday-header';
      el.setAttribute('aria-hidden', 'true');
      el.textContent = d;
      wd.appendChild(el);
    });
  },

  render() {
    const grid = sel.monthGrid();
    grid.innerHTML = '';
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const days = utils.getMonthDays(year, month);
    const todayISO = utils.formatISO(new Date());
    const selectedISO = utils.formatISO(state.selectedDate);

    days.forEach((day) => {
      const iso = utils.formatISO(day);
      const isCurrentMonth = day.getMonth() === month;
      const isToday = iso === todayISO;
      const isSelected = iso === selectedISO;
      const dayTasks = tasks.getForDayAll(day);
      const filteredDayTasks = tasks.getForDay(day);

      const cell = document.createElement('div');
      cell.className = [
        'month-day',
        !isCurrentMonth ? 'other-month' : '',
        isToday ? 'today' : '',
        isSelected ? 'selected' : '',
      ]
        .filter(Boolean)
        .join(' ');
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('aria-label', utils.formatFull(day));
      cell.dataset.date = iso;

      // Número do dia
      const numEl = document.createElement('div');
      numEl.className = 'day-number';
      numEl.textContent = day.getDate();
      cell.appendChild(numEl);

      // Preview de tarefas
      const preview = document.createElement('div');
      preview.className = 'day-tasks-preview';

      const displayTasks = filteredDayTasks.slice(0, 3);
      displayTasks.forEach((t) => {
        const pill = document.createElement('div');
        pill.className = `task-pill pill-${t.tipo} ${t.status === 'concluida' ? 'done-pill' : ''}`;
        pill.innerHTML = `
          <span class="task-pill-dot dot-${t.tipo}"></span>
          <span class="task-pill-text">${escHtml(t.titulo)}</span>
        `;
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          handlers.openEditModal(t.id);
        });
        preview.appendChild(pill);
      });

      const hiddenCount = filteredDayTasks.length - 3;
      if (hiddenCount > 0) {
        const more = document.createElement('div');
        more.className = 'tasks-more';
        more.textContent = `+${hiddenCount} mais`;
        more.setAttribute('aria-hidden', 'true');
        preview.appendChild(more);
      }

      cell.appendChild(preview);

      cell.addEventListener('click', () => handlers.selectDay(iso));
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlers.selectDay(iso);
        }
      });

      grid.appendChild(cell);
    });
  },
};

/* ============================================================
   8. RENDERIZAÇÃO — CALENDÁRIO SEMANAL
   ============================================================ */
const renderWeek = {
  render() {
    const header = sel.weekHeader();
    const body = sel.weekBody();
    header.innerHTML = '';
    body.innerHTML = '';

    const weekStart = utils.getWeekStart(state.currentDate);
    const todayISO = utils.formatISO(new Date());
    const selectedISO = utils.formatISO(state.selectedDate);

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const iso = utils.formatISO(day);
      const isToday = iso === todayISO;
      const isSelected = iso === selectedISO;

      // Header
      const hd = document.createElement('div');
      hd.className = [
        'week-header-day',
        isToday ? 'today-header' : '',
        isSelected ? 'selected-header' : '',
      ]
        .filter(Boolean)
        .join(' ');
      hd.dataset.date = iso;
      hd.innerHTML = `
        <div class="week-day-name">${WEEK_DAYS_PT[i]}</div>
        <div class="week-day-num">${day.getDate()}</div>
      `;
      hd.addEventListener('click', () => handlers.selectDay(iso));
      header.appendChild(hd);

      // Body
      const col = document.createElement('div');
      col.className = [
        'week-day-col',
        isToday ? 'today-col' : '',
        isSelected ? 'selected-col' : '',
      ]
        .filter(Boolean)
        .join(' ');
      col.dataset.date = iso;

      const dayTasks = tasks.getForDay(day);

      if (dayTasks.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'week-day-empty';
        empty.textContent = 'Livre';
        col.appendChild(empty);
      } else {
        dayTasks.forEach((t) => {
          const card = document.createElement('div');
          card.className = `week-task-card pill-${t.tipo}`;
          card.innerHTML = `
            ${t.hora ? `<span class="week-task-time">${t.hora}</span>` : ''}
            <span class="week-task-title">${escHtml(t.titulo)}</span>
          `;
          card.addEventListener('click', (e) => {
            e.stopPropagation();
            handlers.openEditModal(t.id);
          });
          col.appendChild(card);
        });
      }

      col.addEventListener('click', () => handlers.selectDay(iso));
      body.appendChild(col);
    }
  },
};

/* ============================================================
   9. RENDERIZAÇÃO — AGENDA VIEW
   ============================================================ */
const renderAgenda = {
  render() {
    const list = sel.agendaList();
    list.innerHTML = '';

    // Mostra 90 dias a partir da data atual
    const today = utils.cloneDate(new Date());
    const filteredAll = tasks.getFiltered();

    // Agrupar por data
    const grouped = {};
    filteredAll.forEach((t) => {
      if (!grouped[t.data]) grouped[t.data] = [];
      grouped[t.data].push(t);
    });

    const sortedDates = Object.keys(grouped).sort();

    if (sortedDates.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'agenda-empty';
      empty.textContent = state.filters.search
        ? 'Nenhuma tarefa encontrada para esta busca.'
        : 'Nenhuma tarefa cadastrada ainda.';
      list.appendChild(empty);
      return;
    }

    sortedDates.forEach((iso) => {
      const dayDate = utils.parseDate(iso);
      const dayTasks = grouped[iso].sort((a, b) =>
        (a.hora || '').localeCompare(b.hora || ''),
      );
      const isTodayDate = utils.isSameDay(dayDate, today);

      const group = document.createElement('div');
      group.className = 'agenda-day-group';

      const label = dayDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

      group.innerHTML = `
        <div class="agenda-day-header">
          <span class="agenda-day-label ${isTodayDate ? 'today-label' : ''}">${label}</span>
          <span class="agenda-day-count">${dayTasks.length} tarefa${dayTasks.length > 1 ? 's' : ''}</span>
        </div>
        <div class="agenda-day-tasks" id="agt-${iso}"></div>
      `;

      const tasksCont = group.querySelector(`#agt-${iso}`);

      dayTasks.forEach((t) => {
        const typeConf = TYPE_CONFIG[t.tipo] || TYPE_CONFIG.outro;
        const row = document.createElement('div');
        row.className = 'agenda-task-row';
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.innerHTML = `
          <div class="agenda-task-type-bar bar-${t.tipo}"></div>
          <div class="agenda-task-info">
            <div class="agenda-task-title ${t.status === 'concluida' ? 'done-title' : ''}">${escHtml(t.titulo)}${renderRecurrenceBadge(t)}</div>
            <div class="agenda-task-meta">
              <span class="agenda-meta-chip badge-${t.tipo}">${typeConf.label}</span>
              ${t.disciplina ? `<span class="task-discipline-tag">${escHtml(t.disciplina)}</span>` : ''}
              <span class="task-priority-badge priority-${t.prioridade}">${capitalize(t.prioridade)}</span>
            </div>
          </div>
          ${t.hora ? `<span class="agenda-task-time">${t.hora}</span>` : ''}
          <div class="agenda-task-actions">
            <button class="task-card-edit-btn" aria-label="Editar tarefa" data-id="${t.id}">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
            </button>
          </div>
        `;
        row.addEventListener('click', () => handlers.openEditModal(t.id));
        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') handlers.openEditModal(t.id);
        });
        tasksCont.appendChild(row);
      });

      list.appendChild(group);
    });
  },
};

/* ============================================================
   10. RENDERIZAÇÃO — MINI CALENDÁRIO
   ============================================================ */
const renderMiniCal = {
  render() {
    const grid = sel.miniCalGrid();
    const titleEl = sel.miniCalTitle();
    const year = state.miniCalDate.getFullYear();
    const month = state.miniCalDate.getMonth();

    titleEl.textContent = state.miniCalDate.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });

    grid.innerHTML = '';

    // Cabeçalho
    ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].forEach((d) => {
      const el = document.createElement('div');
      el.className = 'mini-cal-day-name';
      el.textContent = d;
      el.setAttribute('aria-hidden', 'true');
      grid.appendChild(el);
    });

    const days = utils.getMonthDays(year, month);
    const todayISO = utils.formatISO(new Date());
    const selectedISO = utils.formatISO(state.selectedDate);

    days.forEach((day) => {
      const iso = utils.formatISO(day);
      const el = document.createElement('div');
      el.className = [
        'mini-cal-day',
        day.getMonth() !== month ? 'other-month' : '',
        iso === todayISO ? 'today' : '',
        iso === selectedISO ? 'selected' : '',
        tasks.hasTasksOnDay(day) ? 'has-tasks' : '',
      ]
        .filter(Boolean)
        .join(' ');
      el.textContent = day.getDate();
      el.setAttribute('role', 'gridcell');
      el.setAttribute('tabindex', '-1');
      el.addEventListener('click', () => {
        state.currentDate = utils.cloneDate(day);
        handlers.selectDay(iso);
      });
      grid.appendChild(el);
    });
  },
};

/* ============================================================
   11. RENDERIZAÇÃO — PAINEL DO DIA
   ============================================================ */
const renderDayPanel = {
  render() {
    const selected = state.selectedDate;
    const iso = utils.formatISO(selected);
    const dayTasks = tasks.getForDay(selected);

    // Título
    const dateStr = selected.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    sel.dayPanelDate().textContent = capitalize(dateStr);

    // Sumário
    const summary = sel.daySummary();
    const total = dayTasks.length;
    const done = dayTasks.filter((t) => t.status === 'concluida').length;
    const pending = total - done;

    if (total > 0) {
      summary.innerHTML = `
        <span class="summary-chip chip-total">${total} total</span>
        <span class="summary-chip chip-done">✓ ${done}</span>
        <span class="summary-chip chip-pending">○ ${pending}</span>
      `;
    } else {
      summary.innerHTML = '';
    }

    // Lista de tarefas
    const list = sel.dayTasksList();
    const emptyState = sel.dayEmptyState();
    list.innerHTML = '';

    if (dayTasks.length === 0) {
      emptyState.classList.remove('hidden');
      list.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      list.classList.remove('hidden');
      dayTasks.forEach((t) => {
        list.appendChild(renderDayPanel.buildTaskCard(t));
      });
    }

    this.syncMobileState();
  },

  syncMobileState() {
    const panel = sel.dayPanel();
    const btn = sel.dayPanelAdd();
    const body = document.body;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (!isMobile) {
      state.dayPanelCollapsedMobile = false;
      panel.classList.remove('collapsed-mobile');
      body.classList.remove('day-panel-collapsed-mobile');
      btn.setAttribute('aria-label', 'Adicionar tarefa neste dia');
      btn.setAttribute('aria-expanded', 'true');
      return;
    }

    panel.classList.toggle('collapsed-mobile', state.dayPanelCollapsedMobile);
    body.classList.toggle(
      'day-panel-collapsed-mobile',
      state.dayPanelCollapsedMobile,
    );
    btn.setAttribute(
      'aria-label',
      state.dayPanelCollapsedMobile
        ? 'Expandir painel do dia'
        : 'Minimizar painel do dia',
    );
    btn.setAttribute('aria-expanded', String(!state.dayPanelCollapsedMobile));
  },

  buildTaskCard(t) {
    const typeConf = TYPE_CONFIG[t.tipo] || TYPE_CONFIG.outro;
    const card = document.createElement('div');
    card.className = `task-card card-${t.tipo} ${t.status === 'concluida' ? 'completed' : ''}`;
    card.dataset.id = t.id;

    card.innerHTML = `
      <div class="task-card-header">
        <div class="task-checkbox ${t.status === 'concluida' ? 'checked' : ''}" 
             role="checkbox" 
             aria-checked="${t.status === 'concluida'}"
             aria-label="Marcar como ${t.status === 'concluida' ? 'pendente' : 'concluída'}"
             tabindex="0"
             data-id="${t.id}">
          <svg class="task-checkbox-icon" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="task-card-title">${escHtml(t.titulo)}${renderRecurrenceBadge(t)}</span>
        <button class="task-card-edit-btn" aria-label="Editar tarefa" data-id="${t.id}">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8.5 1.5l3 3L4 12H1v-3L8.5 1.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="task-card-meta">
        <span class="task-meta-badge badge-${t.tipo}">${typeConf.label}</span>
        ${t.disciplina ? `<span class="task-discipline-tag">${escHtml(t.disciplina)}</span>` : ''}
        <span class="task-priority-badge priority-${t.prioridade}">${capitalize(t.prioridade)}</span>
        ${
          t.hora
            ? `<span class="task-time-badge">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1.2"/><path d="M5 3v2.5L6.5 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          ${t.hora}
        </span>`
            : ''
        }
      </div>
    `;

    // Checkbox toggle
    const checkbox = card.querySelector('.task-checkbox');
    checkbox.addEventListener('click', async () => {
      const updated = await tasks.toggle(t.id);
      renderAll();
      showToast(
        updated?.status === 'concluida'
          ? '✓ Tarefa concluída!'
          : 'Tarefa marcada como pendente',
        'success',
      );
    });
    checkbox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        checkbox.click();
      }
    });

    // Editar
    card.querySelector('.task-card-edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handlers.openEditModal(t.id);
    });

    return card;
  },
};

/* ============================================================
   12. RENDERIZAÇÃO — SIDEBAR (PRAZOS + STATS)
   ============================================================ */
const renderSidebar = {
  render() {
    // Próximos prazos
    const upcoming = tasks.getUpcoming(5);
    const list = sel.upcomingList();
    list.innerHTML = '';

    if (upcoming.length === 0) {
      list.innerHTML = '<p class="upcoming-empty">Nenhum prazo próximo 🎉</p>';
    } else {
      upcoming.forEach((t) => {
        const d = utils.parseDate(t.data);
        const item = document.createElement('div');
        item.className = 'upcoming-item';
        item.innerHTML = `
          <div class="upcoming-item-bar bar-${t.tipo}"></div>
          <div class="upcoming-item-content">
            <div class="upcoming-item-title">${escHtml(t.titulo)}</div>
            <div class="upcoming-item-meta">${utils.formatShort(d)}${t.hora ? ' · ' + t.hora : ''}${t.disciplina ? ' · ' + t.disciplina : ''}</div>
          </div>
        `;
        item.addEventListener('click', () => handlers.openEditModal(t.id));
        list.appendChild(item);
      });
    }

    // Estatísticas da semana
    const stats = tasks.getWeekStats();
    if (sel.statTotal()) sel.statTotal().textContent = stats.total;
    if (sel.statDone()) sel.statDone().textContent = stats.done;
    if (sel.statPending()) sel.statPending().textContent = stats.pending;
  },
};

/* ============================================================
   13. RENDERIZAÇÃO — FILTRO DE DISCIPLINAS
   ============================================================ */
const renderFilters = {
  updateDisciplineSelect() {
    const select = sel.filterDiscipline();
    const disciplines = tasks.getDisciplines();
    const current = select.value;
    // Preserva opção 'all'
    Array.from(select.options)
      .slice(1)
      .forEach((o) => o.remove());
    disciplines.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      if (d === current) opt.selected = true;
      select.appendChild(opt);
    });
    // Datalist
    const dl = sel.disciplineList();
    dl.innerHTML = '';
    disciplines.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d;
      dl.appendChild(opt);
    });
  },
};

/* ============================================================
   14. RENDERIZAÇÃO — TOPBAR TÍTULO
   ============================================================ */
const renderTopbar = {
  render() {
    const title = sel.topbarTitle();
    if (state.currentView === 'month') {
      title.textContent = capitalize(utils.formatMonthYear(state.currentDate));
    } else if (state.currentView === 'week') {
      const weekStart = utils.getWeekStart(state.currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      title.textContent = `${utils.formatShort(weekStart)} – ${utils.formatShort(weekEnd)}`;
    } else {
      title.textContent = 'Agenda';
    }
  },
};

/* ============================================================
   15. RENDER ALL — atualiza toda a UI
   ============================================================ */
function renderAll() {
  renderTopbar.render();
  renderMiniCal.render();
  renderSidebar.render();
  renderFilters.updateDisciplineSelect();
  renderDayPanel.render();

  if (state.currentView === 'month') {
    renderMonth.render();
  } else if (state.currentView === 'week') {
    renderWeek.render();
  } else {
    renderAgenda.render();
  }
}

/* ============================================================
   16. HANDLERS — Eventos principais
   ============================================================ */
const handlers = {
  selectDay(iso) {
    state.selectedDate = utils.parseDate(iso);
    // Sincroniza mini-cal se necessário
    if (
      state.miniCalDate.getFullYear() !== state.selectedDate.getFullYear() ||
      state.miniCalDate.getMonth() !== state.selectedDate.getMonth()
    ) {
      state.miniCalDate = utils.cloneDate(state.selectedDate);
    }
    renderAll();
  },

  navigatePrev() {
    if (state.currentView === 'month') {
      state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() - 1,
        1,
      );
    } else if (state.currentView === 'week') {
      state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth(),
        state.currentDate.getDate() - 7,
      );
    }
    renderAll();
  },

  navigateNext() {
    if (state.currentView === 'month') {
      state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() + 1,
        1,
      );
    } else if (state.currentView === 'week') {
      state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth(),
        state.currentDate.getDate() + 7,
      );
    }
    renderAll();
  },

  goToday() {
    const today = new Date();
    state.currentDate = utils.cloneDate(today);
    state.selectedDate = utils.cloneDate(today);
    state.miniCalDate = utils.cloneDate(today);
    renderAll();
  },

  setView(view) {
    state.currentView = view;
    // Mostrar/ocultar views
    sel.calendarMonth().classList.toggle('hidden', view !== 'month');
    sel.calendarWeek().classList.toggle('hidden', view !== 'week');
    sel.calendarAgenda().classList.toggle('hidden', view !== 'agenda');
    // Atualizar botões
    document.querySelectorAll('.view-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    renderAll();
  },

  // ---- MODAL ----
  openNewModal(date) {
    state.editingTaskId = null;
    sel.modalTitle().textContent = 'Nova tarefa';
    sel.taskForm().reset();
    sel.taskId().value = '';
    sel.taskDate().value = date || utils.formatISO(state.selectedDate);
    sel.taskType().value = 'estudo';
    sel.taskPriority().value = 'media';
    sel.btnDeleteTask().classList.add('hidden');
    sel.btnDuplicateTask().classList.add('hidden');
    sel.titleError().textContent = '';
    sel.dateError().textContent = '';
    sel.taskTitle().classList.remove('error');
    sel.taskDate().classList.remove('error');
    sel.recurrenceSection().style.display = '';
    sel.taskRecurrence().value = 'nenhuma';
    sel.taskRecurrenceSemanas().value = '4';
    sel.recurrenceWeeksWrap().classList.add('hidden');
    sel.recurrenceHint().classList.add('hidden');
    sel.recurrenceHint().textContent = '';
    modal.open();
    setTimeout(() => sel.taskTitle().focus(), 100);
  },

  openEditModal(id) {
    const t = state.tasks.find((t) => t.id === id);
    if (!t) return;
    state.editingTaskId = id;
    sel.modalTitle().textContent = 'Editar tarefa';
    sel.taskId().value = t.id;
    sel.taskTitle().value = t.titulo;
    sel.taskDescription().value = t.descricao || '';
    sel.taskDate().value = t.data;
    sel.taskTime().value = t.hora || '';
    sel.taskType().value = t.tipo;
    sel.taskPriority().value = t.prioridade;
    sel.taskDiscipline().value = t.disciplina || '';
    sel.btnDeleteTask().classList.remove('hidden');
    sel.btnDuplicateTask().classList.remove('hidden');
    sel.titleError().textContent = '';
    sel.dateError().textContent = '';
    sel.taskTitle().classList.remove('error');
    sel.taskDate().classList.remove('error');
    sel.recurrenceSection().style.display = 'none';
    modal.open();
    setTimeout(() => sel.taskTitle().focus(), 100);
  },

  async saveTask(e) {
    e.preventDefault();
    const title = sel.taskTitle().value.trim();
    const date = sel.taskDate().value;
    let valid = true;

    if (!title) {
      sel.titleError().textContent = 'Título é obrigatório.';
      sel.taskTitle().classList.add('error');
      sel.taskTitle().focus();
      valid = false;
    } else {
      sel.titleError().textContent = '';
      sel.taskTitle().classList.remove('error');
    }

    if (!date) {
      sel.dateError().textContent = 'Data é obrigatória.';
      sel.taskDate().classList.add('error');
      if (valid) sel.taskDate().focus();
      valid = false;
    } else {
      sel.dateError().textContent = '';
      sel.taskDate().classList.remove('error');
    }

    if (!valid) return;

    const data = {
      titulo: title,
      descricao: sel.taskDescription().value,
      data: date,
      hora: sel.taskTime().value,
      tipo: sel.taskType().value,
      prioridade: sel.taskPriority().value,
      disciplina: sel.taskDiscipline().value.trim(),
    };

    const recorrencia = sel.taskRecurrence().value;
    const semanas = Math.min(
      Math.max(parseInt(sel.taskRecurrenceSemanas().value, 10) || 4, 2),
      16,
    );

    try {
      sel.btnSave().disabled = true;

      if (!state.editingTaskId && recorrencia === 'semanal') {
      data.recorrencia = 'semanal';
      data.recorrenciaSemanas = semanas;
      const created = await tasks.createRecurring(data);
      state.selectedDate = utils.parseDate(data.data);
      modal.close();
      renderAll();
      showToast(
        `${created.length} aulas criadas para as próximas ${semanas} semanas!`,
        'success',
      );
      return;
    }

    if (state.editingTaskId) {
      await tasks.update(state.editingTaskId, data);
      showToast('Tarefa atualizada!', 'success');
    } else {
      await tasks.create(data);
      // Seleciona a data da nova tarefa
      state.selectedDate = utils.parseDate(date);
      showToast('Tarefa criada com sucesso!', 'success');
    }

      modal.close();
      renderAll();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      sel.btnSave().disabled = false;
    }
  },

  deleteTask() {
    if (!state.editingTaskId) return;
    state.pendingDeleteId = state.editingTaskId;
    modal.close();
    confirmModal.open();
  },

  async confirmDeleteTask() {
    if (state.pendingDeleteId) {
      await tasks.delete(state.pendingDeleteId);
      state.pendingDeleteId = null;
      showToast('Tarefa excluída.', 'info');
      confirmModal.close();
      renderAll();
    }
  },

  async duplicateTask() {
    if (!state.editingTaskId) return;
    await tasks.duplicate(state.editingTaskId);
    modal.close();
    showToast('Tarefa duplicada!', 'success');
    renderAll();
  },
};

/* ============================================================
   17. MODAL — controle de abertura/fechamento
   ============================================================ */
const modal = {
  open() {
    sel.modalOverlay().classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },
  close() {
    sel.modalOverlay().classList.add('hidden');
    document.body.style.overflow = '';
    state.editingTaskId = null;
  },
};

const confirmModal = {
  open() {
    sel.confirmOverlay().classList.remove('hidden');
  },
  close() {
    sel.confirmOverlay().classList.add('hidden');
    state.pendingDeleteId = null;
  },
};

/* ============================================================
   18. TOAST
   ============================================================ */
function showToast(message, type = 'info') {
  const container = sel.toastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success:
      '<path d="M3 6l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    error:
      '<path d="M4 4l6 6M10 4L4 10" stroke="white" stroke-width="1.8" stroke-linecap="round"/>',
    info: '<path d="M7 3.2v4.2" stroke="white" stroke-width="1.9" stroke-linecap="round"/><circle cx="7" cy="10.3" r="1.05" fill="white"/>',
  };

  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">${icons[type] || icons.info}</svg>
    </div>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 100);
  }, 3000);
}

/* ============================================================
   19. SIDEBAR MOBILE
   ============================================================ */
const sidebarCtrl = {
  open() {
    sel.sidebar().classList.add('open');
    sel.sidebarOverlay().classList.add('active');
    sel.hamburgerBtn().setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  },
  close() {
    sel.sidebar().classList.remove('open');
    sel.sidebarOverlay().classList.remove('active');
    sel.hamburgerBtn().setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  },
};

/* ============================================================
   20. UTILITÁRIOS DE TEMPLATE
   ============================================================ */
function escHtml(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return String(str || '').replace(/[&<>"']/g, (m) => map[m]);
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function renderRecurrenceBadge(task) {
  if (!task || !task.recurrenceGroupId) return '';
  return `
    <span class="recurrence-badge" title="Tarefa recorrente" aria-label="Recorrente">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M9 3A4.5 4.5 0 1 0 9.5 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 1l2 2-2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  `;
}

function renderRecurrenceHint() {
  const hint = sel.recurrenceHint();
  const recurrence = sel.taskRecurrence();
  if (!hint || !recurrence || recurrence.value !== 'semanal') return;

  const weeks = Math.min(
    Math.max(parseInt(sel.taskRecurrenceSemanas().value, 10) || 4, 2),
    16,
  );
  const dateStr = sel.taskDate().value;

  if (!dateStr || weeks < 2) {
    hint.textContent = '';
    return;
  }

  const start = utils.parseDate(dateStr);
  const end = new Date(start);
  end.setDate(start.getDate() + (weeks - 1) * 7);
  hint.textContent = `Serão criadas ${weeks} ocorrências: ${utils.formatShort(start)} até ${utils.formatShort(end)}.`;
}

/* ============================================================
   21. BINDING DE EVENTOS
   ============================================================ */
function bindEvents() {
  // Sidebar mobile
  sel
    .hamburgerBtn()
    .addEventListener('click', sidebarCtrl.open.bind(sidebarCtrl));
  sel
    .sidebarCloseBtn()
    .addEventListener('click', sidebarCtrl.close.bind(sidebarCtrl));
  sel
    .sidebarOverlay()
    .addEventListener('click', sidebarCtrl.close.bind(sidebarCtrl));

  // Navegação
  sel.btnPrev().addEventListener('click', handlers.navigatePrev.bind(handlers));
  sel.btnNext().addEventListener('click', handlers.navigateNext.bind(handlers));
  sel.btnToday().addEventListener('click', handlers.goToday.bind(handlers));
  document
    .getElementById('themeToggleBtn')
    .addEventListener('click', () => themeCtrl.toggle());
  if (sel.authTabLogin() && sel.authTabRegister() && sel.authForm()) {
    sel.authTabLogin().addEventListener('click', () => auth.setMode('login'));
    sel.authTabRegister().addEventListener('click', () => auth.setMode('register'));
    sel.authForm().addEventListener('submit', async (e) => {
      e.preventDefault();
      await auth.submit();
    });
  }

  if (sel.btnGoogleLogin()) {
    sel.btnGoogleLogin().addEventListener('click', () => {
      window.location.href = api.auth.getGoogleAuthUrl();
    });
  }

  if (sel.sidebarLogoutBtn()) {
    sel.sidebarLogoutBtn().addEventListener('click', async () => {
      await auth.logout();
    });
  }

  // Mini calendário navegação
  sel.miniPrev().addEventListener('click', () => {
    state.miniCalDate = new Date(
      state.miniCalDate.getFullYear(),
      state.miniCalDate.getMonth() - 1,
      1,
    );
    renderMiniCal.render();
  });
  sel.miniNext().addEventListener('click', () => {
    state.miniCalDate = new Date(
      state.miniCalDate.getFullYear(),
      state.miniCalDate.getMonth() + 1,
      1,
    );
    renderMiniCal.render();
  });

  // Views (topbar + sidebar mobile)
  document.querySelectorAll('.view-btn[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      handlers.setView(btn.dataset.view);
      // Se selecionou view dentro da sidebar móvel, fecha o drawer.
      if (sel.sidebar().classList.contains('open') && btn.closest('#sidebar')) {
        sidebarCtrl.close();
      }
    });
  });

  // Nova tarefa (botões múltiplos)
  [sel.btnNewTaskTop, sel.btnNewTaskSidebar, sel.fabBtn].forEach((fn) => {
    fn().addEventListener('click', () => handlers.openNewModal());
  });

  // Botões de adicionar no painel do dia
  sel.dayPanelAdd().addEventListener('click', () => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      state.dayPanelCollapsedMobile = !state.dayPanelCollapsedMobile;
      renderDayPanel.syncMobileState();
      return;
    }
    handlers.openNewModal();
  });
  sel.btnEmptyAdd().addEventListener('click', () => handlers.openNewModal());

  const dayPanelMq = window.matchMedia('(max-width: 767px)');
  const syncDayPanelState = () => renderDayPanel.syncMobileState();
  if (typeof dayPanelMq.addEventListener === 'function') {
    dayPanelMq.addEventListener('change', syncDayPanelState);
  } else if (typeof dayPanelMq.addListener === 'function') {
    dayPanelMq.addListener(syncDayPanelState);
  }

  // Filtros por tipo (sidebar)
  sel.typeFilterList().addEventListener('click', (e) => {
    const btn = e.target.closest('.type-filter-item');
    if (!btn) return;
    document
      .querySelectorAll('.type-filter-item')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.filters.type = btn.dataset.type;
    renderAll();
  });

  // Filtros topbar
  sel.filterPriority().addEventListener('change', (e) => {
    state.filters.priority = e.target.value;
    renderAll();
  });
  sel.filterStatus().addEventListener('change', (e) => {
    state.filters.status = e.target.value;
    renderAll();
  });
  sel.filterDiscipline().addEventListener('change', (e) => {
    state.filters.discipline = e.target.value;
    renderAll();
  });
  sel.filterClearBtn().addEventListener('click', () => {
    state.filters = {
      type: 'all',
      priority: 'all',
      status: 'all',
      discipline: 'all',
      search: '',
    };
    sel.filterPriority().value = 'all';
    sel.filterStatus().value = 'all';
    sel.filterDiscipline().value = 'all';
    sel.searchInput().value = '';
    document
      .querySelectorAll('.type-filter-item')
      .forEach((b) => b.classList.remove('active'));
    document
      .querySelector('.type-filter-item[data-type="all"]')
      .classList.add('active');
    renderAll();
  });

  // Busca com debounce
  const debouncedSearch = utils.debounce((val) => {
    state.filters.search = val;
    renderAll();
  }, 280);

  sel.searchInput().addEventListener('input', (e) => {
    debouncedSearch(e.target.value.trim());
  });

  // Modal — formulário
  sel.taskForm().addEventListener('submit', handlers.saveTask.bind(handlers));
  sel.taskRecurrence().addEventListener('change', (e) => {
    const isSemanal = e.target.value === 'semanal';
    sel.recurrenceWeeksWrap().classList.toggle('hidden', !isSemanal);
    sel.recurrenceHint().classList.toggle('hidden', !isSemanal);
    if (!isSemanal) {
      sel.recurrenceHint().textContent = '';
      return;
    }
    renderRecurrenceHint();
  });
  sel.taskRecurrenceSemanas().addEventListener('input', () => {
    const val = parseInt(sel.taskRecurrenceSemanas().value, 10);
    if (!Number.isNaN(val)) {
      const clamped = Math.min(Math.max(val, 2), 16);
      sel.taskRecurrenceSemanas().value = String(clamped);
    }
    renderRecurrenceHint();
  });
  sel.taskDate().addEventListener('change', renderRecurrenceHint);
  sel.btnCancel().addEventListener('click', modal.close.bind(modal));
  sel.modalClose().addEventListener('click', modal.close.bind(modal));
  sel
    .btnDeleteTask()
    .addEventListener('click', handlers.deleteTask.bind(handlers));
  sel
    .btnDuplicateTask()
    .addEventListener('click', handlers.duplicateTask.bind(handlers));

  // Fechar modal clicando no overlay
  sel.modalOverlay().addEventListener('click', (e) => {
    if (e.target === sel.modalOverlay()) modal.close();
  });

  // Confirm modal
  sel
    .confirmDelete()
    .addEventListener('click', handlers.confirmDeleteTask.bind(handlers));
  sel
    .confirmCancel()
    .addEventListener('click', confirmModal.close.bind(confirmModal));
  sel.confirmOverlay().addEventListener('click', (e) => {
    if (e.target === sel.confirmOverlay()) confirmModal.close();
  });

  // Teclado global
  document.addEventListener('keydown', (e) => {
    // ESC fecha modais
    if (e.key === 'Escape') {
      if (!sel.modalOverlay().classList.contains('hidden')) {
        modal.close();
        return;
      }
      if (!sel.confirmOverlay().classList.contains('hidden')) {
        confirmModal.close();
        return;
      }
      if (sel.sidebar().classList.contains('open')) {
        sidebarCtrl.close();
        return;
      }
    }
    // N = nova tarefa (fora do modal/input)
    if (e.key === 'n' || e.key === 'N') {
      const tag = document.activeElement?.tagName;
      const inInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
      const modalOpen = !sel.modalOverlay().classList.contains('hidden');
      if (!inInput && !modalOpen) {
        e.preventDefault();
        handlers.openNewModal();
      }
    }
  });
}

/* ============================================================
   22. INICIALIZAÇÃO
   ============================================================ */
async function init() {
  themeCtrl.load();
  auth.setMode('login');
  auth.handleProviderRedirectStatus();
  tasks.loadLocal();

  // Renderizar estrutura base do mês
  renderMonth.init();

  // Binding
  bindEvents();

  // View inicial
  handlers.setView('month');

  await auth.restoreSession();

  // Render geral
  renderAll();

  console.log(
    '%c✓ Acadêmico iniciado',
    'color: #3b5bdb; font-weight: 700; font-size: 14px;',
  );
}

// Aguarda DOM pronto
document.addEventListener('DOMContentLoaded', () => {
  init().catch((error) => {
    console.error('Falha ao iniciar aplicação:', error);
    showToast('Não foi possível iniciar a aplicação.', 'error');
  });
});
