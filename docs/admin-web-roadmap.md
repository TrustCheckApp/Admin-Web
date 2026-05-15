# Roadmap Admin-Web

## Contexto

Este documento acompanha a evolução do Admin-Web TrustCheck frente às telas esperadas para V1.

A implementação atual desta tarefa entrega uma base fundacional para o backoffice: shell administrativo reutilizável, navegação lateral e W02 Dashboard Global com dados demonstrativos. O dashboard ainda não consome endpoints reais agregados da API.

## Status W01-W10

| Tela | Nome | Status atual | Observações |
|---|---|---|---|
| W01 | Login Admin | Parcial | Página existente em `/auth/login`; ainda precisa de integração robusta com sessão, 2FA e guards. |
| W02 | Dashboard Global | Implementado parcialmente / fundacional | Criado em `/admin` com métricas demonstrativas, shell e navegação. |
| W03 | Fila de Moderação | Parcial | Página existente em `/admin/moderacao`; deve ser integrada ao shell em etapa posterior. |
| W04 | Gestão de Usuários | Ausente | Link planejado na navegação. |
| W05 | Gestão de Empresas | Ausente | Link planejado na navegação. |
| W06 | Revisão de Conteúdo | Ausente | Link planejado como Conteúdo. |
| W07 | Gestão de Casos | Ausente | Link planejado na navegação. |
| W08 | Academy CMS | Ausente | Link planejado como Academy. |
| W09 | Analytics | Ausente | Link planejado na navegação. |
| W10 | Configurações | Ausente | Link planejado na navegação. |

## Entrega desta tarefa

- `components/admin/AdminShell.tsx`
- `components/admin/AdminNav.tsx`
- `components/admin/MetricCard.tsx`
- `components/admin/StatusBadge.tsx`
- `app/admin/page.tsx`
- `tests/admin-shell.test.js`

## Decisões técnicas

1. A primeira cobertura TDD do Admin-Web usa um teste estático em Node para validar contrato de arquivos, labels e documentação. Isso evita adicionar dependências de teste antes de haver uma suíte React definida.
2. O dashboard usa `adminDashboardMock` com dados demonstrativos para evitar falsa integração com API inexistente.
3. Links W04-W10 aparecem como planejamento no menu, mas suas páginas ainda não foram criadas.
4. O shell visual não substitui autenticação/autorização real. O controle efetivo deve ser implementado com sessão, middleware e validação na API.

## LGPD e segurança

- Sem dados pessoais reais.
- Sem CPF, CNPJ completo, documentos, evidências, tokens ou payloads sensíveis.
- Métricas são demonstrativas e agregadas.
- Futuras integrações devem aplicar menor privilégio, 2FA para admin, logs sem dados sensíveis e auditoria para ações administrativas.

## Próximas tarefas recomendadas

1. Integrar `/admin/moderacao` ao `AdminShell`.
2. Criar middleware/guard de sessão admin no Next.js.
3. Definir contrato de dashboard agregado na API.
4. Implementar W04 Gestão de Usuários com TDD.
5. Implementar W05 Gestão de Empresas e revisão de claims.
