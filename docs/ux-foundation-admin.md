# Fundação UX do Admin-Web

## Objetivo

Padronizar a experiência administrativa do TrustCheck com uma base reutilizável para W02-W10.

## Componentes base

- `AdminShell`: estrutura principal do backoffice, com sidebar, header e área de conteúdo.
- `AdminNav`: navegação lateral com status das áreas administrativas.
- `MetricCard`: card de métrica agregada sem exposição de dados pessoais.
- `StatusBadge`: marcador visual para status operacional.
- `FeedbackBox`: componente já existente para mensagens de feedback.

## Navegação planejada

- Dashboard
- Moderação
- Usuários
- Empresas
- Conteúdo
- Casos
- Academy
- Analytics
- Configurações

## Diretrizes visuais

- Usar linguagem operacional clara.
- Priorizar estados de ação: pendente, parcial, crítico, saudável.
- Evitar tabelas densas antes de filtros e busca.
- Não exibir dados pessoais em cards agregados.
- Sinalizar explicitamente quando os dados forem demonstrativos.

## Segurança e LGPD

- O shell visual não é controle de acesso.
- Páginas administrativas devem depender de sessão validada e autorização da API.
- Não renderizar CPF, CNPJ completo, documentos privados, evidências, tokens ou payloads sensíveis.
- Logs e mensagens de erro não devem conter segredos ou dados pessoais desnecessários.

## Estado atual

W02 Dashboard Global está em estado fundacional com dados demonstrativos. A próxima etapa recomendada é aplicar o `AdminShell` em W03 Fila de Moderação e depois criar guards/middleware de sessão admin.
