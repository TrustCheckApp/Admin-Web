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
  'middleware.ts',
  'lib/session.ts',
  'docs/admin-auth-session.md',
  'docs/admin-web-roadmap.md',
  'docs/ux-foundation-admin.md',
];

for (const file of requiredFiles) {
  assert(exists(file), `Arquivo obrigatório não encontrado: ${file}`);
}

const middleware = read('middleware.ts');
const session = read('lib/session.ts');
const authDocs = read('docs/admin-auth-session.md');
const roadmap = read('docs/admin-web-roadmap.md');
const ux = read('docs/ux-foundation-admin.md');

const middlewareTerms = [
  'NextRequest',
  'NextResponse',
  'ADMIN_SESSION_COOKIE',
  "pathname.startsWith('/admin')",
  "'/auth/login'",
  "searchParams.set('next'",
  'NextResponse.redirect',
  'NextResponse.next',
];

for (const term of middlewareTerms) {
  assert(middleware.includes(term), `Middleware deve conter: ${term}`);
}

const sessionTerms = [
  'ADMIN_SESSION_COOKIE',
  'trustcheck_admin_session',
  'hasAdminSessionCookie',
];

for (const term of sessionTerms) {
  assert(session.includes(term), `Sessão deve conter: ${term}`);
}

const docTerms = [
  'rotas administrativas',
  'cookie HttpOnly',
  'sem expor token no client',
  '2FA pendente',
];

for (const term of docTerms) {
  assert(authDocs.includes(term), `Documentação de sessão deve conter: ${term}`);
}

assert(roadmap.includes('Fundação de sessão admin') && roadmap.includes('Parcial'), 'Roadmap deve registrar fundação de sessão admin como parcial');
assert(ux.includes('/admin/*') && ux.includes('sessão'), 'Fundação UX deve registrar proteção de /admin/* por sessão');

console.log('Contrato do guard de sessão administrativa validado com sucesso.');
