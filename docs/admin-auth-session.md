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

## Cookie esperado

Nome do cookie:

```text
trustcheck_admin_session
```

Recomendação para a próxima etapa de integração com login real:

- cookie HttpOnly;
- `Secure` em produção;
- `SameSite=Lax` ou `SameSite=Strict`, conforme necessidade de fluxo;
- expiração curta;
- renovação controlada;
- logout seguro com limpeza do cookie;
- sem expor token no client.

## Limites da implementação atual

Esta entrega cria a fundação de roteamento protegido, mas ainda não implementa autenticação forte completa.

Pendências conhecidas:

- validação criptográfica da sessão/JWT contra a API;
- 2FA pendente para admin;
- logout seguro;
- expiração e refresh;
- auditoria de ações administrativas;
- integração do login W01 para criar o cookie HttpOnly;
- remoção do armazenamento legado em `localStorage` usado pela tela atual de login.

## Segurança e LGPD

- Não adicionar tokens hardcoded.
- Não registrar token, refresh token, OTP ou dados pessoais em logs.
- Não expor conteúdo de evidências privadas no Admin-Web.
- Tratar o middleware como primeira barreira de navegação, não como substituto da autorização da API.

## Próxima tarefa recomendada

Evoluir W01 Login Admin para autenticar contra API e gravar `trustcheck_admin_session` como cookie HttpOnly por rota server-side, mantendo 2FA como requisito explícito antes de produção.
