# Relatório Técnico

## Inteligência Artificial no Ciclo de Vida de Desenvolvimento de Software (SDLC) e Design

**Projeto prático:** Acadêmico  
**Repositório:** https://github.com/ygor-marangoni/academico  
**Frontend publicado:** https://cronograma-academico.netlify.app  
**Backend publicado:** https://academico-api.onrender.com/health  
**Disciplina:** IA no Ciclo de Vida de Desenvolvimento de Software (SDLC) e Design  

---

## 1. Introdução

Este relatório apresenta uma análise da aplicação de Inteligência Artificial no ciclo de vida de desenvolvimento de software, com foco especial em programação assistida, design de interface, documentação, manutenção, integração, autenticação, implantação e resolução de problemas técnicos reais.

O documento usa como estudo de caso o projeto **Acadêmico**, uma aplicação web voltada para organização acadêmica, com calendário interativo, tarefas, filtros, autenticação por email e senha, login com Google, sincronização em nuvem e uso local sem login. O projeto foi desenvolvido em um período aproximado de **um dia de trabalho intensivo**, partindo de um protótipo inicial de interface criado com apoio do **Claude.ai** e, em seguida, evoluído tecnicamente com apoio do **Codex**, que foi utilizado para refino do sistema, integração entre frontend e backend, implantação e resolução de erros.

Mais do que apenas “usar IA para gerar código”, este trabalho mostra como ferramentas baseadas em modelos generativos podem ser aplicadas em diferentes fases do SDLC, indo da ideação visual até o deploy em produção, passando por arquitetura, implementação, autenticação, correção de bugs, configuração de infraestrutura e documentação.

---

## 2. Descrição da Área

A área de **IA aplicada ao SDLC e ao Design** investiga como modelos de linguagem, agentes de software, sistemas de recomendação e ferramentas generativas podem apoiar atividades ligadas à criação, evolução e manutenção de sistemas computacionais.

Tradicionalmente, o desenvolvimento de software envolve etapas como:

- levantamento de requisitos;
- prototipação e design de interface;
- implementação;
- testes;
- documentação;
- manutenção;
- implantação;
- monitoramento e melhoria contínua.

Com o avanço recente da IA generativa, cada uma dessas etapas passou a contar com novas formas de automação e assistência. Em vez de atuar apenas como ferramenta de produtividade textual, a IA passou a participar do processo de desenvolvimento de forma mais ampla, inclusive:

- sugerindo soluções arquiteturais;
- propondo interfaces;
- gerando componentes;
- integrando APIs;
- identificando erros;
- apoiando revisões de código;
- produzindo documentação;
- configurando pipelines;
- ajudando a depurar comportamentos complexos em produção.

Nesse contexto, a área deixa de ser apenas “IA para programar” e passa a ser entendida como **IA para apoiar o ciclo de vida completo do software**.

---

## 3. Breve Histórico

O uso de inteligência artificial no desenvolvimento de software não começou com os modelos generativos atuais. Historicamente, pode-se dividir essa evolução em algumas fases.

### 3.1. Ferramentas clássicas de apoio ao desenvolvimento

Antes da popularização da IA generativa, já existiam mecanismos automáticos de suporte ao desenvolvedor, como:

- autocomplete baseado em sintaxe;
- análise estática de código;
- refatoração automática em IDEs;
- geração de documentação a partir de comentários;
- linters e formatadores.

Essas ferramentas, apesar de úteis, dependiam de regras programadas explicitamente e não “entendiam” o contexto do software de forma mais ampla.

### 3.2. A chegada dos modelos de linguagem

Com a evolução dos modelos de linguagem de grande escala, tornou-se possível interpretar instruções em linguagem natural e convertê-las em trechos de código, explicações, testes e documentação.

Esse avanço foi acelerado com a adoção de modelos treinados em grandes bases de código e texto técnico. Em pouco tempo, surgiram assistentes capazes de:

- completar funções;
- explicar trechos de código;
- converter pseudocódigo em implementação;
- criar testes a partir de descrições;
- revisar código com base em contexto textual.

### 3.3. Da sugestão de código para agentes de software

O estágio mais recente dessa evolução é o surgimento de **agentes de engenharia de software**, que não apenas sugerem código, mas também conseguem:

- navegar em repositórios;
- editar múltiplos arquivos;
- executar comandos;
- rodar testes;
- corrigir erros iterativamente;
- integrar-se a ambientes reais de desenvolvimento.

Ferramentas atuais como **Codex**, **Claude Code**, **GitHub Copilot** e outras plataformas agentic representam uma mudança importante: a IA deixa de ser apenas um “auto-complete avançado” e passa a atuar como colaboradora técnica.

---

## 4. Conceituações da Área

Para compreender corretamente o tema, é importante diferenciar alguns conceitos.

### 4.1. Programação assistida por IA

É o uso de sistemas inteligentes para auxiliar a escrita, leitura, revisão, correção e evolução de código. A assistência pode variar de sugestões pequenas até intervenções completas no repositório.

### 4.2. IA generativa

É o ramo da IA capaz de gerar novos conteúdos com base em padrões aprendidos em dados de treinamento. No contexto de software, isso inclui:

- código-fonte;
- interfaces;
- documentação;
- mensagens de commit;
- testes;
- descrições funcionais;
- especificações técnicas.

### 4.3. Agentes de software

São sistemas que executam tarefas com maior autonomia, a partir de objetivos definidos pelo usuário. Em vez de responder apenas com texto, podem interagir com ferramentas, arquivos, comandos, APIs e ambientes externos.

### 4.4. Design assistido por IA

Refere-se ao uso de IA na criação ou refinamento de:

- wireframes;
- protótipos;
- layout visual;
- microcopy;
- fluxos de autenticação;
- experiência do usuário;
- consistência visual e acessibilidade.

### 4.5. SDLC

SDLC é a sigla para **Software Development Life Cycle**, ou Ciclo de Vida de Desenvolvimento de Software. Trata-se do conjunto de etapas que estruturam a criação e evolução de um sistema, desde sua concepção até sua manutenção.

Neste trabalho, a IA foi utilizada como suporte prático a várias dessas etapas.

---

## 5. Áreas de Aplicação

Esta seção aborda as áreas exigidas na proposta da disciplina, relacionando-as ao projeto prático.

### 5.1. Programação assistida e suas ferramentas

A programação assistida por IA é hoje uma das áreas de maior impacto prático dentro do SDLC. Em vez de substituir integralmente o desenvolvedor, as ferramentas mais úteis tendem a atuar como copilotos, revisores, agentes de execução e aceleradores de tarefas repetitivas.

Entre as principais aplicações estão:

- geração de código a partir de instruções em linguagem natural;
- explicação de código legado;
- criação de funções, componentes e rotas;
- correção de bugs;
- refatoração;
- geração de testes;
- suporte a deploy e integração;
- escrita e atualização de documentação.

#### Ferramentas relevantes

- **OpenAI Codex**: agente voltado a engenharia de software, capaz de editar arquivos, executar comandos, revisar diffs e auxiliar na resolução de tarefas completas.
- **Claude / Claude Code**: ferramenta agentic focada em terminal, entendimento de contexto e automação de tarefas de desenvolvimento.
- **GitHub Copilot**: assistente amplamente integrado a IDEs e ao fluxo do GitHub, com sugestões, chat, agente de código e auxílio em revisão.

#### Aplicação no projeto

No projeto Acadêmico, a programação assistida foi usada para:

- estruturar o fluxo de autenticação;
- criar e refinar a página `auth.html`;
- integrar frontend e backend;
- corrigir inconsistências entre elementos da interface e lógica de sessão;
- configurar MongoDB Atlas, Render, Netlify e Google OAuth;
- resolver problemas reais de CORS, cache, cookies cross-site e redirecionamento incorreto;
- implementar proxy de API no Netlify para tornar a autenticação compatível com navegadores mais restritivos, como o Brave.

Nesse processo, a IA não atuou apenas na escrita de código novo, mas também na **análise do sistema de ponta a ponta**, o que é muito mais próximo de um fluxo real de engenharia.

### 5.2. Design de interface e experiência do usuário

A área de design assistido por IA também ganhou muito espaço com a popularização de modelos generativos. Hoje, ferramentas conseguem:

- gerar variações de layout;
- propor componentes;
- sugerir hierarquia visual;
- refinar microinterações;
- apoiar testes de usabilidade;
- acelerar a passagem de protótipos para implementação.

#### Aplicação no projeto

O projeto Acadêmico foi iniciado com um **protótipo visual inicial gerado com apoio do Claude.ai**, especialmente na concepção da interface e da base do layout. A partir dessa base já visualmente estabelecida, o desenvolvimento avançou com o Codex, que foi usado para:

- refinar a tela de autenticação;
- separar o fluxo de login em `auth.html`;
- alinhar a interface à identidade visual do sistema;
- melhorar a responsividade;
- resolver estados visuais específicos;
- manter coerência entre o design e o comportamento do sistema.

Um ponto importante aqui é que a IA não foi usada apenas para “inventar uma tela”, mas para **iterar em cima de um design existente**, ajustando detalhes reais de UX, como:

- clareza do fluxo de login;
- separação entre estados de visitante e usuário logado;
- comportamento em desktop e responsivo;
- posicionamento de elementos persistentes na sidebar;
- simplificação de mensagens redundantes;
- organização de conteúdo visual sem quebrar o layout principal.

### 5.3. Qualidade de software e testes automatizados

A IA também tem papel importante na área de qualidade de software. Ela pode:

- sugerir cenários de teste;
- gerar testes unitários e E2E;
- analisar falhas;
- explicar logs;
- identificar possíveis regressões;
- ajudar a reproduzir bugs.

Ferramentas como **Playwright** representam o estado atual dos testes automatizados modernos, especialmente em aplicações web, permitindo testes cross-browser, em múltiplas plataformas e com uma API única.

#### Aplicação no projeto

Embora o projeto não tenha sido finalizado com uma suíte automatizada completa, a IA foi fortemente usada na **qualidade manual assistida**, por exemplo:

- checagem da restauração de sessão;
- validação do fluxo de email e senha;
- validação do fluxo Google OAuth;
- validação de comportamento local sem login;
- identificação de erros de encoding e português;
- investigação de falhas de CORS;
- diagnóstico de problemas de DNS no MongoDB;
- correção de problemas de proxy e cookie em produção.

Nesse caso, a IA funcionou como **assistente de depuração e validação**, reduzindo o tempo de investigação.

### 5.4. Documentação e manutenção

Uma parte muitas vezes negligenciada do SDLC é a documentação. A IA pode ajudar significativamente em:

- escrita de README;
- criação de guias de setup;
- documentação de deploy;
- atualização de textos defasados;
- padronização de instruções;
- manutenção de documentação técnica sincronizada com o sistema real.

#### Aplicação no projeto

Durante o desenvolvimento do Acadêmico:

- o `README.md` foi reescrito para refletir a arquitetura real do projeto;
- o `SETUP_DEPLOY.md` foi refeito em formato mais acessível para iniciantes;
- o fluxo de deploy local e em produção foi organizado;
- a própria base do relatório passou a ser construída com apoio da IA.

Esse ponto é relevante porque um sistema funcional, mas mal documentado, torna-se difícil de manter, demonstrar ou avaliar academicamente.

### 5.5. Desafios técnicos e éticos

O uso de IA no SDLC traz benefícios, mas também traz desafios importantes.

#### Desafios técnicos

- código gerado com inconsistências contextuais;
- respostas corretas em aparência, mas erradas em produção;
- dependência excessiva de cache ou estado local;
- necessidade de revisão humana constante;
- dificuldade para distinguir problema de código e problema de infraestrutura;
- diferenças entre ambientes local e produção;
- comportamento divergente entre navegadores.

No projeto prático, vários desses desafios apareceram concretamente:

- erros de redirecionamento no Google OAuth;
- variáveis de ambiente configuradas com nomes incorretos;
- conflito entre URL local e URL de produção;
- DNS SRV falhando no MongoDB Atlas;
- CORS bloqueado por origem incorreta;
- bloqueio de cookies cross-site no Brave;
- necessidade de proxy no Netlify para estabilizar autenticação em produção.

#### Desafios éticos

Entre os principais desafios éticos, destacam-se:

- risco de dependência excessiva da IA sem compreensão técnica;
- geração de conteúdo incorreto com aparência convincente;
- necessidade de transparência sobre o uso da IA;
- segurança de credenciais e segredos;
- risco de publicar chaves e tokens em ambientes inseguros;
- responsabilidade humana final sobre o software produzido.

No contexto deste projeto, houve também uma lição prática importante: **segredos expostos em conversa ou código devem ser rotacionados**. Isso mostra que a IA acelera o trabalho, mas não elimina as responsabilidades de segurança.

---

## 6. Estado da Arte na Atualidade

Em março de 2026, o estado da arte da IA aplicada ao desenvolvimento de software é marcado por uma transição clara: saiu-se do paradigma de “assistente que completa código” para o de “agente que executa tarefas de engenharia”.

Hoje, o cenário inclui:

- assistentes em IDE;
- agentes de terminal;
- agentes em nuvem;
- agentes integrados a plataformas de versionamento;
- ferramentas de design com recursos generativos;
- apoio automatizado à documentação, revisão e testes.

### 6.1. Tendências principais

#### a) Agentes com maior autonomia

Ferramentas atuais já conseguem:

- editar múltiplos arquivos;
- executar comandos;
- analisar erros;
- propor correções;
- iterar sobre resultados;
- operar em paralelo.

Esse é o caso de plataformas como o Codex e o Claude Code.

#### b) Integração com ecossistema real de desenvolvimento

O estado da arte já não se limita a uma janela de chat. As ferramentas atuais se conectam a:

- terminal;
- IDEs;
- GitHub;
- Google Drive;
- bancos de dados;
- ambientes de nuvem;
- sistemas via protocolos como MCP.

#### c) IA multimodal para design e produto

A IA também avança na direção multimodal, combinando texto, interface, assets visuais, prototipação e feedback contextual. Isso aproxima design e desenvolvimento.

#### d) IA como apoio ao time, não apenas ao indivíduo

As ferramentas mais novas incluem:

- memória de contexto do repositório;
- agentes compartilhados;
- integração com PRs e issues;
- governança;
- logs de auditoria;
- controles organizacionais.

### 6.2. Interpretação crítica

Com base nas referências atuais, pode-se inferir que o estado da arte não está apenas em “gerar mais código”, mas em:

- oferecer mais contexto;
- operar com mais segurança;
- manter rastreabilidade;
- se integrar ao fluxo real de trabalho;
- reduzir fricção entre ideia, implementação e entrega.

Em outras palavras, o avanço mais relevante não é apenas quantitativo, mas **estrutural**: a IA passou a participar do processo de engenharia de forma transversal.

---

## 7. Exemplo Prático: Projeto Acadêmico

### 7.1. Visão geral do sistema

O projeto Acadêmico é uma aplicação web para organização acadêmica. Sua proposta é permitir que estudantes gerenciem tarefas, estudos, aulas, provas, trabalhos e compromissos em uma interface visual com calendário e agenda.

### 7.2. Objetivos do projeto

- organizar tarefas acadêmicas em uma interface clara;
- oferecer visualização por mês, semana e agenda;
- permitir uso local sem conta;
- permitir sincronização em nuvem com autenticação;
- suportar login por email e por Google;
- funcionar localmente e em produção.

### 7.3. Arquitetura técnica

#### Frontend

- HTML;
- CSS;
- JavaScript puro;
- tela principal em `index.html`;
- tela separada de autenticação em `auth.html`.

#### Backend

- Node.js;
- Express;
- rotas de autenticação;
- rotas de tarefas;
- cookies HTTP-only;
- JWT;
- integração com Google OAuth.

#### Banco de dados

- MongoDB Atlas.

#### Infraestrutura

- frontend no Netlify;
- backend no Render;
- banco no MongoDB Atlas;
- Google Cloud para OAuth.

### 7.4. Tempo de desenvolvimento

Um dos pontos centrais deste relatório é que o sistema, embora relativamente completo para um projeto acadêmico, foi estruturado em um tempo aproximado de **um dia** de trabalho intensivo.

Esse resultado só foi possível porque a IA foi utilizada como aceleradora em diferentes níveis:

- ideação de interface;
- refinamento visual;
- implementação de autenticação;
- ajuste de textos e estados;
- integração de backend;
- depuração;
- deploy;
- documentação.

### 7.5. Fluxo de desenvolvimento adotado

O processo prático ocorreu em duas grandes etapas.

#### Etapa 1: protótipo inicial com Claude.ai

Primeiro, o usuário gerou a interface inicial do sistema com apoio do **Claude.ai**, estabelecendo:

- base visual;
- identidade do produto;
- estrutura de layout;
- conceito da agenda acadêmica;
- primeira versão do design.

Essa etapa foi importante porque forneceu um ponto de partida visual rápido, reduzindo o tempo de prototipação manual.

#### Etapa 2: evolução técnica e refinamento com Codex

Depois que a base e o design já estavam prontos, o desenvolvimento passou para uma etapa mais técnica com o **Codex**, que foi utilizado para:

- criar a página separada de autenticação;
- adaptar o sistema para funcionar com e sem login;
- reorganizar a sidebar para exibir o estado do usuário;
- melhorar a tela de autenticação;
- implantar autenticação por email e senha;
- integrar login com Google;
- conectar o sistema ao MongoDB Atlas;
- publicar backend e frontend;
- corrigir problemas de produção;
- resolver o comportamento do login em navegadores mais restritivos.

### 7.6. Problemas reais enfrentados

Um grande valor acadêmico deste trabalho está no fato de que o sistema não ficou restrito ao ambiente local: ele foi levado até a produção e precisou enfrentar problemas reais.

Entre os principais desafios encontrados, destacam-se:

#### a) Problemas de interface

- necessidade de separar autenticação da página principal;
- card de usuário desalinhado com o estilo do sistema;
- estados visuais redundantes;
- inconsistências na hierarquia e responsividade;
- correção de textos com encoding quebrado.

#### b) Problemas de autenticação

- fluxo híbrido entre modo local e modo autenticado;
- necessidade de login por email e Google;
- diferenciação entre visitante e usuário logado;
- inconsistência entre a sessão reconhecida na `auth.html` e o estado exibido na tela principal.

#### c) Problemas de MongoDB

- confusão inicial com tipos de cluster;
- necessidade de reutilizar um cluster já existente;
- ajuste de usuário, IP access list e string de conexão;
- falha de DNS SRV local, exigindo uso de URI `mongodb://` em vez de `mongodb+srv://`.

#### d) Problemas de produção

- CORS incorreto;
- uso acidental de `localhost` em produção;
- cache antigo do navegador;
- cookie de autenticação não reconhecido no Brave;
- redirecionamentos errados no OAuth;
- necessidade de proxy `/api` no Netlify para tornar o cookie first-party.

### 7.7. Soluções implementadas

As soluções aplicadas incluíram:

- criação de `auth.html` como página dedicada de login;
- integração do frontend com backend Express;
- autenticação por email e senha com JWT em cookie HTTP-only;
- autenticação com Google OAuth 2.0;
- sincronização com MongoDB Atlas;
- configuração do Render para backend;
- configuração do Netlify para frontend;
- uso de `netlify.toml` com proxy para `/api`;
- correção do uso de `||` para `??` em produção, evitando fallback indevido para `localhost`;
- atualização do frontend para distinguir corretamente ambiente local e ambiente publicado.

### 7.8. Resultado final

Ao final do processo, o projeto passou a entregar:

- uso local sem login;
- autenticação por email e senha;
- autenticação com Google;
- persistência em nuvem;
- deploy funcional em produção;
- compatibilidade com Chrome e Brave;
- backend, frontend e banco devidamente integrados.

Esse resultado demonstra, na prática, que a IA não foi usada apenas como ferramenta de brainstorming, mas como suporte ativo à engenharia do sistema completo.

---

## 8. Relação com o SDLC

O projeto Acadêmico dialoga diretamente com o SDLC nas seguintes etapas:

### 8.1. Planejamento e concepção

- definição do problema;
- escolha do domínio acadêmico;
- concepção visual inicial com IA.

### 8.2. Design

- geração inicial do protótipo;
- refinamento de interface;
- ajustes de microcopy;
- melhoria da experiência de autenticação.

### 8.3. Implementação

- frontend;
- backend;
- banco;
- autenticação;
- integração de APIs.

### 8.4. Teste e validação

- checagem manual guiada por IA;
- reproduções de bugs;
- verificação em múltiplos navegadores;
- validação local e em produção.

### 8.5. Deploy

- hospedagem separada do frontend e backend;
- configuração de variáveis de ambiente;
- health check;
- proxy;
- OAuth em produção.

### 8.6. Manutenção e documentação

- reescrita de documentação;
- atualização de guias;
- registro técnico da solução;
- produção deste relatório como material de consolidação.

---

## 9. Análise Crítica

Este estudo de caso permite algumas conclusões relevantes.

### 9.1. Vantagens observadas

- redução significativa do tempo de desenvolvimento;
- maior velocidade para testar hipóteses visuais;
- apoio eficiente em debugging;
- facilidade para escrever e reescrever documentação;
- aceleração do setup de infraestrutura;
- suporte prático a decisões técnicas.

### 9.2. Limitações observadas

- respostas aparentemente corretas, mas que exigem validação;
- necessidade constante de contexto bem definido;
- risco de cache e estados antigos mascararem erros;
- dependência de revisão humana em etapas críticas;
- possibilidade de uso inseguro de credenciais.

### 9.3. Valor acadêmico do experimento

O maior valor deste trabalho está em demonstrar que a IA:

- não elimina a necessidade de conhecimento técnico;
- não substitui raciocínio de engenharia;
- mas pode ampliar muito a produtividade quando usada com critério.

O processo mostrou que a IA funciona melhor quando há:

- objetivo claro;
- validação contínua;
- revisão humana;
- entendimento da arquitetura;
- disposição para iterar.

---

## 10. Conclusão

O projeto Acadêmico demonstrou, de forma concreta, como a Inteligência Artificial pode ser aplicada ao ciclo de vida de desenvolvimento de software e design.

Partindo de um protótipo inicial gerado com apoio do **Claude.ai** e evoluindo com o **Codex** para refinamento técnico, integração, autenticação, deploy e depuração, foi possível construir em cerca de **um dia** uma aplicação web com características reais de produto:

- interface consistente;
- múltiplos fluxos de autenticação;
- integração com banco de dados;
- infraestrutura em nuvem;
- publicação em produção.

Ao longo do processo, a IA atuou como:

- apoio criativo;
- assistente de implementação;
- ferramenta de diagnóstico;
- suporte à infraestrutura;
- auxiliar de documentação;
- parceira de resolução de problemas.

Isso confirma que a IA aplicada ao SDLC e ao Design já não é uma tendência distante, mas uma prática concreta e atual, capaz de transformar a forma como sistemas são idealizados, construídos, corrigidos e entregues.

Ao mesmo tempo, o projeto também evidenciou que a IA exige supervisão, senso crítico, conhecimento técnico e responsabilidade ética. Em outras palavras, o ganho real não vem do uso automático da ferramenta, mas da **colaboração qualificada entre humano e IA**.

---

## 11. Exemplo Prático Resumido para Apresentação

Caso seja necessário apresentar uma versão resumida em sala, o exemplo prático pode ser descrito assim:

> Foi desenvolvido o sistema web **Acadêmico**, uma agenda acadêmica com calendário, tarefas e autenticação. O protótipo inicial de interface foi gerado com apoio do **Claude.ai**, acelerando a etapa de design. Em seguida, com a base visual pronta, o sistema foi evoluído com o **Codex**, que auxiliou na implementação de login por email e Google, integração com MongoDB Atlas, deploy no Render e Netlify, correções de bugs, resolução de problemas de CORS e compatibilidade com navegadores. O projeto foi estruturado em aproximadamente **um dia**, mostrando como a IA pode acelerar o SDLC sem eliminar a necessidade de validação humana.

---

## 12. Referências

### 12.1. Referências do projeto

- Repositório do projeto: https://github.com/ygor-marangoni/academico
- Frontend publicado: https://cronograma-academico.netlify.app
- Backend publicado: https://academico-api.onrender.com/health
- Documentação local do projeto: `README.md`
- Guia local de setup e deploy: `SETUP_DEPLOY.md`

### 12.2. Referências técnicas e conceituais

- OpenAI. *Introducing Codex*. Disponível em: https://openai.com/index/introducing-codex/
- OpenAI. *Codex is now generally available*. Disponível em: https://openai.com/index/codex-now-generally-available/
- OpenAI. *Introducing the Codex app*. Disponível em: https://openai.com/index/introducing-the-codex-app/
- OpenAI. *Addendum to o3 and o4-mini system card: Codex*. Disponível em: https://openai.com/index/o3-o4-mini-codex-system-card-addendum/
- Anthropic. *Claude Code overview*. Disponível em: https://docs.anthropic.com/en/docs/claude-code/overview
- Anthropic. *Connect Claude Code to tools via MCP*. Disponível em: https://docs.anthropic.com/en/docs/claude-code/mcp
- GitHub. *What is GitHub Copilot?* Disponível em: https://docs.github.com/en/copilot/get-started/what-is-github-copilot
- GitHub. *GitHub Copilot features*. Disponível em: https://docs.github.com/en/copilot/get-started/features
- Figma. *Figma AI FAQ / access and usage*. Disponível em: https://help.figma.com/hc/en-us/articles/24919293730327-How-do-I-get-access-to-Figma-AI
- Playwright. *Fast and reliable end-to-end testing for modern web apps*. Disponível em: https://playwright.dev/
- MongoDB. *Create a Cluster - Atlas Docs*. Disponível em: https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/
- MongoDB. *Get Started with Atlas*. Disponível em: https://www.mongodb.com/docs/atlas/getting-started/
- MongoDB. *Manage Clusters / cluster tiers*. Disponível em: https://www.mongodb.com/docs/atlas/cluster-tier/
- Render. *Web Services – Render Docs*. Disponível em: https://render.com/docs/web-services
- Netlify. *Redirects and rewrites*. Disponível em: https://docs.netlify.com/routing/redirects/

### 12.3. Observação metodológica

As informações deste relatório foram construídas a partir de:

- observação prática do desenvolvimento do projeto;
- configuração real da aplicação em ambiente local e em produção;
- interação assistida por IA ao longo do processo;
- documentação oficial das ferramentas utilizadas.

---

## 13. Considerações Finais para Conversão em PDF

Este arquivo foi escrito em Markdown com estrutura adequada para futura conversão em `.docx` ou `.pdf`. Para a versão final acadêmica, recomenda-se:

- inserir capa com nome da instituição, disciplina, aluno e professor;
- padronizar fonte e espaçamento conforme norma exigida pela disciplina;
- adicionar capturas de tela do sistema;
- incluir imagens da tela de login, tela principal e fluxo de deploy;
- manter os links ativos na versão digital do PDF.

