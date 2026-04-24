# TrustCheck Admin Web

Painel web administrativo para moderacao, governanca e operacao da plataforma TrustCheck.

## Escopo V1
- W01 Login Admin com 2FA.
- W02 Dashboard global operacional.
- W03 Fila de moderacao pre-publicacao.
- W04 Gestao de usuarios.
- W05 Gestao de empresas e selos.
- W06 Revisao de conteudo sinalizado.
- W07 Gestao e intervencao de casos.
- W08 CMS da TrustCheck Academy.
- W09 Analytics operacional.
- W10 Configuracoes de moderacao e pesos.

## Regras operacionais
- Toda denuncia passa por moderacao antes de publicar.
- Acoes sensiveis devem ser auditaveis.
- Ajustes de Trust Score exigem perfil autorizado.

## Dependencias
- `Api` para regras de negocio e persistencia de operacao.
- `Integrations` para IA de moderacao, email e analytics.
- `Infra` para seguranca, deploy e monitoramento.

## Fonte de verdade funcional
- https://github.com/TrustCheckApp/Docs
- `Docs/docs/02-catalogo-telas.md`
- `Docs/docs/04-conformidade-seguranca-e-escopo.md`
