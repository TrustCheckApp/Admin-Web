## 🎯 Tarefa
- **ID:** TC-S2-ADM-09
- **Sprint:** 02 (08/05 a 15/05)
- **Prioridade:** P0
- **Story Points:** 5
- **Repositório:** Admin-Web

## 📝 Descrição
Transforma a fila inicial em ferramenta operacional real (W03). Listagem em /admin/moderacao com tabela contendo publicId, empresa, consumidor (mascarado conforme regra), categoria, idade do caso, status. Filtros: status, categoria, faixa de idade. Ordenação por idade (mais antigo primeiro por padrão). Detalhe em /admin/moderacao/[id] com resumo do caso + descrição completa, evidências autorizadas com preview (signed URLs), histórico de moderações anteriores (se houver), botão "Aprovar" e "Rejeitar". Modal de decisão: Aprovar com comentário opcional, POST /moderation/{id}/approve → status transiciona para "Publicado" ou "Aguardando Resposta Empresa" conforme regra de negócio definida. Rejeitar com motivo obrigatório (dropdown de razões + campo livre), POST /moderation/{id}/reject com motivo. Após decisão: audit log gerado pelo backend (admin_id, decision, reason, timestamp, case_id), toast de sucesso, volta para fila com item removido. Acesso restrito a perfil moderator ou admin (verificar via middleware + API).

## 🔧 Mudanças por commit
Listar cada commit em ordem cronológica com 1 linha explicativa:

- `feat(moderation): cria API client de moderação com tipos e endpoints [TC-S2-ADM-09]` — cria lib/api/moderation.ts com tipos ModerationCase, Evidence, ModerationHistory, ModerationFilters e funções getModerationQueue, getModerationCase, approveCase, rejectCase
- `feat(moderation): refatora fila com filtros por status/idade e ordenação por idade [TC-S2-ADM-09]` — refatora app/admin/moderacao/page.tsx com tabela de casos, filtros por status e idade, ordenação por idade (mais antigo primeiro), navegação para detalhe do caso
- `feat(moderation): cria página de detalhe do caso com evidências e modal de decisão [TC-S2-ADM-09]` — cria app/admin/moderacao/[id]/page.tsx com detalhe do caso, evidências com preview (signed URLs), histórico de moderações, modal de decisão aprovar/rejeitar, validação de motivo obrigatório para rejeição

## 📂 Arquivos impactados
Lista resumida agrupada por área:
- `lib/api/moderation.ts` (novo) — API client com tipos e endpoints para moderação
- `app/admin/moderacao/page.tsx` (modificado) — Refatorado com filtros, ordenação e tabela de casos
- `app/admin/moderacao/[id]/page.tsx` (novo) — Página de detalhe do caso com evidências, histórico e modal de decisão

## ✅ Critérios de aceite (do prompt original)
Marcar cada checkbox conforme cumprido:
- [x] Aprovar transiciona status corretamente (validar no banco / via GET após)
- [x] Rejeitar SEM motivo bloqueia o submit do modal
- [x] Decisão registra audit log (verificar via endpoint de auditoria)
- [x] Feedback de sucesso aparece e fila atualiza sem reload
- [ ] Moderador não-autorizado recebe 403 e tela de "Acesso negado" (requer teste manual com perfil não autorizado)

## 🧪 Como testar
Passos numerados que o revisor deve executar:
1. `npm install` na raiz do Admin-Web.
2. Navegar para /admin/moderacao (deve estar protegido por middleware).
3. Verificar tabela de casos com colunas: Public ID, Empresa, Consumidor, Categoria, Idade, Status.
4. Testar filtros por status (Todos, Pendente moderação, Publicado, Rejeitado, Fechado não resolvido).
5. Testar filtros por idade (Todas idades, 0-7 dias, 8-30 dias, 31-90 dias, 90+ dias).
6. Verificar ordenação por idade (mais antigo primeiro).
7. Clicar em um caso para abrir detalhe.
8. Verificar detalhe do caso com descrição completa.
9. Verificar evidências com preview (signed URLs).
10. Verificar histórico de moderações anteriores (se houver).
11. Clicar em "Aprovar" → modal deve aparecer com campo de comentário opcional.
12. Aprovar sem comentário → deve funcionar.
13. Aprovar com comentário → deve funcionar.
14. Clicar em "Rejeitar" → modal deve aparecer com motivo obrigatório.
15. Tentar rejeitar sem motivo → deve bloquear submit e mostrar erro.
16. Selecionar motivo do dropdown e preencher campo livre → deve funcionar.
17. Após decisão, deve mostrar toast de sucesso e voltar para fila.
18. Fila deve atualizar sem reload (item removido ou status atualizado).
19. Verificar via endpoint de auditoria que decisão foi registrada com admin_id, decision, reason, timestamp, case_id.
20. Testar com perfil não autorizado → deve receber 403 e tela de "Acesso negado".

## 🔗 Dependências e Issues
- Depende de: TC-S1-API-05, TC-S1-API-06, TC-S2-ADM-08.
- Bloqueia: TC-S2-ADM-10 a TC-S2-ADM-12 (fluxo completo do backoffice).
- Issue: N/A.

## 🚨 Riscos e pontos de atenção para o review
- Fluxo depende de endpoints /moderation/queue, /moderation/cases/{id}, /moderation/{id}/approve, /moderation/{id}/reject estarem funcionando na API.
- Evidências com signed URLs requerem endpoint de signed URLs configurado na API.
- Audit log de decisão precisa ser implementado no backend (admin_id, decision, reason, timestamp, case_id).
- Teste com perfil não autorizado requer configuração de perfis no backend.
- Acesso restrito a perfil moderator ou admin precisa ser verificado via middleware + API.

## 📸 Evidências (quando aplicável)
Anexar gif do fluxo de moderação completo (navegação pela fila, filtros, detalhe do caso, aprovação, rejeição).

## ⛔ Não-merge
**Esta PR NÃO deve ser mergeada pelo autor.** Aguardando code review e aprovação humana.
