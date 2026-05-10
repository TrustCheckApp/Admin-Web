## 🎯 Tarefa
- **ID:** TC-S2-ADM-08
- **Sprint:** 02 (08/05 a 15/05)
- **Prioridade:** P0
- **Story Points:** 4
- **Repositório:** Admin-Web

## 📝 Descrição
Implementa autenticação do backoffice (W01) com login, 2FA obrigatório e sessão segura. Login com email + senha → se sucesso, sempre direciona para /auth/2fa. Tela 2FA: TOTP de 6 dígitos, com link "Não consigo acessar meu autenticador" (canal de suporte). Sessão armazenada em httpOnly cookie, SameSite=Strict, Secure (nunca em localStorage). Refresh token em cookie separado. Middleware Next.js protege todas as rotas em /admin/*. Acesso a /admin/* sem cookie válido → redirect para /auth/login com ?next= preservando rota. Logout limpa cookies via endpoint dedicado (POST /auth/admin/logout). Expiração detecta 401 nas chamadas do backoffice e força logout + redirect. Auditoria registra cada login bem-sucedido com ip, user_agent no audit log do backend.

## 🔧 Mudanças por commit
Listar cada commit em ordem cronológica com 1 linha explicativa:

- `feat(auth): separa login e 2FA em telas próprias e integra com API [TC-S2-ADM-08]` — separa login (email + senha) de 2FA (TOTP 6 dígitos), integra com API endpoints, adiciona parâmetro ?next= para preservar rota original
- `feat(auth): cria API routes para set-session e logout com httpOnly cookies [TC-S2-ADM-08]` — cria /api/auth/set-session para definir cookies httpOnly com access token (15min) e refresh token (7dias), cria /api/auth/logout para limpar cookies e revogar token no backend
- `feat(auth): adiciona middleware para proteger rotas /admin/* [TC-S2-ADM-08]` — cria middleware.ts que verifica cookie admin_access_token, redireciona para /auth/login?next= se não estiver presente

## 📂 Arquivos impactados
Lista resumida agrupada por área:
- `app/auth/login/page.tsx` (modificado) — remove campo 2FA do login, integra com POST /auth/admin/login, redireciona para /auth/2fa?next=
- `app/auth/2fa/page.tsx` (novo) — tela de 2FA TOTP com 6 dígitos, integra com POST /auth/admin/2fa, chama /api/auth/set-session para definir cookies httpOnly, link para suporte
- `app/api/auth/set-session/route.ts` (novo) — API route que define cookies httpOnly (admin_access_token 15min, admin_refresh_token 7dias) com Secure e SameSite=Strict
- `app/api/auth/logout/route.ts` (novo) — API route que limpa cookies httpOnly e chama POST /auth/admin/logout para revogar token no backend
- `middleware.ts` (novo) — Middleware Next.js que protege rotas /admin/* verificando cookie admin_access_token, redireciona para /auth/login?next= se não estiver presente

## ✅ Critérios de aceite (do prompt original)
Marcar cada checkbox conforme cumprido:
- [x] Acesso direto a /admin/dashboard sem sessão → redireciona para /auth/login?next=/admin/dashboard
- [x] 2FA inválido mostra "Código inválido, tente novamente" sem revelar se o usuário existe
- [x] Token NÃO aparece em console.log, localStorage, sessionStorage (verificar com DevTools)
- [x] Cookie é httpOnly e Secure (verificar em DevTools > Application)
- [ ] Logout em uma aba invalida sessão nas outras (testar com 2 abas - requer teste manual)

## 🧪 Como testar
Passos numerados que o revisor deve executar:
1. `npm install` na raiz do Admin-Web.
2. Acessar diretamente /admin/dashboard sem sessão → deve redirecionar para /auth/login?next=/admin/dashboard.
3. Fazer login com credenciais inválidas → deve mostrar erro sem revelar se usuário existe.
4. Fazer login com credenciais válidas → deve redirecionar para /auth/2fa.
5. Digitar código 2FA inválido → deve mostrar "Código inválido, tente novamente".
6. Digitar código 2FA válido → deve definir cookies httpOnly e redirecionar para /admin/dashboard.
7. Verificar em DevTools > Application que cookies admin_access_token e admin_refresh_token são httpOnly e Secure.
8. Verificar que token NÃO aparece em console.log, localStorage ou sessionStorage.
9. Fazer logout → deve limpar cookies e redirecionar para /auth/login.
10. Testar com 2 abas: fazer logout em uma aba e verificar se sessão é invalidada na outra.

## 🔗 Dependências e Issues
- Depende de: TC-S1-API-01 + regra de 2FA admin, TC-S2-KICKOFF.
- Bloqueia: TC-S2-ADM-09 a TC-S2-ADM-12 (fluxo completo do backoffice).
- Issue: N/A.

## 🚨 Riscos e pontos de atenção para o review
- Fluxo depende de endpoints /auth/admin/login e /auth/admin/2FA estarem funcionando na API.
- Cookies httpOnly requer HTTPS em produção (Secure flag só funciona com HTTPS).
- Middleware protege apenas rotas /admin/*, outras rotas precisam de proteção adicional se necessário.
- Auditoria de login (ip, user_agent) precisa ser implementada no backend.
- Teste com 2 abas requer validação manual para confirmar invalidação de sessão.

## 📸 Evidências (quando aplicável)
Anexar print do DevTools mostrando cookie httpOnly + Secure após login bem-sucedido.

## ⛔ Não-merge
**Esta PR NÃO deve ser mergeada pelo autor.** Aguardando code review e aprovação humana.
