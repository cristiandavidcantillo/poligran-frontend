const routes = {
  '#/home': '/Page/home/index.html',
  '#/login': '/Page/login/login.html',
  '#/register': '/Page/login/register.html',
  '#/menu': '/Page/menu/index.html',
};

const app = document.getElementById('app');

async function navigate(event, path) {
  if (event) event.preventDefault();
  window.history.pushState({}, '', path);
  await loadContent(path);
  return false;
}

async function loadContent() {
  const path = window.location.hash || '#/login';
  const route = routes[path];

  if (route) {
    try {
      const res = await fetch(route);
      const html = await res.text();
      app.innerHTML = html;
    } catch (err) {
      app.innerHTML = '<h1>Error al cargar el contenido</h1>';
    }
  } else {
    app.innerHTML = '<h1>404 - Página no encontrada</h1>';
  }
}

window.addEventListener('popstate', () => {
  loadContent(location.pathname);
});

loadContent(location.pathname);
