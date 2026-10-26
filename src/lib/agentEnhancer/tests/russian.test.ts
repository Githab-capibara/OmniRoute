/**
 * Test suite: Russian keywords classification and bilingual prompts
 *
 * Verifies that the enhanced classifier correctly identifies
 * Russian-language task descriptions and that bilingual prompts
 * are properly generated.
 */
import { describe, it } from "node:test";
import assert from "node:assert";
import { classifyTask, buildEnhancedPrompt } from "../index.js";

describe("Russian keywords classification", () => {
  it("classifies Russian bug fix tasks", () => {
    assert.equal(classifyTask("Исправь ошибку в модуле авторизации"), "bug_fix");
    assert.equal(classifyTask("Фикс краша при запуске"), "bug_fix");
    assert.equal(classifyTask("Не работает логин, падает с ошибкой"), "bug_fix");
    assert.equal(classifyTask("Почини сломанный модуль оплаты"), "bug_fix");
  });

  it("classifies Russian architecture tasks", () => {
    assert.equal(classifyTask("Спроектируй архитектуру микросервисов"), "architecture");
    assert.equal(classifyTask("Разработай структуру системы"), "architecture");
    assert.equal(classifyTask("Предложи дизайн для масштабируемого сервиса"), "architecture");
  });

  it("classifies Russian algorithm tasks", () => {
    assert.equal(classifyTask("Оптимизируй алгоритм сортировки"), "algorithm");
    assert.equal(classifyTask("Улучши производительность поиска"), "algorithm");
    assert.equal(classifyTask("Сложность алгоритма слишком высокая"), "algorithm");
  });

  it("classifies Russian refactor tasks", () => {
    assert.equal(classifyTask("Отрефактори этот модуль"), "refactor");
    assert.equal(classifyTask("Упрощи код в этом файле"), "refactor");
    assert.equal(classifyTask("Переструктурируй legacy код"), "refactor");
  });

  it("classifies Russian feature tasks", () => {
    assert.equal(classifyTask("Добавь фичу экспорта в PDF"), "feature");
    assert.equal(classifyTask("Реализуй новую функциональность"), "feature");
    assert.equal(classifyTask("Создай поддержку тёмной темы"), "feature");
  });

  it("classifies Russian analysis tasks", () => {
    assert.equal(classifyTask("Анализ узких мест в базе данных"), "analysis");
    assert.equal(classifyTask("Сравни два подхода к решению"), "analysis");
    assert.equal(classifyTask("Исследуй причины медленной работы"), "analysis");
  });

  it("handles mixed Russian-English messages", () => {
    assert.equal(classifyTask("Исправь bug в модуле"), "bug_fix");
    assert.equal(classifyTask("Refactor this модуль"), "refactor");
    assert.equal(classifyTask("Add поддержка для фичи"), "feature");
  });

  it("is case insensitive for Russian", () => {
    assert.equal(classifyTask("ИСПРАВЬ ОШИБКУ"), "bug_fix");
    assert.equal(classifyTask("АНАЛИЗ ПРОИЗВОДИТЕЛЬНОСТИ"), "analysis");
  });
});

describe("Bilingual prompts", () => {
  it("includes Russian translations in method prompts", () => {
    const prompt = buildEnhancedPrompt("Исправь ошибку в модуле");

    assert.ok(
      prompt.includes("Метод самосогласованности") || prompt.includes("Метод"),
      "Should include Russian method names"
    );
    assert.ok(
      prompt.includes("Метод") || prompt.includes("метод"),
      "Should include Russian method references"
    );
  });

  it("includes Russian execution order", () => {
    const prompt = buildEnhancedPrompt("Design a system architecture");

    assert.ok(
      prompt.includes("Порядок выполнения"),
      "Should include Russian execution order header"
    );
    assert.ok(prompt.includes("Шаг назад"), "Should include Russian step-back name");
  });

  it("includes Russian output format", () => {
    const prompt = buildEnhancedPrompt("Analyze the system");

    assert.ok(prompt.includes("Формат вывода"), "Should include Russian output format header");
  });

  it("preserves English content alongside Russian", () => {
    const prompt = buildEnhancedPrompt("Исправь ошибку");

    assert.ok(prompt.includes("Enhanced Agent Mode"), "Should include English header");
    assert.ok(prompt.includes("bug_fix"), "Should include task type");
    assert.ok(prompt.includes("Reflexion"), "Should include English method names");
  });
});

describe("Extended keyword coverage", () => {
  it("recognizes 'почини' as bug_fix", () => {
    assert.equal(classifyTask("Почини сломанный модуль"), "bug_fix");
  });

  it("recognizes 'фикс' as bug_fix", () => {
    assert.equal(classifyTask("Нужен фикс для этой ошибки"), "bug_fix");
  });

  it("recognizes 'причина' as analysis", () => {
    assert.equal(classifyTask("Найди причину проблемы"), "analysis");
  });

  it("recognizes 'почему' as analysis", () => {
    assert.equal(classifyTask("Почему не работает?"), "analysis");
  });

  it("recognizes 'узкое место' as analysis", () => {
    assert.equal(classifyTask("Найди узкое место в системе"), "analysis");
  });

  it("recognizes 'микросервис' as architecture", () => {
    assert.equal(classifyTask("Создай микросервис для уведомлений"), "architecture");
  });

  it("recognizes 'производительность' as algorithm", () => {
    assert.equal(classifyTask("Улучши производительность кода"), "algorithm");
  });

  it("recognizes 'техдолг' as refactor", () => {
    assert.equal(classifyTask("Устрани технический долг"), "refactor");
  });

  it("recognizes 'легаси' as refactor", () => {
    assert.equal(classifyTask("Перепиши легаси код"), "refactor");
  });

  it("recognizes 'фича' as feature", () => {
    assert.equal(classifyTask("Новая фича для экспорта"), "feature");
  });

  it("recognizes 'требование' as feature", () => {
    assert.equal(classifyTask("Реализуй требование из спеки"), "feature");
  });
});
