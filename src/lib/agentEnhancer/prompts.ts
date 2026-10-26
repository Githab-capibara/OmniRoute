/**
 * Agent Enhancer — 7 Advanced Reasoning Methods
 *
 * This module enhances agent responses by injecting system prompts
 * that guide the model through structured reasoning patterns.
 *
 * Methods:
 * 1. Self-Consistency — generate multiple variants, vote for consensus
 * 2. Tree of Thoughts — branch exploration with pruning
 * 3. Reflexion — self-critique and iterative improvement
 * 4. Chain of Verification — fact-check before final answer
 * 5. Step-back Prompting — abstract before concrete
 * 6. Graph of Thoughts — synthesize best parts from multiple approaches
 * 7. Maieutic Prompting — Socratic questioning to expose contradictions
 */

// Task type classification
export type TaskType =
  "bug_fix" | "architecture" | "algorithm" | "refactor" | "feature" | "analysis" | "general";

// Method selection based on task type
const TASK_METHOD_MAP: Record<TaskType, string[]> = {
  bug_fix: ["reflexion", "chain_of_verification", "self_consistency"],
  architecture: ["step_back", "graph_of_thoughts", "tree_of_thoughts"],
  algorithm: ["tree_of_thoughts", "self_consistency", "chain_of_verification"],
  refactor: ["reflexion", "step_back", "maieutic"],
  feature: ["step_back", "tree_of_thoughts", "graph_of_thoughts"],
  analysis: ["chain_of_verification", "maieutic", "self_consistency"],
  general: ["reflexion", "chain_of_verification"],
};

// Method display names (bilingual)
const METHOD_NAMES: Record<string, string> = {
  self_consistency: "Self-Consistency / Самосогласованность",
  tree_of_thoughts: "Tree of Thoughts / Дерево мыслей",
  reflexion: "Reflexion / Рефлексия",
  chain_of_verification: "Chain of Verification / Цепочка проверки",
  step_back: "Step-back / Шаг назад",
  graph_of_thoughts: "Graph of Thoughts / Граф мыслей",
  maieutic: "Maieutic / Маевтический",
};

// Method prompts — bilingual (RU/EN) for maximum model comprehension
const METHOD_PROMPTS: Record<string, string> = {
  self_consistency: `
## Self-Consistency Method / Метод самосогласованности

### Порядок выполнения / Execution Order
1. Mentally generate 2-3 independent approaches to this problem.
2. Compare them and select the solution that appears most consistently across variants.
3. If approaches disagree, investigate why and choose the most logically sound one.

### Формат вывода / Output Format
- List each approach briefly, then state your final choice.
- If approaches disagree, explain the disagreement.

Перед финальным ответом мысленно сгенерируй 2-3 независимых подхода к решению задачи.
Сравни их и выбери то решение, которое чаще всего встречается в вариантах.
Если подходы расходятся — выясни почему и выбери наиболее логически обоснованный.
`,

  tree_of_thoughts: `
## Tree of Thoughts Method / Дерево мыслей

### Порядок выполнения / Execution Order
1. Decompose the problem into 2-3 major solution branches.
2. For each branch, estimate: probability of success, required complexity, potential pitfalls.
3. Prune branches with low success probability or excessive complexity.
4. Develop the most promising branch in depth, exploring sub-branches.
5. If a branch leads to a dead end, explicitly state why and backtrack.
6. Select the branch that best balances correctness, simplicity, and maintainability.

### Формат вывода / Output Format
- Show the tree structure with branches and pruning decisions.
- Explain why each branch was kept or pruned.

1. Декомпозируй задачу на 2-3 крупные ветки решения.
2. Для каждой ветки оцени: вероятность успеха, сложность, потенциальные риски.
3. Отсеки ветки с низкой вероятностью успеха или чрезмерной сложностью.
4. Развивай наиболее перспективную ветку вглубь, исследуя подветки.
5. Если ветка ведёт в тупик — явно укажи почему и вернись назад.
6. Выбери ветку, которая лучше балансирует корректность, простоту и поддерживаемость.
`,

  reflexion: `
## Reflexion Method / Рефлексия

### Порядок выполнения / Execution Order
1. Propose an initial solution.
2. Critically evaluate it: what could go wrong? What assumptions am I making? What edge cases are missed?
3. Identify weaknesses and failure modes.
4. Propose an improved version that addresses each weakness.
5. Verify the improved version doesn't introduce new problems.
6. If significant issues remain, iterate once more.

### Формат вывода / Output Format
- Show initial solution, then the critique, then the improved version.
- Be explicit about what changed and why.

1. Предложи начальное решение.
2. Критически оцени его: что может пойти не так? Какие допущения я делаю? Какие крайние случаи упущены?
3. Выяви слабые места и режимы отказа.
4. Предложи улучшенную версию, устраняющую каждую слабость.
5. Проверь, что улучшенная версия не вносит новых проблем.
6. Если остаются существенные проблемы — повтори итерацию.
`,

  chain_of_verification: `
## Chain of Verification Method / Цепочка проверки

### Порядок выполнения / Execution Order
1. Make a list of 3-5 verification questions about your solution.
2. Answer each question with concrete evidence (code, documentation, tests).
3. Include in your answer only those statements you can confirm with confidence.
4. Mark uncertain statements explicitly as "requires verification".
5. If a critical statement cannot be verified — say so directly.

### Формат вывода / Output Format
- List each verification question and its answer.
- Mark any unverified claims clearly.

Перед финальным ответом:
1. Составь список из 3-5 проверочных вопросов к своему решению.
2. Ответь на каждый вопрос конкретными доказательствами (код, документация, тесты).
3. Включай в ответ только те утверждения, которые можешь подтвердить с уверенностью.
4. Помечай неопределённые утверждения явно как «требует проверки».
5. Если критическое утверждение проверить не можешь — скажи об этом прямо.
`,

  step_back: `
## Step-back Prompting Method / Шаг назад

### Порядок выполнения / Execution Order
1. Identify the fundamental principle, pattern, or law underlying this task.
2. State the general architectural pattern or algorithm type.
3. Verify the abstraction actually fits the specific case.
4. Only then apply this principle to your concrete problem.
5. Name the pattern explicitly (e.g., "this is a classic CQRS pattern").

### Формат вывода / Output Format
- Name the pattern explicitly.
- Show how the abstraction maps to the concrete case.

Перед погружением в детали:
1. Определи фундаментальный принцип, паттерн или закон, лежащий в основе задачи.
2. Сформулируй общий архитектурный паттерн или тип алгоритма.
3. Проверь, что абстракция действительно подходит к конкретному случаю.
4. Только после этого применяй принцип к своей конкретной задаче.
5. Назови паттерн явно (например, «это классический паттерн CQRS»).
`,

  graph_of_thoughts: `
## Graph of Thoughts Method / Граф мыслей

### Порядок выполнения / Execution Order
1. Generate multiple solution approaches.
2. For each approach, identify its strongest aspect (elegance, speed, reliability, simplicity).
3. Synthesize a hybrid solution combining the best aspects from different approaches.
4. Verify the synthesis doesn't introduce new contradictions.
5. Check that the hybrid is actually better than any single approach.

### Формат вывода / Output Format
- Show each approach and its strongest aspect.
- Present the hybrid and why it's better.

1. Сгенерируй несколько подходов к решению.
2. Для каждого подхода определи его сильную сторону (элегантность, скорость, надёжность, простота).
3. Синтезируй гибридное решение, объединяющее лучшие аспекты из разных подходов.
4. Проверь, что синтез не вносит новых противоречий.
5. Убедись, что гибрид действительно лучше любого одиночного подхода.
`,

  maieutic: `
## Maieutic Prompting Method / Маевтический метод (Сократовский диалог)

### Порядок выполнения / Execution Order
1. State your current understanding of the problem.
2. Ask yourself: "What am I absolutely certain about? What am I assuming?"
3. For each assumption, ask: "Is this always true? Can I construct a counterexample?"
4. If you find a counterexample, revise your understanding.
5. Repeat until your assumptions are either solid or explicitly acknowledged as uncertain.
6. Only then proceed to solution.

### Формат вывода / Output Format
- Show each assumption and the counterexample check.
- State which assumptions survived and which were revised.

Для углублённого понимания задачи:
1. Сформулируй своё текущее понимание задачи.
2. Спроси себя: «Что я точно знаю? Что я предполагаю?»
3. Для каждого предположения спроси: «Всегда ли это верно? Могу ли я привести контрпример?»
4. Если нашёл контрпример — пересмотри своё понимание.
5. Повторяй, пока допущения не станут прочными или явно признанными как неопределённые.
6. Только после этого переходи к решению.
`,
};

// Get methods for a task type
export function getMethodsForTask(taskType: TaskType): string[] {
  return TASK_METHOD_MAP[taskType];
}

// Build enhanced system prompt — accepts TaskType directly or a message string
export function buildEnhancedPrompt(input: TaskType | string): string {
  const taskType: TaskType = typeof input === "string" ? classifyTask(input) : input;
  const methods = TASK_METHOD_MAP[taskType];
  const prompts = methods.map((method) => METHOD_PROMPTS[method]).join("\n");
  const methodList = methods.map((m, i) => `${i + 1}. ${METHOD_NAMES[m] || m} (${m})`).join("\n");
  return `## Agent Enhancer / Агент Улучшитель

Enhanced Agent Mode: ON

Detected task type: **${taskType}**

Active reasoning methods:
${methodList}

Apply the following reasoning methods:

### Порядок выполнения / Execution Order
${methodList}

${prompts}

### Формат вывода / Output Format
Provide your answer in the same language as the user's message.
For each method, show your reasoning step by step.
Дай ответ на том же языке, что и сообщение пользователя.
Для каждого метода покажи рассуждения по шагам.
`;
}

// Detect task type from message content
export function classifyTask(message: string): TaskType {
  const lower = message.toLowerCase();
  for (const { type, keywords } of CLASSIFICATION_KEYWORDS) {
    for (const keyword of keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        return type;
      }
    }
  }
  return "general";
}

// Classification keywords — bilingual (EN + RU) — expanded 2x
const CLASSIFICATION_KEYWORDS: Array<{ type: TaskType; keywords: string[] }> = [
  {
    type: "analysis",
    keywords: [
      // English
      "analyze",
      "analysis",
      "compare",
      "evaluate",
      "assess",
      "review",
      "investigate",
      "research",
      "bottleneck",
      "profiling",
      "benchmark",
      "tradeoff",
      "trade-off",
      "pros and cons",
      "deep dive",
      "root cause",
      "why does",
      "why is",
      "what causes",
      "diagnose",
      "diagnostic",
      "inspect",
      "examine",
      "explore",
      "understand",
      "performance analysis",
      "code review",
      "walkthrough",
      "audit",
      // Russian
      "анализ",
      "анализировать",
      "анализа",
      "анализе",
      "анализируй",
      "анализирую",
      "сравнить",
      "сравнение",
      "сравнения",
      "сравни",
      "сравнивать",
      "оценить",
      "оценка",
      "оцени",
      "оцениваю",
      "оценивания",
      "проверить",
      "проверь",
      "проверка",
      "проверяю",
      "проверять",
      "исследовать",
      "исследование",
      "исследую",
      "исследуй",
      "разобрать",
      "разбери",
      "разбор",
      "разбираю",
      "разбирать",
      "причина",
      "причину",
      "причины",
      "причиной",
      "почему",
      "откуда",
      "профилирование",
      "профилировать",
      "профилирую",
      "узкое место",
      "узкие места",
      "узких мест",
      "недостатки",
      "недостаток",
      "достоинства",
      "достоинство",
      "плюсы",
      "плюс",
      "минусы",
      "минус",
      "компромисс",
      "глубокий разбор",
      "первопричина",
      "разобраться",
      "понять",
      "выяснить",
      "выясни",
      "диагностика",
      "диагностировать",
      "осмотр",
      "осмотреть",
      "изучить",
      "изучение",
      "изучаю",
      "понимание",
      "ревью",
      "ревьюить",
      "аудит",
      "просмотр",
      "просмотреть",
    ],
  },
  {
    type: "bug_fix",
    keywords: [
      // English
      "bug",
      "error",
      "fix",
      "crash",
      "broken",
      "fail",
      "issue",
      "debug",
      "traceback",
      "exception",
      "stacktrace",
      "stack trace",
      "segfault",
      "null pointer",
      "npe",
      "panic",
      "regression",
      "hotfix",
      "patch",
      "workaround",
      "fixme",
      "fix me",
      "stack overflow",
      "memory leak",
      "deadlock",
      "race condition",
      "undefined behavior",
      "compile error",
      "runtime error",
      "syntax error",
      "type error",
      // Russian
      "ошибка",
      "ошибку",
      "ошибке",
      "ошибки",
      "баг",
      "исправить",
      "исправь",
      "фикс",
      "краш",
      "крашится",
      "падение",
      "падает",
      "падают",
      "упал",
      "упало",
      "сломан",
      "сломана",
      "сломалось",
      "сломаны",
      "не работает",
      "не запускается",
      "не компилируется",
      "не собирается",
      "исключение",
      "трейсбек",
      "стектрейс",
      "сегфолт",
      "нулевой указатель",
      "паника",
      "регрессия",
      "хотфикс",
      "патч",
      "обходной путь",
      "чини",
      "почини",
      "починить",
      "ломается",
      "ломаются",
      "поломка",
      "поломки",
      "дефект",
      "дефекты",
      "глюк",
      "глюки",
      "баги",
      "ошибок",
      "утечка памяти",
      "дедлок",
      "гонка условий",
      "неопределённое поведение",
      "ошибка компиляции",
      "ошибка выполнения",
      "синтаксическая ошибка",
      "ошибка типа",
      "стек переполнение",
      "вылетает",
      "вылет",
    ],
  },
  {
    type: "refactor",
    keywords: [
      // English
      "refactor",
      "cleanup",
      "clean up",
      "simplify",
      "restructure",
      "reorganize",
      "legacy",
      "tech debt",
      "dead code",
      "duplicate",
      "rename",
      "modularize",
      "decouple",
      "split",
      "extract",
      "inline",
      "move",
      "consolidate",
      "rename variable",
      "rename function",
      "rename class",
      "rename method",
      "improve readability",
      "reduce complexity",
      "remove duplication",
      // Russian
      "рефактор",
      "рефакторинг",
      "отрефактори",
      "отрефакторить",
      "почистить",
      "почисти",
      "упростить",
      "упрости",
      "упрощи",
      "упрощаю",
      "перестроить",
      "перестрой",
      "перестраиваю",
      "переструктурировать",
      "переструктурируй",
      "переструктурирование",
      "легаси",
      "техдолг",
      "технический долг",
      "мёртвый код",
      "мёртвый",
      "мёртвая",
      "мёртвое",
      "дубликат",
      "дублирование",
      "дублирующий",
      "переименовать",
      "переименуй",
      "переименование",
      "переорганизовать",
      "переорганизуй",
      "модуляризация",
      "модуляризировать",
      "разъединить",
      "разъединение",
      "декаплинг",
      "реорганизация",
      "реорганизуй",
      "извлечь",
      "извлечение",
      "инлайн",
      "переместить",
      "перемещение",
      "консолидировать",
      "консолидация",
      "улучшить читаемость",
      "снизить сложность",
      "убрать дублирование",
      "убрать дубликаты",
      "рефакторить",
      "чистка",
      "зачистка",
    ],
  },
  {
    type: "architecture",
    keywords: [
      // English
      "architecture",
      "design",
      "pattern",
      "system",
      "component",
      "module",
      "service",
      "microservice",
      "monolith",
      "layer",
      "tier",
      "scalable",
      "high availability",
      "distributed",
      "event-driven",
      "cqrs",
      "saga",
      "outbox",
      "api gateway",
      "domain-driven",
      "ddd",
      "hexagonal",
      "clean architecture",
      "onion architecture",
      "message queue",
      "event bus",
      "pub/sub",
      "publisher subscriber",
      // Russian
      "архитектура",
      "архитектуры",
      "архитектуре",
      "проектирование",
      "спроектировать",
      "паттерн",
      "паттерны",
      "система",
      "системы",
      "систему",
      "компонент",
      "компоненты",
      "модуль",
      "модули",
      "модуля",
      "сервис",
      "сервисы",
      "микросервис",
      "микросервисы",
      "монолит",
      "монолитный",
      "слой",
      "слои",
      "масштабируемый",
      "высокая доступность",
      "распределённый",
      "распределенная",
      "событийный",
      "событийно-ориентированный",
      "cqrs",
      "сага",
      "аутбокс",
      "api шлюз",
      "шлюз",
      "доменно-ориентированный",
      "ddd",
      "гексагональная",
      "чистая архитектура",
      "луковичная архитектура",
      "очередь сообщений",
      "шина событий",
      "подписчик",
      "издатель",
      "pub/sub",
      "паб/саб",
      "проектируй",
      "спроектируй",
      "архитектурный",
      "архитектурное",
    ],
  },
  {
    type: "algorithm",
    keywords: [
      // English
      "algorithm",
      "optimize",
      "complexity",
      "efficient",
      "fast",
      "slow",
      "benchmark",
      "performance",
      "speed",
      "runtime",
      "big o",
      "time complexity",
      "space complexity",
      "sorting",
      "searching",
      "graph",
      "tree",
      "dynamic programming",
      "greedy",
      "recursion",
      "iteration",
      "memoization",
      "caching",
      "indexing",
      "parallel",
      "concurrent",
      "async",
      "throughput",
      "latency",
      // Russian
      "алгоритм",
      "алгоритмы",
      "алгоритма",
      "алгоритме",
      "оптимизировать",
      "оптимизируй",
      "оптимизация",
      "оптимизации",
      "сложность",
      "сложности",
      "эффективный",
      "эффективная",
      "быстрый",
      "быстрая",
      "медленный",
      "медленная",
      "бенчмарк",
      "бенчмаркинг",
      "производительность",
      "производительности",
      "скорость",
      "время выполнения",
      "большое о",
      "big o",
      "временная сложность",
      "пространственная сложность",
      "сортировка",
      "сортировки",
      "поиск",
      "поиска",
      "граф",
      "графы",
      "дерево",
      "деревья",
      "динамическое программирование",
      "жадный",
      "жадный алгоритм",
      "рекурсия",
      "рекурсии",
      "итерация",
      "итерации",
      "мемоизация",
      "мемоизации",
      "кэширование",
      "кэширования",
      "индексация",
      "индексирование",
      "параллельный",
      "параллельная",
      "конкурентный",
      "асинхронный",
      "пропускная способность",
      "задержка",
      "латентность",
      "тормозит",
      "тормозят",
      "ускорить",
      "ускорь",
      "оптимизирую",
    ],
  },
  {
    type: "feature",
    keywords: [
      // English
      "feature",
      "implement",
      "add",
      "create",
      "build",
      "new",
      "support",
      "integration",
      "endpoint",
      "api",
      "route",
      "controller",
      "handler",
      "endpoint",
      "rest",
      "graphql",
      "grpc",
      "websocket",
      "webhook",
      "authentication",
      "authorization",
      "oauth",
      "jwt",
      "session",
      "database",
      "migration",
      "schema",
      "model",
      "entity",
      "repository",
      "frontend",
      "component",
      "page",
      "view",
      "ui",
      "ux",
      "widget",
      // Russian
      "фича",
      "фичи",
      "фичу",
      "реализовать",
      "реализуй",
      "реализация",
      "добавить",
      "добавь",
      "добавление",
      "создать",
      "создай",
      "создание",
      "построить",
      "построй",
      "новый",
      "новая",
      "новое",
      "поддержка",
      "поддержать",
      "интеграция",
      "интеграции",
      "интегрировать",
      "интегрируй",
      "эндпоинт",
      "эндпоинты",
      "api",
      "роут",
      "роуты",
      "контроллер",
      "контроллеры",
      "обработчик",
      "обработчики",
      "rest",
      "graphql",
      "grpc",
      "websocket",
      "вебхук",
      "аутентификация",
      "авторизация",
      "oauth",
      "jwt",
      "сессия",
      "сессии",
      "база данных",
      "базу данных",
      "миграция",
      "миграции",
      "схема",
      "схемы",
      "модель",
      "модели",
      "сущность",
      "сущности",
      "репозиторий",
      "репозитории",
      "фронтенд",
      "фронтенда",
      "компонент",
      "компоненты",
      "страница",
      "страницы",
      "представление",
      "ui",
      "ux",
      "виджет",
      "виджеты",
    ],
  },
];

// Determine if message should be enhanced
export function shouldEnhance(message: string): boolean {
  if (message.length > 50) return true;
  if (message.includes("?") || message.includes("?")) return true;
  return false;
}
