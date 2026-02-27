# Acadêmico - Calendário & Tarefas

[![Status](https://img.shields.io/badge/status-ativo-3b5bdb)](./README.md)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20Vanilla%20JS-111827)](./README.md)
[![Responsivo](https://img.shields.io/badge/responsivo-desktop%20%7C%20tablet%20%7C%20mobile-22c55e)](./README.md)

Aplicação web para organização acadêmica com calendário interativo, painel de tarefas, filtros, tema escuro e recorrência semanal.

> Projeto sem framework, sem build e sem dependências externas.  
> Basta abrir `index.html` no navegador.

## Demo e Preview

- Aplicação online: https://cronograma-academico.netlify.app/

![Screenshot do sistema Acadêmico](assets/images/aplicacao.png)

## Sumário

1. [Demo e Preview](#demo-e-preview)
2. [Sobre](#sobre)
3. [Destaques](#destaques)
4. [Arquitetura](#arquitetura)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Como Executar](#como-executar)
7. [Persistência Local](#persistência-local)
8. [Modelo de Dados](#modelo-de-dados)
9. [UX Mobile](#ux-mobile)
10. [Roadmap](#roadmap)
11. [Contribuição](#contribuição)
12. [Checklist de Qualidade](#checklist-de-qualidade)

## Sobre

O Acadêmico foi desenhado para centralizar a rotina de estudos em uma interface limpa, rápida e direta:

- Visualização por Mês, Semana e Agenda
- Cadastro e acompanhamento de tarefas por tipo, prioridade e status
- Busca textual e filtros compostos
- Persistência local com `localStorage`

## Destaques

- Tema claro/escuro com suporte à preferência do sistema (`prefers-color-scheme`)
- Recorrência semanal para criar múltiplas ocorrências em lote
- Indicador de tarefa recorrente nos cards de Agenda e Painel do Dia
- Painel do dia adaptado para mobile com estado expandido/minimizado
- FAB contextual no mobile (aparece no estado minimizado do painel)
- Acessibilidade com `aria-label`, foco visível e navegação por teclado

## Arquitetura

O JavaScript segue a organização:

1. `state`
2. `utils`
3. `render`
4. `handlers`
5. `storage`
6. `init`

Benefícios:

- Separação clara de responsabilidades
- Evolução incremental sem acoplamento desnecessário
- Leitura rápida para manutenção e debug

## Estrutura do Projeto

```text
CRONOGRAMA/
|- index.html
|- style.css
|- script.js
`- README.md
```

## Como Executar

### Opção 1 - direto no navegador

1. Abra o arquivo `index.html`.

### Opção 2 - servidor local (recomendado)

```bash
python -m http.server 5500
```

Abra:

```text
http://localhost:5500
```

## Persistência Local

Chaves utilizadas no `localStorage`:

- `academico_calendar_tasks`
- `academico_theme`

Para resetar os dados:

1. Abra DevTools
2. Vá em `Application` > `Local Storage`
3. Remova as chaves acima

## Modelo de Dados

Estrutura principal de tarefa:

```json
{
  "id": "string",
  "titulo": "string",
  "descricao": "string",
  "data": "YYYY-MM-DD",
  "hora": "HH:mm",
  "tipo": "prova|trabalho|estudo|aula|reuniao|pessoal|outro",
  "prioridade": "alta|media|baixa",
  "status": "pendente|concluida",
  "disciplina": "string",
  "recorrencia": "nenhuma|semanal",
  "recorrenciaSemanas": 4,
  "recurrenceGroupId": "string|null",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

## UX Mobile

Comportamentos específicos para telas pequenas:

- Sidebar em drawer
- Toggle de visualização na sidebar
- Painel do dia com controle de minimizar/expandir
- FAB condicionado ao estado minimizado do painel
- Modal em formato bottom sheet

## Roadmap

### Entregue

- [x] Calendário mensal/semanal/agenda
- [x] CRUD de tarefas completo
- [x] Filtros e busca
- [x] Tema escuro com persistência
- [x] Recorrência semanal com `recurrenceGroupId`
- [x] Responsividade desktop/tablet/mobile

### Próximas melhorias

- [ ] Edição em lote por grupo de recorrência
- [ ] Importação/exportação JSON com UI
- [ ] Drag and drop entre dias no calendário
- [ ] Notificações de prazo (PWA/local notifications)
- [ ] Testes automatizados para regras de data e recorrência

## Contribuição

Contribuições são bem-vindas. Fluxo sugerido:

1. Crie uma branch
2. Implemente a mudança com foco em simplicidade
3. Mantenha padrão visual e arquitetura atual
4. Valide comportamento em desktop e mobile
5. Abra PR com descrição objetiva do impacto

Padrões importantes do projeto:

- Sem frameworks JS/CSS
- Sem variáveis CSS
- Sem dependências externas novas
- Manter a organização por seções no `style.css`
- Manter arquitetura do `script.js` (`state` -> `utils` -> `render` -> `handlers` -> `storage` -> `init`)

## Checklist de Qualidade

- [x] Sem build step
- [x] Sem dependência externa de runtime
- [x] Persistência local funcionando
- [x] Tema claro/escuro funcional
- [x] Recorrência semanal funcional
- [x] Interface responsiva
- [x] Foco em acessibilidade básica
