# Fundação UX do Admin-Web

## Objetivo

Padronizar a experiência administrativa do TrustCheck com uma base reutilizável para W02-W10.

## Componentes base

- `AdminShell`: estrutura principal do backoffice, com sidebar, header e área de conteúdo.
- `AdminNav`: navegação lateral com status das áreas administrativas.
- `MetricCard`: card de métrica agregada sem exposição de dados pessoais.
- `StatusBadge`: marcador visual para status operacional.
- `ModerationQueue`: fila administrativa demonstrativa para triagem de casos com dados minimizados.
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

## Padrão para filas administrativas

Filas como W03 Moderação devem exibir apenas dados mínimos para decisão operacional inicial:

- Identificador público do caso.
- Categoria.
- Status de triagem.
- SLA ou janela operacional.
- Sinal de risco reputacional.
- Ações visuais como `Ver detalhes`, `Aprovar` e `Rejeitar`.

Campos proibidos na listagem:

- CPF.
- CNPJ completo.
- E-mail.
- Telefone.
- Documentos privados.
- Evidências privadas.
- Tokens.
- Payload bruto da API.
- `storageKey` de mídia.

Estados esperados para evolução:

- Carregando.
- Vazio.
- Erro recuperável.
- Lista com paginação/filtros.
- Ação pendente.
- Ação concluída com auditoria.

## Sessão e acesso administrativo

- `/admin/*` deve exigir sessão.
- O middleware protege a navegação por presença do cookie administrativo.
- O shell visual não é controle de acesso e não deve ser usado isoladamente como barreira de segurança.
- O login deve evoluir para criar cookie HttpOnly, seguro e com expiração.
- Mensagens de login e erro não devem revelar detalhes sensíveis sobre usuários, tokens ou políticas internas.

## Segurança e LGPD

- O shell visual não é controle de acesso.
- Páginas administrativas devem depender de sessão validada e autorização da API.
- Não renderizar CPF, CNPJ completo, documentos privados, evidências, tokens ou payloads sensíveis.
- Logs e mensagens de erro não devem conter segredos ou dados pessoais desnecessários.

## Estado atual

W02 Dashboard Global está em estado fundacional com dados demonstrativos. W03 Fila de Moderação está em estado parcial padronizado, integrada ao `AdminShell` com fila demonstrativa e sem dados pessoais reais. A fundação de sessão admin protege `/admin/*` por presença de cookie, mas a validação forte ainda depende da integração com W01 Login Admin e API.
