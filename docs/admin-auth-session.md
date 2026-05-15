# Sessão administrativa do Admin-Web

## Objetivo

Documentar a fundação de sessão administrativa para proteger rotas administrativas do TrustCheck Admin-Web.

## Modelo atual

As rotas administrativas `/admin/*` são protegidas pelo `middleware.ts` do Next.js por presença do cookie `trustcheck_admin_session`.

Quando o cookie não existe, o usuário é redirecionado para `/auth/login` com o parâmetro `next` apontando para a rota originalmente solicitada.

Exemplos:

- `/admin` sem sessão redireciona para `/auth/login?next=/admin`.
- `/admin/moderacao` sem sessão redireciona para `/auth/login?next=/admin/moderacao`.
- `/auth/login` permanece público.

## Login administrativo

A página W01 Login Admin usa uma server action em `app/auth/login/actions.ts` para preparar sessão administrativa server-side.

O fluxo atual:

1. Recebe `email`, `password` e `next`.
2. Valida campos obrigatórios.
3. Bloqueia redirects externos usando apenas caminhos internos seguros.
4. Em modo demonstrativo controlado por `ADMIN_LOGIN_DEMO_ENABLED=true`, cria o cookie HttpOnly `trustcheck_admin_session`.
5. Redireciona para `next`.

Sem `ADMIN_LOGIN_DEMO_ENABLED=true`, o login retorna erro controlado indicando que a integração de autenticação admin está indisponível.

Esta decisão evita falsa autenticação em produção enquanto a API real de admin login e 2FA não estiver pronta.

## Logout seguro

A rota `GET /api/admin/auth/logout` limpa o cookie administrativo usando opções expiradas e redireciona para `/auth/login`.

## Cookie esperado

Nome do cookie:

```text
trustcheck_admin_session
```

Opções centralizadas em `lib/session.ts`:

- cookie HttpOnly;
- `Secure` em produção;
- `SameSite=Lax`;
- `path=/`;
- expiração curta;
- logout seguro com limpeza do cookie;
- sem expor token no client;
- sem localStorage no fluxo de login admin.

## Limites da implementação atual

Esta entrega cria a fundação de login e roteamento protegido, mas ainda não implementa autenticação forte completa.

Pendências conhecidas:

- validação criptográfica da sessão/JWT contra a API;
- 2FA pendente para admin;
- integração real com endpoint de login administrativo;
- refresh/expiração avançada;
- auditoria de ações administrativas;
- remoção futura dos helpers legados de `localStorage` quando não houver dependências remanescentes.

## Segurança e LGPD

- Não adicionar tokens hardcoded.
- Não registrar token, refresh token, OTP ou dados pessoais em logs.
- Não expor conteúdo de evidências privadas no Admin-Web.
- Tratar o middleware como primeira barreira de navegação, não como substituto da autorização da API.
- Não usar localStorage para sessão administrativa.

## Próxima tarefa recomendada

Integrar W01 Login Admin a um endpoint real da API com validação de credenciais, 2FA obrigatório e emissão de sessão/JWT validável no backend.
