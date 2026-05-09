# TrustCheck Admin Web

Painel web administrativo para moderacao, governanca e operacao da plataforma TrustCheck.

## Estado real atual
- Base Next.js App Router inicializada com layout, cliente API e sessao local.
- TC2 concluida para MVP: login 2FA, moderacao operacional e UX foundation com feedback padrao.

## Variáveis de Ambiente
- `NEXT_PUBLIC_API_URL`: URL base da API (padrão: `http://localhost:3000`)
- `NEXT_PUBLIC_USE_MOCKS`: Flag para habilitar mocks locais durante desenvolvimento (padrão: `false`)
  - `true`: Usa mocks MSW para desenvolvimento offline
  - `false`: Usa API real

## Execucao local
- `npm install`
- `npm run dev`

## QA rapido
- `npm run test:e2e:auth`

## Fonte de verdade funcional
- https://github.com/TrustCheckApp/Docs
- `Docs/docs/02-catalogo-telas.md`
- `Docs/docs/04-conformidade-seguranca-e-escopo.md`

