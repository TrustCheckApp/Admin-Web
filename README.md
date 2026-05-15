# TrustCheck Admin Web

Painel administrativo web para moderacao e operacao do TrustCheck.

## Estado atual (atualizado em 2026-05-14)
- Base Next.js funcional.
- Login admin com fluxo 2FA e sessao local.
- Tela de fila de moderacao operacional.

## Cobertura funcional atual
- Implementado: W01 (login) e W03 (fila de moderacao) com integracao API.
- Pendente: W02 e W04-W10 para completar escopo do backoffice V1.
- Endpoints consumidos ainda sao legados (`/auth/login`, `/casos/*`).

## Riscos e gaps
1. Backoffice incompleto frente ao catalogo oficial.
2. Dependencia de endpoints legados da API.
3. Sessao simples sem estrategia robusta de renovacao.

## Proximas prioridades
1. Migrar para endpoints V2 de moderacao/casos.
2. Entregar backlog W02/W04-W10 por prioridade operacional.
3. Padronizar validacoes de lint/test em CI sem prompts interativos.

## Execucao local
```bash
npm install
npm run dev
```

## Build e QA
```bash
npm run build
npm run test:e2e:auth
```

## Referencias
- https://github.com/TrustCheckApp/Docs
- `Docs/docs/02-catalogo-telas.md`
