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
  'app/admin/moderacao/page.tsx',
  'components/admin/ModerationQueue.tsx',
  'docs/admin-web-roadmap.md',
  'docs/ux-foundation-admin.md',
];

for (const file of requiredFiles) {
  assert(exists(file), `Arquivo obrigatório não encontrado: ${file}`);
}

const page = read('app/admin/moderacao/page.tsx');
const queue = read('components/admin/ModerationQueue.tsx');
const roadmap = read('docs/admin-web-roadmap.md');
const ux = read('docs/ux-foundation-admin.md');

const pageLabels = [
  'AdminShell',
  'Fila de Moderação',
  'Casos pendentes',
  'Risco reputacional',
  'SLA',
  'dados demonstrativos',
];

for (const label of pageLabels) {
  assert(page.includes(label), `Página de moderação deve conter: ${label}`);
}

const queueLabels = [
  'Ver detalhes',
  'Aprovar',
  'Rejeitar',
  'TC-2026-',
];

for (const label of queueLabels) {
  assert(queue.includes(label), `Fila de moderação deve conter: ${label}`);
}

const forbiddenSensitiveTerms = ['cpf', 'cnpjCompleto', 'email', 'telefone', 'token', 'storageKey'];
for (const term of forbiddenSensitiveTerms) {
  assert(!queue.includes(term), `Fila de moderação não deve conter campo sensível: ${term}`);
}

assert(roadmap.includes('W03') && roadmap.includes('Parcial padronizado'), 'Roadmap deve marcar W03 como parcial padronizado');
assert(ux.includes('Padrão para filas administrativas'), 'Fundação UX deve documentar padrão para filas administrativas');

console.log('Contrato da fila de moderação validado com sucesso.');
