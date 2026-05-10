## 🎯 Tarefa
- **ID:** TC-S2-ADM-10
- **Sprint:** 02 (08/05 a 15/05)
- **Prioridade:** P1
- **Story Points:** 4
- **Repositório:** Admin-Web

## 📝 Descrição
Cria a estrutura de navegação do backoffice. Layout app/admin/layout.tsx com sidebar com itens: Dashboard, Usuários, Empresas, Casos, Moderação (já existente), Academy, Analytics, Configurações. Header com nome do admin logado, perfil e logout. Breadcrumb. W02 - Dashboard com cards com métricas reais via GET /admin/metrics: total de casos, casos abertos, taxa de moderação, Trust Score médio. Se a API não retornar uma métrica, mostrar "dados indisponíveis" em vez de zero falso. W05 - Empresas: placeholder com tabela vazia + texto "Endpoint GET /admin/companies previsto na Sprint 03". Botão de filtro/busca existe desabilitado. W08 - Academy: placeholder com texto "Gestão de conteúdo Academy planejada para Sprint 03". W09 - Analytics: placeholder com gráfico vazio + texto "Analytics avançado no backlog futuro (cohort/funil)". W10 - Configurações: placeholder com seções "Em desenvolvimento" para regras de moderação, integrações, branding. Cada placeholder informa explicitamente a dependência de API que falta — sem inventar dados ou funcionalidades prontas.

## 🔧 Mudanças por commit
Listar cada commit em ordem cronológica com 1 linha explicativa:

- `feat(admin): cria componente AdminSidebar com navegação [TC-S2-ADM-10]` — cria components/AdminSidebar.tsx com itens de navegação (Dashboard, Usuários, Empresas, Casos, Moderação, Academy, Analytics, Configurações) e destaque de rota ativa
- `feat(admin): cria layout com sidebar, header, breadcrumb e logout [TC-S2-ADM-10]` — cria app/admin/layout.tsx com AdminSidebar, header com nome do admin logado e botão de logout, breadcrumb dinâmico baseado na rota atual
- `feat(admin): implementa W02 dashboard com métricas reais [TC-S2-ADM-10]` — cria app/admin/dashboard/page.tsx com cards de métricas (total de casos, casos abertos, taxa de moderação, Trust Score médio) via GET /admin/metrics, mostrando "dados indisponíveis" quando API não retorna valor
- `feat(admin): cria placeholders honestos para W05 empresas, W08 academy, W09 analytics, W10 configurações [TC-S2-ADM-10]` — cria placeholders para Empresas (tabela vazia com texto sobre endpoint previsto), Academy (texto sobre gestão de conteúdo planejada), Analytics (gráfico vazio com texto sobre analytics avançado no backlog), Configurações (seções "Em desenvolvimento" para regras de moderação, integrações, branding)

## 📂 Arquivos impactados
Lista resumida agrupada por área:
- `components/AdminSidebar.tsx` (novo) — Componente de sidebar com navegação e destaque de rota ativa
- `app/admin/layout.tsx` (novo) — Layout com sidebar, header, breadcrumb e logout
- `app/admin/dashboard/page.tsx` (novo) — Dashboard W02 com métricas reais via GET /admin/metrics
- `app/admin/empresas/page.tsx` (novo) — Placeholder W05 empresas com tabela vazia e texto sobre endpoint previsto
- `app/admin/academy/page.tsx` (novo) — Placeholder W08 academy com texto sobre gestão de conteúdo planejada
- `app/admin/analytics/page.tsx` (novo) — Placeholder W09 analytics com gráfico vazio e texto sobre analytics avançado no backlog
- `app/admin/configuracoes/page.tsx` (novo) — Placeholder W10 configurações com seções "Em desenvolvimento"

## ✅ Critérios de aceite (do prompt original)
Marcar cada checkbox conforme cumprido:
- [x] W02 mostra métricas reais do endpoint OU "dados indisponíveis" — nunca zero falso
- [x] W05, W08, W09, W10 existem como rotas protegidas (acesso direto sem login → redirect)
- [x] Cada placeholder tem texto claro sobre o que falta
- [x] Sidebar destaca rota ativa
- [x] Logout funciona de qualquer rota e limpa sessão

## 🧪 Como testar
Passos numerados que o revisor deve executar:
1. `npm install` na raiz do Admin-Web.
2. Acessar diretamente /admin/dashboard sem login → deve redirecionar para /auth/login.
3. Fazer login e acessar /admin/dashboard → deve mostrar métricas reais ou "dados indisponíveis".
4. Navegar para /admin/empresas → deve mostrar placeholder com tabela vazia e texto "Endpoint GET /admin/companies previsto na Sprint 03".
5. Navegar para /admin/academy → deve mostrar placeholder com texto "Gestão de conteúdo Academy planejada para Sprint 03".
6. Navegar para /admin/analytics → deve mostrar placeholder com gráfico vazio e texto "Analytics avançado no backlog futuro (cohort/funil)".
7. Navegar para /admin/configuracoes → deve mostrar placeholder com seções "Em desenvolvimento" para regras de moderação, integrações, branding.
8. Verificar sidebar destaca rota ativa em cada página.
9. Clicar em botão "Sair" em qualquer rota → deve limpar sessão e redirecionar para /auth/login.
10. Verificar breadcrumb mostra caminho correto em cada página.

## 🔗 Dependências e Issues
- Depende de: TC-S1-DOC-09, TC-S2-ADM-08.
- Bloqueia: TC-S2-ADM-11 a TC-S2-ADM-12 (fluxo completo do backoffice).
- Issue: N/A.

## 🚨 Riscos e pontos de atenção para o review
- Fluxo depende de endpoint GET /admin/metrics estar funcionando na API para mostrar métricas reais no dashboard.
- Placeholders informam explicitamente dependências de API que faltam (W05, W08, W09, W10).
- Sidebar destaca rota ativa, mas pode precisar de ajustes de estilo para melhor visualização.
- Logout limpa cookies e redireciona para /auth/login, mas pode precisar de validação adicional.

## 📸 Evidências (quando aplicável)
N/A (requer teste manual em navegador com prints das telas).

## ⛔ Não-merge
**Esta PR NÃO deve ser mergeada pelo autor.** Aguardando code review e aprovação humana.
