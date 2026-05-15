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
  'app/admin/page.tsx',
  'components/admin/AdminShell.tsx',
  'components/admin/AdminNav.tsx',
  'components/admin/MetricCard.tsx',
  'components/admin/StatusBadge.tsx',
  'docs/admin-web-roadmap.md',
];

for (const file of requiredFiles) {
  assert(exists(file), `Arquivo obrigatório não encontrado: ${file}`);
}

const dashboard = read('app/admin/page.tsx');
const nav = read('components/admin/AdminNav.tsx');
const roadmap = read('docs/admin-web-roadmap.md');

const dashboardLabels = [
  'Dashboard Global',
  'Casos em moderação',
  'Empresas pendentes',
  'Casos em negociação',
  'Tempo médio de resposta',
  'dados demonstrativos',
];

for (const label of dashboardLabels) {
  assert(dashboard.includes(label), `Dashboard deve conter o texto: ${label}`);
}

const navLabels = [
  'Dashboard',
  'Moderação',
  'Usuários',
  'Empresas',
  'Conteúdo',
  'Casos',
  'Academy',
  'Analytics',
  'Configurações',
];

for (const label of navLabels) {
  assert(nav.includes(label), `Navegação deve conter o item: ${label}`);
}

assert(roadmap.includes('W02 Dashboard Global'), 'Roadmap deve documentar W02 Dashboard Global');
assert(roadmap.includes('fundacional'), 'Roadmap deve declarar status fundacional');
assert(roadmap.includes('Sem dados pessoais reais'), 'Roadmap deve registrar restrição LGPD de dados reais');

console.log('Contrato do shell administrativo validado com sucesso.');
