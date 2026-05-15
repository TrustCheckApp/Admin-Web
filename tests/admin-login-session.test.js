const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const exists = (path) => existsSync(join(root, path));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const requiredFiles = [
  'app/auth/login/actions.ts',
  'app/auth/login/page.tsx',
  'app/api/admin/auth/logout/route.ts',
  'lib/session.ts',
  'docs/admin-auth-session.md',
  'docs/admin-web-roadmap.md',
];

for (const file of requiredFiles) {
  assert(exists(file), `Arquivo obrigatório não encontrado: ${file}`);
}

const actions = read('app/auth/login/actions.ts');
const page = read('app/auth/login/page.tsx');
const logout = read('app/api/admin/auth/logout/route.ts');
const session = read('lib/session.ts');
const authDocs = read('docs/admin-auth-session.md');
const roadmap = read('docs/admin-web-roadmap.md');

const actionTerms = [
  "'use server'",
  'ADMIN_SESSION_COOKIE',
  'getAdminSessionCookieOptions',
  'cookies().set',
  'redirect(',
  'next',
  'isSafeInternalPath',
  'ADMIN_LOGIN_DEMO_ENABLED',
];

for (const term of actionTerms) {
  assert(actions.includes(term), `Action de login deve conter: ${term}`);
}

const sessionTerms = [
  'getAdminSessionCookieOptions',
  'getExpiredAdminSessionCookieOptions',
  'httpOnly: true',
  'sameSite',
  'secure',
  "path: '/'",
];

for (const term of sessionTerms) {
  assert(session.includes(term), `Helper de sessão deve conter: ${term}`);
}

assert(logout.includes('ADMIN_SESSION_COOKIE'), 'Logout deve usar ADMIN_SESSION_COOKIE');
assert(logout.includes('getExpiredAdminSessionCookieOptions'), 'Logout deve expirar cookie administrativo');
assert(logout.includes("'/auth/login'"), 'Logout deve redirecionar para login');

assert(!page.includes('localStorage'), 'Página de login não deve usar localStorage');
assert(!page.includes('saveSession'), 'Página de login não deve usar saveSession');
assert(page.includes('loginAdminAction'), 'Página de login deve usar server action');
assert(page.includes('name="next"'), 'Página de login deve preservar next');

const docTerms = ['cookie HttpOnly', 'logout seguro', '2FA pendente', 'sem localStorage'];
for (const term of docTerms) {
  assert(authDocs.includes(term), `Documentação de sessão deve conter: ${term}`);
}

assert(roadmap.includes('Parcial com sessão HttpOnly fundacional'), 'Roadmap deve atualizar status do W01');

console.log('Contrato do login administrativo com cookie validado com sucesso.');
