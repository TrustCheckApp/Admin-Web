# Roadmap Admin-Web

## Contexto

Este documento acompanha a evolução do Admin-Web TrustCheck frente às telas esperadas para V1.

A implementação atual entrega uma base fundacional para o backoffice: shell administrativo reutilizável, navegação lateral, W02 Dashboard Global com dados demonstrativos, W03 Fila de Moderação padronizada no shell e fundação de sessão admin por middleware. As telas ainda não consomem endpoints reais agregados da API.

## Status W01-W10

| Tela | Nome | Status atual | Observações |
|---|---|---|---|
| W01 | Login Admin | Parcial | Página existente em `/auth/login`; ainda precisa de integração robusta com sessão HttpOnly, 2FA e API. |
| W02 | Dashboard Global | Implementado parcialmente / fundacional | Criado em `/admin` com métricas demonstrativas, shell e navegação. |
| W03 | Fila de Moderação | Parcial padronizado | Integrada ao `AdminShell` com fila demonstrativa, ações visuais e dados minimizados. |
| W04 | Gestão de Usuários | Ausente | Link planejado na navegação. |
| W05 | Gestão de Empresas | Ausente | Link planejado na navegação. |
| W06 | Revisão de Conteúdo | Ausente | Link planejado como Conteúdo. |
| W07 | Gestão de Casos | Ausente | Link planejado na navegação. |
| W08 | Academy CMS | Ausente | Link planejado como Academy. |
| W09 | Analytics | Ausente | Link planejado na navegação. |
| W10 | Configurações | Ausente | Link planejado na navegação. |

## Fundação transversal

| Área | Status | Observações |
|---|---|---|
| Fundação de sessão admin | Parcial | Middleware protege `/admin/*` por presença de cookie; validação forte ainda depende da API e de W01 com cookie HttpOnly. |

## Entregas implementadas

### Fundação W02

- `components/admin/AdminShell.tsx`
- `components/admin/AdminNav.tsx`
- `components/admin/MetricCard.tsx`
- `components/admin/StatusBadge.tsx`
- `app/admin/page.tsx`
- `tests/admin-shell.test.js`

### Padronização W03

- `components/admin/ModerationQueue.tsx`
- `app/admin/moderacao/page.tsx`
- `tests/admin-moderation.test.js`

### Sessão administrativa

- `middleware.ts`
- `lib/session.ts`
- `tests/admin-session-guard.test.js`
- `docs/admin-auth-session.md`

## Decisões técnicas

1. A cobertura TDD do Admin-Web usa testes estáticos em Node para validar contrato de arquivos, labels e documentação. Isso evita adicionar dependências de teste antes de haver uma suíte React definida.
2. O dashboard e a fila de moderação usam dados demonstrativos para evitar falsa integração com API inexistente.
3. Links W04-W10 aparecem como planejamento no menu, mas suas páginas ainda não foram criadas.
4. O shell visual não substitui autenticação/autorização real.
5. O middleware atual protege navegação por presença de cookie, mas a validação forte de sessão/JWT ainda deve ser implementada com a API.

## LGPD e segurança

- Sem dados pessoais reais.
- Sem CPF, CNPJ completo, documentos, evidências, tokens ou payloads sensíveis.
- Métricas são demonstrativas e agregadas.
- Filas administrativas devem usar identificador público, categoria, status, risco e SLA, sem expor conteúdo privado.
- Futuras integrações devem aplicar menor privilégio, 2FA para admin, logs sem dados sensíveis e auditoria para ações administrativas.

## Próximas tarefas recomendadas

1. Evoluir W01 Login Admin para gravar cookie HttpOnly real.
2. Validar sessão/JWT contra a API.
3. Definir contrato de dashboard agregado na API.
4. Integrar W03 com API de moderação e estados reais.
5. Implementar W04 Gestão de Usuários com TDD.
