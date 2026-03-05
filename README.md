# To-Do List - Gerenciador de Tarefas

## Descrição do Projeto

To-Do List é uma aplicação web moderna e intuitiva para criação e gerenciamento de tarefas pessoais. Desenvolvida com tecnologias de ponta, oferece uma interface limpa e responsiva com persistência de dados em tempo real utilizando localStorage.

A aplicação permite que usuários criem tarefas, marquem-as como concluídas e acompanhem seu progresso através de métricas visuais. Todo o progresso é automaticamente salvo no navegador, garantindo que os dados sejam mantidos entre sessões.

## Problema Resolvido

Muitos usuários enfrentam dificuldades para organizar e acompanhar tarefas diárias de forma eficiente. Esta aplicação fornece uma solução simples, rápida e visualmente atraente para:

- Criar novas tarefas e manter uma lista organizada
- Marcar tarefas como concluídas sem removê-las momentaneamente
- Acompanhar o progresso através de estatísticas visuais
- Persistir dados localmente sem necessidade de login ou backend
- Acessar tarefas de qualquer navegador moderno

## Demonstração

A aplicação apresenta:

1. **Área de Input**: Campo para adicionar novas tarefas com validação em tempo real
2. **Dashboard de Estatísticas**: Exibição de tarefas criadas e concluídas
3. **Lista de Tarefas**: Cards interativos para cada tarefa com opções de conclusão e exclusão
4. **Feedback Visual**: Estados visuais distintos para tarefas ativas e concluídas
5. **Mensagem Vazia**: Estado inicial informativo quando não há tarefas

## Tecnologias Utilizadas

### Frontend Framework e Bibliotecas

| Tecnologia       | Versão | Propósito                                         |
| ---------------- | ------ | ------------------------------------------------- |
| **Next.js**      | 14.0.1 | Framework React com SSR e otimizações de produção |
| **React**        | 18     | Biblioteca UI baseada em componentes              |
| **TypeScript**   | 5      | Tipagem estática e maior segurança de código      |
| **Tailwind CSS** | 3.3.0  | Utility-first CSS framework para styling          |

### Validação e Formulários

| Tecnologia              | Versão | Propósito                              |
| ----------------------- | ------ | -------------------------------------- |
| **React Hook Form**     | 7.47.0 | Gerenciamento eficiente de formulários |
| **Zod**                 | 3.22.4 | Validação de schemas e type inference  |
| **@hookform/resolvers** | 3.3.2  | Integração do Zod com React Hook Form  |

### Ícones e UI

| Tecnologia               | Versão | Propósito                           |
| ------------------------ | ------ | ----------------------------------- |
| **Phosphor Icons React** | 2.0.14 | Biblioteca de ícones moderna e leve |

### Desenvolvimento e Linting

| Tecnologia                    | Versão | Propósito                       |
| ----------------------------- | ------ | ------------------------------- |
| **ESLint**                    | 8      | Análise estática de código      |
| **@rocketseat/eslint-config** | 2.1.0  | Configuração ESLint padronizada |

### Build e CSS Processing

| Tecnologia       | Versão | Propósito                             |
| ---------------- | ------ | ------------------------------------- |
| **Autoprefixer** | 10.0.1 | Adiciona prefixos CSS automaticamente |
| **PostCSS**      | 8      | Transformações CSS avançadas          |

## Arquitetura do Projeto

### Padrão Arquitetural: Component-Based Architecture com Context API

A arquitetura segue um modelo de componentes reutilizáveis com gerenciamento centralizado de estado através da Context API do React. Este padrão oferece:

- **Separação de Responsabilidades**: Cada componente tem uma função bem definida
- **Escalabilidade**: Fácil adicionar novas funcionalidades
- **Manutenibilidade**: Código organizado e compreensível
- **Reusabilidade**: Componentes podem ser utilizados em múltiplos contextos

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                        Home (page.tsx)                      │
│                  - Provedor de Contexto                     │
│                  - Layout Principal                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
      ┌──────────────────────────────────────┐
      │    TaskProvider (Context)             │
      │    - Gerencia estado global           │
      │    - Persistência localStorage        │
      │    - Sincronização de dados           │
      └──────────────────────────────────────┘
                         │
                ┌────────┴────────┐
                ▼                 ▼
    ┌──────────────────┐   ┌─────────────────┐
    │  ToDoList (Page) │   │  TaskContext    │
    │  - Lógica        │   │  - Estado       │
    │  - Formulário    │   │  - Dados        │
    │  - Listagem      │   │                 │
    └────────┬─────────┘   └─────────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
┌──────────────┐ ┌─────────────────┐
│ TaskListCard │ │ NoCreateTask    │
│ - Lista task │ │ - Estado vazio  │
│ - Edição     │ │ - Mensagem      │
│ - Exclusão   │ │                 │
└──────────────┘ └─────────────────┘
```

### Camadas da Arquitetura

#### 1. **Presentation Layer (Componentes)**

Responsável pela renderização e interação com o usuário.

- **ToDoList** (`src/pages/todolist.tsx`): Página principal com lógica de criação de tarefas
- **TaskListCard** (`src/components/TaskListCard.tsx`): Componente para exibir e gerenciar tarefas
- **NoCreateTask** (`src/components/NoCreateTask.tsx`): Componente para estado vazio

#### 2. **State Management Layer (Context)**

Gerencia o estado global da aplicação e persistência.

- **TaskContext** (`src/contexts/TaskContext.tsx`): Contexto centralizado com dados de tarefas

#### 3. **Styling Layer**

Define estilos globais e customizados.

- **Global CSS** (`src/styles/global.css`): Estilos base
- **ToDoList CSS** (`src/styles/todolist.css`): Estilos específicos da página
- **Tailwind CSS**: Utility CSS para componentes

## Estrutura de Pastas Explicada

```
to-do-list/
│
├── src/
│   ├── app/                          # Next.js App Router (camada de roteamento)
│   │   ├── layout.tsx               # Layout raiz com metadados e fonte
│   │   └── page.tsx                 # HomePage - entrada principal da aplicação
│   │
│   ├── pages/                        # Páginas/Telas da aplicação
│   │   └── todolist.tsx             # Componente principal da lista de tarefas
│   │
│   ├── components/                   # Componentes reutilizáveis
│   │   ├── TaskListCard.tsx         # Card individual de tarefa com ações
│   │   └── NoCreateTask.tsx         # Componente para estado vazio
│   │
│   ├── contexts/                     # Context API para estado global
│   │   └── TaskContext.tsx          # Contexto de tarefas com persistência
│   │
│   └── styles/                       # Arquivos CSS customizados
│       ├── global.css               # Estilos globais da aplicação
│       └── todolist.css             # Estilos específicos da página
│
├── public/                           # Arquivos estáticos (imagens, fonts, etc)
│
├── next.config.js                   # Configuração do Next.js
├── tailwind.config.ts               # Configuração do Tailwind CSS
├── tsconfig.json                    # Configuração do TypeScript
├── postcss.config.js                # Configuração do PostCSS
├── package.json                     # Dependências e scripts
└── README.md                        # Documentação (este arquivo)
```

### Descrição das Responsabilidades

#### `src/app/`

- **layout.tsx**: Define o layout raiz, metadados HTML e tipografia global
- **page.tsx**: HomePage que importa TaskProvider e ToDoList, estabelecendo o contexto

#### `src/pages/`

- **todolist.tsx**: Componente principal que gerencia:
  - Formulário de criação de tarefas com validação Zod
  - Integração com Context API
  - Sincronização entre estado local e global
  - Renderização condicional (TaskListCard ou NoCreateTask)

#### `src/components/`

- **TaskListCard.tsx**: Renderiza lista de tarefas com funcionalidades:
  - Checkbox para marcar tarefas como concluídas
  - Botão para deletar tarefas
  - Atualização de contadores no contexto
- **NoCreateTask.tsx**: Componente simples para estado vazio com ícone e mensagem

#### `src/contexts/`

- **TaskContext.tsx**: Gerenciador central de estado que:
  - Define interface TaskData com tipos
  - Implementa hooks useState para tarefas, contadores
  - Sincroniza com localStorage na montagem e em mudanças
  - Exporta TaskProvider e TaskContext para uso na aplicação

## Como Rodar o Projeto Localmente

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** versão 16.x ou superior
- **npm** (incluído com Node.js) versão 8.x ou superior, ou **yarn/pnpm** como alternativa
- **Git** para versionamento de código
- Um navegador web moderno (Chrome, Firefox, Safari, Edge)

Para verificar as versões instaladas, execute:

```bash
node --version
npm --version
```

### Instalação

Siga os passos abaixo para configurar o projeto:

#### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/to-do-list.git
cd to-do-list
```

#### 2. Instalar Dependências

```bash
npm install
```

**Alternativas:**

```bash
yarn install
# ou
pnpm install
```

#### 3. Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

**Alternativas:**

```bash
yarn dev
# ou
pnpm dev
```

A aplicação abrirá automaticamente em:

```
http://localhost:3000
```

Se não abrir automaticamente, acesse manualmente no seu navegador.

### Parar o Servidor

Para parar o servidor de desenvolvimento, pressione `Ctrl + C` no terminal.

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes `scripts`:

### `npm run dev`

```bash
npm run dev
```

Inicia o servidor Next.js em modo desenvolvimento com hot-reload.

- Acesse: `http://localhost:3000`
- Alterações no código refletem automaticamente no navegador

### `npm run build`

```bash
npm run build
```

Cria uma build otimizada para produção.

- Compila TypeScript
- Otimiza componentes React
- Gera arquivos prontos para deployment
- Analisa performance e otimizações

### `npm start`

```bash
npm start
```

Inicia o servidor Next.js em modo produção (requer `build` anterior).

- Use apenas após executar `npm run build`
- Ideal para simular ambiente de produção localmente

### `npm run lint`

```bash
npm run lint
```

Executa validações do código com ESLint.

- Verifica qualidade e consistência do código
- Identifica erros potenciais e más práticas violadas
- Usa configuração Rocketseat padronizada

## Exemplos de Uso da Aplicação

### Fluxo Principal do Usuário

#### 1. Primeira Utilização

```
1. Aplicação abre com mensagem "Você ainda não tem tarefas cadastradas"
2. Usuário refoca no input e digita: "Aprender Next.js"
3. Clica em "Criar" ou pressiona Enter
4. Tarefa aparece na lista
5. Contadores atualizam para "Tarefas criadas: 1" e "Concluídas: 0 de 1"
```

#### 2. Marcando Tarefas como Concluídas

```
1. Usuário vê a tarefa na lista
2. Clica no círculo (checkbox) ao lado da tarefa
3. Tarefa fica com linha cruzada e texto acinzentado
4. Contador de "Concluídas" atualiza para "1 de 1"
5. Tarefa continua visível mas marcada como completa
```

#### 3. Deletando Tarefas

```
1. Usuário vê ícone de lixeira (trash) no final da tarefa
2. Clica no ícone de lixeira
3. Tarefa é removida da lista
4. Contadores atualizam automáticamente
5. Se foi a última tarefa, volta a mensagem de estado vazio
```

#### 4. Validação de Formulário

```
1. Usuário tenta clicar em "Criar" sem digitar nada
2. Erro aparece em vermelho: "Digitar uma tarefa é obrigatório"
3. Input recebe foco automático
4. Após digitar, mensagem de erro desaparece
```

### Exemplos de Tarefas Comuns

**Criar múltiplas tarefas:**

```
1. "Comprar leite"
2. "Fazer exercício"
3. "Estudar TypeScript"
4. "Revisar PR no GitHub"
```

**Organizar um projeto:**

```
1. "Design mockups"
2. "Configurar banco de dados"
3. "Implementar autenticação"
4. "Testes unitários"
5. "Deployment"
```

**Rastreamento de leitura:**

```
1. "Ler capítulo 1 - Clean Code"
2. "Ler capítulo 2 - Clean Code"
3. "Revisar padrões de design"
```

## Endpoints da API

Esta aplicação **não possui backend/API RESTful**. É uma aplicação **frontend-only** que funciona completamente no navegador cliente.

### Armazenamento de Dados

Os dados são armazenados localmente usando **localStorage** do navegador:

#### Chave de Armazenamento

```
@todolist-tasks-1.0
```

#### Estrutura do Dados Armazenados

```json
{
  "tasksContext": ["Aprender Next.js", "Fazer exercício", "Estudar TypeScript"],
  "taskCountContext": 3,
  "completedTasksCountContext": 1
}
```

#### Como Visualizar/Limpar Dados

**No navegador (DevTools):**

1. Abra DevTools (`F12` ou `Ctrl+Shift+I`)
2. Vá para a aba `Application` ou `Storage`
3. Selecione `Local Storage`
4. Procure por `http://localhost:3000`
5. Visualize/edite a chave `@todolist-tasks-1.0`

**Para limpar dados:**

```javascript
// No console do navegador:
localStorage.removeItem("@todolist-tasks-1.0");
// Recarregue a página (F5)
```

### Sincronização de Dados

- **Leitura**: Na montagem do componente (`useEffect`)
- **Escrita**: A cada mudança no estado (adição, conclusão, exclusão)
- **Persistência**: Automática entre sessões do navegador
- **Limite**: ~5-10MB dependendo do navegador

## Boas Práticas Implementadas

### 1. Tipagem TypeScript Forte

**Implementação:**

```typescript
interface TaskData {
  tasksContext: string[];
  setTasksContext: (value: string[]) => void;
  taskCountContext: number;
  setTaskCountContext: (value: number) => void;
  completedTasksCountContext: number;
  setCompletedTasksCountContext: (value: number) => void;
}
```

**Benefícios:**

- Eliminação de erros de tipo em tempo de compilação
- Autocompletar melhorado no IDE
- Documentação implícita no código
- Refatoração mais segura

### 2. Validação de Dados com Zod

**Implementação:**

```typescript
const createTaskSchema = z.object({
  task: z.string().nonempty("Digitar uma tarefa é obrigatório"),
});
```

**Benefícios:**

- Validação declarativa e centrada em um lugar
- Type inference automático
- Mensagens de erro customizadas
- Runtime validation seguro

### 3. Gerenciamento de Estado com Context API

**Implementação:**

```typescript
export const TaskContext = createContext({} as TaskData);

export function TaskProvider({ children }: TaskProviderProps) {
  // Estado centralizado
}
```

**Benefícios:**

- Evita prop drilling
- Estado centralizado e fácil de acessar
- Sincronização entre componentes
- Persistência automática

### 4. Persistência com localStorage

**Implementação:**

```typescript
useEffect(() => {
  const storedStateAsJSON = localStorage.getItem("@todolist-tasks-1.0");
  if (storedStateAsJSON) {
    const parsedState = JSON.parse(storedStateAsJSON);
    // restaurar estado
  }
}, []);
```

**Benefícios:**

- Dados persistem entre sessões
- Experiência melhor para o usuário
- Sem necessidade de backend
- Padrão padrão em aplicações offline-first

### 5. React Hook Form para Formulários Eficientes

**Implementação:**

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<CreateTaskData>({
  resolver: zodResolver(createTaskSchema),
});
```

**Benefícios:**

- Minimal re-renders
- Integração com Zod para validação
- API simples e intuitiva
- Suporte a erro em tempo real

### 6. Componentes Reutilizáveis

**Implementação:**

```typescript
export function TaskListCard() { ... }
export function NoCreateTask() { ... }
```

**Benefícios:**

- DRY (Don't Repeat Yourself)
- Fácil manutenção
- Testes simplificados
- Reusabilidade

### 7. Alias de Imports Configurados

**Implementação em tsconfig.json:**

```json
"paths": {
  "@/*": ["./src/*"]
}
```

**Benefícios:**

- Imports claros e evitando `../../`
- Maior legibilidade
- Refatoração mais fácil
- Menos erros de caminho

### 8. ESLint e Configuração Padronizada

**Implementação:**

```json
"@rocketseat/eslint-config": "^2.1.0"
```

**Benefícios:**

- Código consistente no time
- Detecção de problemas automática
- Padrão estabelecido
- Melhor qualidade geral

### 9. Tailwind CSS para Styling Eficiente

**Implementação:**

```jsx
<div className="w-96 h-10 bg-[#333333] rounded-lg">
```

**Benefícios:**

- CSS agnóstico ao framework
- Bundle otimizado
- Fácil manutenção de estilos
- Consistência de design

### 10. Refs para Rastreamento de Estado Inicial

**Implementação:**

```typescript
const initialStateSet = React.useRef(false);

useEffect(() => {
  if (!initialStateSet.current) {
    // Carregar do localStorage apenas uma vez
    initialStateSet.current = true;
  }
}, []);
```

**Benefícios:**

- Previne duplicação de lógica
- Estado que não causa re-render
- Mais eficiente que usar state

## Possíveis Melhorias Futuras

### 1. Funcionalidade de Edição de Tarefas

**Descrição:** Permitir que usuários editem o texto de tarefas já criadas
**Impacto:** Média complexidade, Alta usabilidade
**Implementação sugerida:**

- Adicionar modo de edição ao TaskListCard
- Validar novo texto com Zod
- Atualizar no contexto e localStorage

### 2. Filtros de Tarefas

**Descrição:** Adicionar botões para filtrar (Todas, Ativas, Concluídas)
**Impacto:** Baixa complexidade, Média usabilidade
**Implementação sugerida:**

- Novo estado no contexto para filtro ativo
- Componente de abas/botões de filtro
- Lógica de filtragem no TaskListCard

### 3. Categorização de Tarefas

**Descrição:** Agrupar tarefas em categorias customizáveis (Trabalho, Pessoal, etc)
**Impacto:** Média complexidade, Alta usabilidade
**Implementação sugerida:**

- Expandir interface TaskData com categorias
- Dropdown de seleção na criação
- Cores diferentes por categoria

### 4. Sistema de Prioridades

**Descrição:** Atribuir prioridades (Baixa, Média, Alta) às tarefas
**Impacto:** Baixa complexidade, Média usabilidade
**Implementação sugerida:**

- Adicionar campo priority ao schema Zod
- Ícone visual de prioridade no card
- Opção de ordenar por prioridade

### 5. Responsividade Mobile Melhorada

**Descrição:** Otimizar layout para telas pequenas
**Impacto:** Média complexidade, Alta usabilidade
**Implementação sugerida:**

- Revisar breakpoints Tailwind
- Adjustar tamanho de inputs e botões
- Testes em dispositivos reais

### 6. Animações e Transições

**Descrição:** Adicionar animações visuais ao criar/deletar tarefas
**Impacto:** Baixa complexidade, Média usabilidade
**Implementação sugerida:**

- Usar Framer Motion ou CSS Transitions
- Fade-in ao adicionar
- Slide-out ao deletar

### 7. Dark/Light Mode

**Descrição:** Implementar toggle entre temas claro e escuro
**Impacto:** Média complexidade, Média usabilidade
**Implementação sugerida:**

- Context separado para theme
- CSS variables para cores
- Salvar preferência em localStorage

### 8. Testes Unitários e de Integração

**Descrição:** Adicionar cobertura de testes com Jest e React Testing Library
**Impacto:** Alta complexidade, Alta manutenibilidade
**Implementação sugerida:**

- Testes para TaskContext
- Testes para validação Zod
- Testes componentes críticos
- Cobertura mínima de 80%

### 9. Busca e Filtro por Texto

**Descrição:** Funcionalidade de busca em tempo real
**Impacto:** Baixa complexidade, Média usabilidade
**Implementação sugerida:**

- Input de busca no topo
- Filter em tasksContext
- Debounce para performance

### 10. Sincronização com Backend

**Descrição:** Integrar com API backend para sincronização na nuvem
**Impacto:** Alta complexidade, Alta usabilidade
**Implementação sugerida:**

- Criar API Node/Express
- Autenticação com JWT
- Sync automático de mudanças
- Suporte offline com Service Workers

### 11. Drag and Drop para Reordenação

**Descrição:** Permitir reordenar tarefas arrastando e soltando
**Impacto:** Média complexidade, Média usabilidade
**Implementação sugerida:**

- Biblioteca como react-beautiful-dnd
- Atualizar ordem no contexto
- Persistir nova ordem no localStorage

### 12. Acessibilidade (a11y) Completa

**Descrição:** Melhorar conformidade WCAG 2.1 AA
**Impacto:** Média complexidade, Alta usabilidade
**Implementação sugerida:**

- Labels HTML semânticas
- ARIA attributes apropriados
- Navegação por teclado
- Contrast ratio adequado
- Testes com axe DevTools

### 13. Atalhos de Teclado

**Descrição:** Adicionar atalhos para agilizar uso
**Impacto:** Baixa complexidade, Média usabilidade
**Implementação sugerida:**

- `Ctrl+Enter` para criar tarefa
- `Delete` para deletar selecionada
- `Escape` para cancelar edição

### 14. Dados em Análise

**Descrição:** Estatísticas sobre produtividade e padrões
**Impacto:** Média complexidade, Baixa usabilidade
**Implementação sugerida:**

- Gráficos de tarefas completadas por dia
- Tempo médio para conclusão
- Dashboard com métricas
